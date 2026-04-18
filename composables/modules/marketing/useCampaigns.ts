import { ref } from "vue";
import { GATEWAY_ENDPOINT_WITH_AUTH } from "@/api_factory/axios.config";

export const useCampaigns = () => {
    const campaigns = ref([]);
    const loading = ref(false);
    const creating = ref(false);

    const fetchCampaigns = async () => {
        loading.value = true;
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/marketing/campaigns");
            campaigns.value = res.data || [];
        } catch (e) {
            console.error("Failed to fetch campaigns");
        } finally {
            loading.value = false;
        }
    };

    const createCampaign = async (payload: any) => {
        creating.value = true;
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.post("/marketing/campaigns", payload);
            return res.data;
        } finally {
            creating.value = false;
        }
    };

    const sendCampaign = async (id: string) => {
        try {
            await GATEWAY_ENDPOINT_WITH_AUTH.post(`/marketing/campaigns/${id}/send`);
        } catch (e) {
            console.error("Send failed");
            throw e;
        }
    };

    return {
        campaigns,
        loading,
        creating,
        fetchCampaigns,
        createCampaign,
        sendCampaign
    };
};
