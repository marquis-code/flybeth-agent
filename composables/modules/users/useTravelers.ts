import { ref } from "vue";
import { passengersApiFactory } from "@/api_factory/modules/passengers";

export const useTravelers = () => {
    const travelers = ref([]);
    const stats = ref({
        total: 0,
        adults: 0,
        children: 0,
        infants: 0
    });
    const loading = ref(false);
    const creating = ref(false);
    const updating = ref(false);

    const fetchTravelers = async () => {
        loading.value = true;
        try {
            const res = await passengersApiFactory.getSavedPassengers();
            travelers.value = res.data.data || res.data;
        } catch (e) {
            console.error("Failed to fetch travelers");
        } finally {
            loading.value = false;
        }
    };

    const fetchStats = async () => {
        try {
            const res = await passengersApiFactory.getStats();
            stats.value = res.data.data || res.data;
        } catch (e) {
            console.error("Failed to fetch traveler stats");
        }
    };

    const createTraveler = async (payload: any) => {
        creating.value = true;
        try {
            const res = await passengersApiFactory.createPassenger(payload);
            return res.data;
        } finally {
            creating.value = false;
        }
    };

    const updateTraveler = async (id: string, payload: any) => {
        updating.value = true;
        try {
            const res = await passengersApiFactory.updatePassenger(id, payload);
            return res.data;
        } finally {
            updating.value = false;
        }
    };

    const deleteTraveler = async (id: string) => {
        try {
            await passengersApiFactory.deletePassenger(id);
        } catch (e) {
            console.error("Delete failed");
            throw e;
        }
    };

    const fetchTravelerById = async (id: string) => {
        loading.value = true;
        try {
            const res = await passengersApiFactory.getPassengerById(id);
            return res.data.data || res.data;
        } catch (e) {
            console.error("Failed to fetch traveler by id");
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        travelers,
        stats,
        loading,
        creating,
        updating,
        fetchTravelers,
        fetchStats,
        createTraveler,
        updateTraveler,
        deleteTraveler,
        fetchTravelerById
    };
};
