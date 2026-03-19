import { ref } from "vue";
import { bookingsApiFactory } from "@/api_factory/modules/bookings";
import { useUser } from "../auth/user";

export const useBookings = () => {
    const loading = ref(false);
    const bookings = ref<any[]>([]);
    const stats = ref<any>(null);
    const { user } = useUser();

    const fetchBookings = async (params?: any) => {
        if (!user.value?.tenantId) return;
        loading.value = true;
        try {
            const res = await bookingsApiFactory.getTenantBookings(user.value.tenantId, params);
            if (res.status === 200 || res.status === 201) {
                bookings.value = res.data.data;
                return res;
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const fetchStats = async () => {
        if (!user.value?.tenantId) return;
        loading.value = true;
        try {
            const res = await bookingsApiFactory.getStats(user.value.tenantId);
            if (res.status === 200 || res.status === 201) {
                stats.value = res.data.data;
                return res;
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        bookings,
        stats,
        fetchBookings,
        fetchStats,
    };
};
