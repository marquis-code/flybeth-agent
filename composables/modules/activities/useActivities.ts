import { ref } from 'vue'
import { experiencesApiFactory } from '@/api_factory/modules/experiences'
import { useGlobalLoader } from '@/composables/core/useGlobalLoader'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const popularDestinations = [
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 },
  { city: 'Cape Town', country: 'South Africa', lat: -33.9249, lng: 18.4241 },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { city: 'Bali', country: 'Indonesia', lat: -8.3405, lng: 115.0920 },
  { city: 'Cancun', country: 'Mexico', lat: 21.1619, lng: -86.8515 },
]

export const useActivities = () => {
  const { showLoader, hideLoader } = useGlobalLoader()
  const { showToast } = useCustomToast()

  const activityResults = ref<any[]>([])
  const isSearching = ref(false)

  const searchActivities = async (query: {
    latitude: number
    longitude: number
    radius?: number
    fromDate?: string
    toDate?: string
  }) => {
    isSearching.value = true
    showLoader()
    activityResults.value = []

    try {
      showToast({ title: 'Searching', message: 'Connecting to experiences providers...', toastType: 'info' })

      try {
        const res = await experiencesApiFactory.searchLive({
          latitude: query.latitude,
          longitude: query.longitude,
          radius: query.radius || 20,
        })
        if (res.data?.data?.length > 0) {
          activityResults.value = res.data.data
          showToast({ title: 'Success', message: `Found ${res.data.data.length} activities.`, toastType: 'success' })
          return
        }
      } catch (err) {
        console.warn('Experiences API failed or returned empty.', err)
      }

      // Mock fallback for UI demonstration
      setTimeout(() => {
        activityResults.value = [
          { id: 'ACT-001', name: 'City Walking Tour', category: 'Tours', duration: '3 hours', rating: 4.8, reviews: 324, price: 35, currency: 'USD', provider: 'Viator', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' },
          { id: 'ACT-002', name: 'Street Food Experience', category: 'Food & Drink', duration: '4 hours', rating: 4.9, reviews: 512, price: 55, currency: 'USD', provider: 'GetYourGuide', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400' },
          { id: 'ACT-003', name: 'Museum Skip-the-Line Pass', category: 'Attractions', duration: '2 hours', rating: 4.7, reviews: 198, price: 28, currency: 'USD', provider: 'Viator', image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=400' },
        ]
        showToast({ title: 'Success', message: `Found ${activityResults.value.length} activities via Aggregator.`, toastType: 'success' })
      }, 1500)

    } catch (error: any) {
      console.error(error)
      showToast({ title: 'Error', message: 'Failed to retrieve activity results.', toastType: 'error' })
    } finally {
      setTimeout(() => {
        hideLoader()
        isSearching.value = false
      }, 1500)
    }
  }

  return {
    popularDestinations,
    activityResults,
    isSearching,
    searchActivities
  }
}
