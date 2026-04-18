import { ref } from "vue";
import { GATEWAY_ENDPOINT_WITH_AUTH } from "@/api_factory/axios.config";

export const useFinance = () => {
    const invoices = ref([]);
    const stats = ref({
        unpaidReceivables: 0,
        clearedPayouts: 0,
        overdueSettlements: 0,
        totalVolume: 0,
        grossCommission: 0
    });
    const loading = ref(false);

    const fetchFinanceData = async () => {
        loading.value = true;
        try {
            const [invRes, statRes] = await Promise.all([
                GATEWAY_ENDPOINT_WITH_AUTH.get("/finance/invoices"),
                GATEWAY_ENDPOINT_WITH_AUTH.get("/finance/stats")
            ]);
            invoices.value = invRes.data || [];
            stats.value = statRes.data || stats.value;
        } catch (e) {
            console.error("Failed to fetch finance data");
        } finally {
            loading.value = false;
        }
    };

    return {
        invoices,
        stats,
        loading,
        fetchFinanceData
    };
};
