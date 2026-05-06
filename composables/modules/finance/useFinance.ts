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

    const walletBalance = ref(0);
    const transactions = ref([]);

    const fetchWalletData = async () => {
        try {
            const [balRes, transRes] = await Promise.all([
                GATEWAY_ENDPOINT_WITH_AUTH.get("/finance/wallet/balance"),
                GATEWAY_ENDPOINT_WITH_AUTH.get("/finance/wallet/transactions")
            ]);
            walletBalance.value = balRes.data || 0;
            transactions.value = transRes.data || [];
        } catch (e) {
            console.error("Failed to fetch wallet data");
        }
    };

    const initializeTopUp = async (amount: number, currency: string) => {
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.post("/payments/wallet/topup", {
                amount,
                currency,
                callbackUrl: window.location.href
            });
            if (res.data?.url) {
                window.location.href = res.data.url;
            }
        } catch (e) {
            console.error("Failed to initialize top-up");
            throw e;
        }
    };

    return {
        invoices,
        stats,
        walletBalance,
        transactions,
        loading,
        fetchFinanceData,
        fetchWalletData,
        initializeTopUp
    };
};
