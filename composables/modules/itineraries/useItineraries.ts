import { ref } from 'vue';
import { itinerariesApiFactory } from '@/api_factory/modules/itinerary';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useItineraries = () => {
    const itinerariesList = ref<any[]>([]);
    const loading = ref(false);
    const saving = ref(false);
    const { showToast } = useCustomToast();

    const fetchItineraries = async () => {
        loading.value = true;
        try {
            const res = await itinerariesApiFactory.getItineraries();
            itinerariesList.value = res.data?.data || res.data || [];
        } catch (error: any) {
            console.error('Failed to fetch itineraries:', error);
            showToast('Failed to load itineraries', 'error');
            itinerariesList.value = [];
        } finally {
            loading.value = false;
        }
    };

    const createItinerary = async (payload: any) => {
        saving.value = true;
        try {
            const res = await itinerariesApiFactory.createItinerary(payload);
            showToast('Itinerary architectural sequence complete', 'success');
            await fetchItineraries();
            return res.data?.data || res.data;
        } catch (error: any) {
            console.error('Failed to create itinerary:', error);
            showToast('Architectural failure', 'error');
            throw error;
        } finally {
            saving.value = false;
        }
    };

    const updateItinerary = async (id: string, payload: any) => {
        saving.value = true;
        try {
            const res = await itinerariesApiFactory.updateItinerary(id, payload);
            showToast('Itinerary architectural modification complete', 'success');
            await fetchItineraries();
            return res.data?.data || res.data;
        } catch (error: any) {
            console.error('Failed to update itinerary:', error);
            showToast('Architectural modification failure', 'error');
            throw error;
        } finally {
            saving.value = false;
        }
    };

    return {
        itinerariesList,
        loading,
        saving,
        fetchItineraries,
        createItinerary,
        updateItinerary
    };
};
