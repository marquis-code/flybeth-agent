import { ref } from 'vue'
import { carsApiFactory } from '@/api_factory/modules/cars'
import { useGlobalLoader } from '@/composables/core/useGlobalLoader'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const popularLocations = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport', country: 'USA', lat: 40.6413, lng: -73.7781 },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'UK', lat: 51.4700, lng: -0.4543 },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE', lat: 25.2532, lng: 55.3657 },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport', country: 'France', lat: 49.0097, lng: 2.5479 },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International Airport', country: 'USA', lat: 33.9416, lng: -118.4085 },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore', lat: 1.3644, lng: 103.9915 },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany', lat: 50.0379, lng: 8.5622 },
  { code: 'AMS', city: 'Amsterdam', name: 'Amsterdam Airport Schiphol', country: 'Netherlands', lat: 52.3105, lng: 4.7683 },
  { code: 'HND', city: 'Tokyo', name: 'Haneda Airport', country: 'Japan', lat: 35.5494, lng: 139.7798 },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith Airport', country: 'Australia', lat: -33.9461, lng: 151.1772 },
  { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed International Airport', country: 'Nigeria', lat: 6.5774, lng: 3.3213 },
  { code: 'JNB', city: 'Johannesburg', name: 'O. R. Tambo International Airport', country: 'South Africa', lat: -26.1392, lng: 28.2460 },
]

const toNumber = (value: any): number => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const round2 = (value: number): number => Math.round(value * 100) / 100

/** Whole rental days between two ISO dates (minimum 1). */
export const rentalDays = (pickUpDate?: string, dropOffDate?: string): number => {
  if (!pickUpDate || !dropOffDate) return 1
  const from = new Date(pickUpDate).getTime()
  const to = new Date(dropOffDate).getTime()
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return 1
  return Math.max(1, Math.ceil((to - from) / 86400000))
}

/**
 * Normalise a car returned by `GET /cars/search` into the single display shape
 * the wizard renders. Two very different sources are merged by the backend:
 *
 *  - platform cars (`dbResults`): flat fields
 *    `{ id, name, category, vendor, transmission, fuelType, seats, luggage,
 *       price, priceWithCommission, dailyRate, currency,
 *       pricing: { baseRate, basePrice, total, currency }, images[], image }`
 *  - live providers (`liveResults`): nested fields
 *    `{ provider, vehicle: { name, type, transmission, fuelType, images[] },
 *       price: { amount, totalAmount, currency }, priceWithCommission }`
 */
export const normalizeCarResult = (raw: any, index = 0, days = 1): any => {
  const vehicle = raw?.vehicle || {}
  const isLive =
    !raw?.name &&
    (!!raw?.vehicle || (!!raw?.provider && raw?.provider !== 'flybeth'))

  const currency =
    raw?.pricing?.currency || raw?.price?.currency || raw?.currency || 'USD'

  const customerTotal = isLive
    ? toNumber(raw?.priceWithCommission ?? raw?.price?.totalAmount ?? raw?.price?.amount)
    : toNumber(raw?.priceWithCommission ?? raw?.price ?? raw?.pricing?.total)

  // Platform cars expose a customer-facing daily rate; live providers only
  // expose the total for the whole rental period.
  let dailyRate = isLive
    ? 0
    : toNumber(raw?.pricing?.basePrice ?? raw?.pricing?.baseRate ?? raw?.dailyRate)
  if (!dailyRate) {
    dailyRate = customerTotal / Math.max(1, days)
  }

  const images: string[] =
    Array.isArray(raw?.images) && raw.images.length
      ? raw.images
      : (Array.isArray(vehicle?.images) ? vehicle.images : [])

  return {
    id: raw?.id || raw?._id || `${raw?.provider || 'car'}-${index}`,
    provider: raw?.provider || 'flybeth',
    name: raw?.name || vehicle?.name || 'Rental car',
    vendor:
      typeof raw?.vendor === 'string'
        ? raw.vendor
        : (raw?.vendor?.name || vehicle?.vendor || raw?.provider || 'Provider'),
    category: raw?.category || vehicle?.type || 'Car',
    type: raw?.type || vehicle?.type || 'rental',
    image: raw?.image || images[0] || null,
    images,
    specs: {
      transmission: raw?.transmission ?? vehicle?.transmission ?? 'Automatic',
      fuel: raw?.fuelType ?? vehicle?.fuelType ?? 'Petrol',
      ac: raw?.airConditioning ?? vehicle?.airConditioning ?? true,
      doors: raw?.doors ?? vehicle?.doors ?? null,
    },
    capacity: {
      passengers: raw?.seats ?? vehicle?.passengers ?? null,
      luggage: raw?.luggage ?? vehicle?.bagsLarge ?? null,
    },
    pricing: {
      baseRate: round2(dailyRate),
      total: round2(customerTotal),
      currency,
    },
    price: round2(customerTotal),
    priceWithCommission: round2(toNumber(raw?.priceWithCommission ?? customerTotal)),
    currency,
    rentalDays: days,
    // Keep the untouched payload so a booking flow can reuse provider rate
    // identifiers (`bookingInfo.rateKey`, platform car `id`, …) without
    // re-deriving them.
    raw,
  }
}

export const useCars = () => {
  const { showLoader, hideLoader } = useGlobalLoader()
  const { showToast } = useCustomToast()

  const carResults = ref<any[]>([])
  const isSearching = ref(false)

  const searchCars = async (query: {
    pickUpLocation: string
    dropOffLocation?: string
    pickUpDate: string
    dropOffDate?: string
    pickUpTime?: string
    dropOffTime?: string
    driverAge?: number
    discountBrand?: string
    discountType?: string
  }) => {
    isSearching.value = true
    showLoader()
    carResults.value = []

    try {
      showToast({ title: 'Searching', message: 'Connecting to car rental providers...', toastType: 'info' })

      const res = await carsApiFactory.search({
        type: 'rental',
        pickUpLocation: query.pickUpLocation,
        dropOffLocation: query.dropOffLocation || query.pickUpLocation,
        pickUpDate: query.pickUpDate,
        dropOffDate: query.dropOffDate,
        pickUpTime: query.pickUpTime,
        dropOffTime: query.dropOffTime,
        driverAge: query.driverAge,
      })

      // Backend envelope: { success, data: { dbResults, liveResults, results, meta }, … }
      const payload = res.data?.data ?? res.data
      const dbResults = Array.isArray(payload?.dbResults) ? payload.dbResults : []
      const liveResults = Array.isArray(payload?.liveResults) ? payload.liveResults : []
      const merged = [...dbResults, ...liveResults]
      const source = merged.length
        ? merged
        : (Array.isArray(payload?.results) ? payload.results : [])

      const days = rentalDays(query.pickUpDate, query.dropOffDate)
      carResults.value = source.map((car: any, index: number) =>
        normalizeCarResult(car, index, days),
      )

      if (carResults.value.length) {
        showToast({
          title: 'Success',
          message: `Found ${carResults.value.length} vehicle${carResults.value.length === 1 ? '' : 's'}.`,
          toastType: 'success',
        })
      } else {
        showToast({
          title: 'No Vehicles Found',
          message: 'No rental cars matched this search. Try another location or date range.',
          toastType: 'info',
        })
      }
    } catch (error: any) {
      // Never fall back to fabricated inventory — surface the failure instead.
      console.error('Car search failed', error)
      carResults.value = []
      showToast({
        title: 'Search Failed',
        message: 'Could not retrieve car rental results. Please try again.',
        toastType: 'error',
      })
    } finally {
      hideLoader()
      isSearching.value = false
    }
  }

  return {
    popularLocations,
    carResults,
    isSearching,
    searchCars
  }
}
