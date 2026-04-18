import { ref } from "vue";
import { GATEWAY_ENDPOINT_WITH_AUTH } from "@/api_factory/axios.config";
import { useUser } from "../auth/user";

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
        if (!user.value?.tenantId) return;
        loading.value = true;
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/analytics/agent", {
                params: { tenantId: user.value.tenantId }
            });
            statsData.value = res.data || statsData.value;
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
