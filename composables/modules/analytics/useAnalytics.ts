import { ref } from "vue";
import { analyticsApiFactory } from "@/api_factory/modules/analytics";
import { useUser, resolveTenantId } from "../auth/user";

export const useAnalytics = () => {
    const loading = ref(false);
    const bookingStats = ref<any>(null);
    const revenueStats = ref<any>(null);
    const popularRoutes = ref<any[]>([]);
    const { user } = useUser();

    const fetchAllAnalytics = async (days = 30) => {
        const tenantId = resolveTenantId(user.value);
        if (!tenantId) return;
        loading.value = true;
        try {
            const [bookingsRes, revenueRes, routesRes] = await Promise.all([
                analyticsApiFactory.getBookings(tenantId, days),
                analyticsApiFactory.getRevenue(tenantId, days),
                analyticsApiFactory.getPopularRoutes(tenantId, 5)
            ]);

            // The backend wraps every response as
            // { success, data, message, timestamp } — unwrap exactly one level.
            bookingStats.value = bookingsRes.data?.data ?? bookingsRes.data ?? null;
            revenueStats.value = revenueRes.data?.data ?? revenueRes.data ?? null;

            const routesPayload = routesRes.data?.data ?? routesRes.data;
            if (Array.isArray(routesPayload)) {
                popularRoutes.value = routesPayload;
            } else if (Array.isArray(routesPayload?.data)) {
                popularRoutes.value = routesPayload.data;
            } else {
                popularRoutes.value = [];
            }
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
