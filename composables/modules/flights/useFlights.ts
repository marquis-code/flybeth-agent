import { ref } from 'vue'
import { useGlobalLoader } from '@/composables/core/useGlobalLoader'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { flightsApi } from '@/api_factory/modules/flights'

export const majorAirports = [
  { city: 'London', name: 'Heathrow Airport', code: 'LHR' },
  { city: 'Paris', name: 'Charles de Gaulle Airport', code: 'CDG' },
  { city: 'Dubai', name: 'Dubai International Airport', code: 'DXB' },
  { city: 'New York', name: 'John F. Kennedy International Airport', code: 'JFK' },
  { city: 'Singapore', name: 'Changi Airport', code: 'SIN' },
  { city: 'Tokyo', name: 'Haneda Airport', code: 'HND' },
  { city: 'Lagos', name: 'Murtala Muhammed International Airport', code: 'LOS' },
  { city: 'Istanbul', name: 'Istanbul Airport', code: 'IST' },
  { city: 'Amsterdam', name: 'Schiphol Airport', code: 'AMS' },
  { city: 'Doha', name: 'Hamad International Airport', code: 'DOH' }
]

export const useFlights = () => {
  const { showLoader, hideLoader } = useGlobalLoader()
  const { showToast } = useCustomToast()
  
  const flightResults = ref<any[]>([])
  const isSearching = ref(false)
  const airportResults = ref<any[]>([])
  const isSearchingAirports = ref(false)

  const searchAirports = async (keyword: string) => {
    if (!keyword || keyword.length < 2) {
      airportResults.value = []
      return
    }
    isSearchingAirports.value = true
    try {
      const res = await flightsApi.searchAirports(keyword)
      if (res.data?.success) {
        airportResults.value = res.data.data
      }
    } catch (error) {
      console.error('Airport search failed', error)
    } finally {
      isSearchingAirports.value = false
    }
  }

  const searchFlights = async (payload: { 
    origin: string, 
    destination: string, 
    departureDate: string, 
    returnDate?: string, 
    adults: number,
    children?: number,
    infants?: number,
    cabinClass?: string
  }) => {
    isSearching.value = true
    showLoader()
    flightResults.value = []

    try {
      showToast({ title: 'Searching', message: 'Fetching live flight offers...', toastType: 'info' })
      
      const res = await flightsApi.searchLive({
        origin: payload.origin,
        destination: payload.destination,
        departureDate: payload.departureDate,
        returnDate: payload.returnDate,
        adults: payload.adults,
        children: payload.children || 0,
        infants: payload.infants || 0,
        cabinClass: payload.cabinClass || 'ECONOMY'
      })

      if (res.data?.data?.results && res.data.data.results.length > 0) {
        flightResults.value = res.data.data.results
        showToast({ title: 'Success', message: `Found ${res.data.data.results.length} flights.`, toastType: 'success' })
      } else {
        showToast({ title: 'No Results', message: 'No flight offers found for this route and date.', toastType: 'warning' })
      }

    } catch (error: any) {
      console.error(error)
      showToast({ title: 'Error', message: 'Failed to retrieve flight offers.', toastType: 'error' })
    } finally {
      setTimeout(() => {
        hideLoader()
        isSearching.value = false
      }, 1000)
    }
  }

  return {
    flightResults,
    isSearching,
    airportResults,
    isSearchingAirports,
    searchAirports,
    searchFlights
  }
}
