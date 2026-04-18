import { ref } from 'vue';
import { flightsApi } from '@/api_factory/modules/flights';
import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config'

const LOG_PREFIX = '[useAmadeusLocations]';

export const useAmadeusLocations = () => {
    const locations = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const searchLocations = async (keyword: string, countryCode?: string) => {
        if (!keyword || keyword.length < 2) {
            locations.value = [];
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            // LAYER 1: Primary search (Unified Locations)
            const response = await flightsApi.searchAirports(keyword, countryCode);
            let results = extractResults(response);

            // LAYER 2: Fallback to /airports/cities/search if no results
            if (results.length === 0) {
                const fallbackResponse = await GATEWAY_ENDPOINT.get('/airports/cities/search', {
                    params: { q: keyword, limit: 10 }
                });
                const fallbackResults = fallbackResponse.data || [];
                
                // Map fallback results to Amadeus-like shape if needed
                results = fallbackResults.map((item: any) => ({
                    ...item,
                    iataCode: item.iataCode || item.code || item.id,
                    name: item.name || item.cityName || item.description,
                    subType: item.subType || (item.type === 'airport' ? 'AIRPORT' : 'CITY')
                }));
            }

            locations.value = results;
        } catch (err: any) {
            if (err?.name !== 'CanceledError' && err?.code !== 'ERR_CANCELED') {
                console.error(`${LOG_PREFIX} ❌ API error:`, err?.message);
                error.value = err.message || 'Failed to fetch locations';
            }
            locations.value = [];
        } finally {
            loading.value = false;
        }
    };

    /**
     * Helper to extract results from various response shapes
     */
    const extractResults = (response: any): any[] => {
        if (Array.isArray(response?.data?.data)) return response.data.data;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.data?.data?.data)) return response.data.data.data;
        return [];
    };

    const detectNearestAirports = async (lat: number, lng: number) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await flightsApi.getNearestAirports(lat, lng);

            let data: any[] = [];
            if (Array.isArray(response?.data?.data)) {
                data = response.data.data;
            } else if (Array.isArray(response?.data)) {
                data = response.data;
            }

            locations.value = data;
            return data;
        } catch (err: any) {
            console.error(`${LOG_PREFIX} ❌ detectNearestAirports failed:`, err?.message);
            error.value = err.message || 'Failed to detect nearest airports';
            return [];
        } finally {
            loading.value = false;
        }
    };

    return {
        locations,
        loading,
        error,
        searchLocations,
        detectNearestAirports
    };
};
