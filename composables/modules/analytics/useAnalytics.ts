import { ref } from "vue";
import { analyticsApiFactory } from "@/api_factory/modules/analytics";
import { useUser } from "../auth/user";

export const useAnalytics = () => {
    const loading = ref(false);
    const bookingStats = ref<any>(null);
    const revenueStats = ref<any>(null);
    const popularRoutes = ref<any[]>([]);
    const { user } = useUser();

    const fetchAllAnalytics = async (days = 30) => {
        if (!user.value?.tenantId) return;
        loading.value = true;
        try {
            const [bookingsRes, revenueRes, routesRes] = await Promise.all([
                analyticsApiFactory.getBookings(user.value.tenantId, days),
                analyticsApiFactory.getRevenue(user.value.tenantId, days),
                analyticsApiFactory.getPopularRoutes(user.value.tenantId, 5)
            ]);

            bookingStats.value = bookingsRes.data;
            revenueStats.value = revenueRes.data;
            popularRoutes.value = routesRes.data;
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        bookingStats,
        revenueStats,
        popularRoutes,
        fetchAllAnalytics,
    };
};
