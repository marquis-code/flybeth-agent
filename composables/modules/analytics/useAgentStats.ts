import { ref } from "vue";
import { GATEWAY_ENDPOINT_WITH_AUTH } from "@/api_factory/axios.config";
import { useUser, resolveTenantId } from "../auth/user";

export const useAgentStats = () => {
    const statsData = ref({
        totalRevenue: 0,
        activeBookings: 0,
        totalBookings: 0,
        growth: 0,
        yield: 0
    });
    const loading = ref(false);
    const { user } = useUser();

    const fetchStats = async () => {
        const tenantId = resolveTenantId(user.value);
        if (!tenantId) return;
        loading.value = true;
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/analytics/agent", {
                params: { tenantId }
            });
            // The backend wraps every response as
            // { success, data, message, timestamp } — unwrap exactly one level.
            const payload = res.data?.data ?? res.data;
            if (payload && typeof payload === "object") {
                // Merge so missing keys keep their safe defaults instead of
                // leaving `undefined` behind for the template to trip over.
                statsData.value = { ...statsData.value, ...payload };
            }
        } catch (e) {
            console.error("Failed to fetch agent stats");
        } finally {
            loading.value = false;
        }
    };

    return {
        statsData,
        loading,
        fetchStats
    };
};
