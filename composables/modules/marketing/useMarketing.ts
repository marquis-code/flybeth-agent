import { ref } from "vue";
import { marketingApiFactory } from "@/api_factory/modules/marketing";

export const useMarketing = () => {
    const campaigns = ref<any[]>([]);
    const templates = ref<any[]>([]);
    const stats = ref({
        totalCampaigns: 0,
        sentCampaigns: 0,
        totalRecipients: 0,
        scheduled: 0,
        avgOpenRate: '0%',
        conversionRate: '0%'
    });
    const loading = ref(false);
    const creating = ref(false);
    const updating = ref(false);
    const loadingTemplates = ref(false);

    const fetchCampaigns = async () => {
        loading.value = true;
        try {
            const res = await marketingApiFactory.getCampaigns();
            campaigns.value = res.data.data || res.data || [];
        } catch (e) {
            console.error("Failed to fetch campaigns");
        } finally {
            loading.value = false;
        }
    };

    const fetchStats = async () => {
        try {
            const res = await marketingApiFactory.getStats();
            stats.value = res.data.data || res.data || stats.value;
        } catch (e) {
            console.error("Failed to fetch stats");
        }
    };

    const fetchTemplates = async () => {
        loadingTemplates.value = true;
        try {
            const res = await marketingApiFactory.getTemplates();
            templates.value = res.data.data || res.data || [];
        } catch (e) {
            console.error("Failed to fetch templates");
        } finally {
            loadingTemplates.value = false;
        }
    };

    const seedTemplates = async () => {
        try {
            await marketingApiFactory.seedTemplates();
            await fetchTemplates();
        } catch (e) {
            console.error("Failed to seed templates");
        }
    };

    const createCampaign = async (payload: any) => {
        creating.value = true;
        try {
            const res = await marketingApiFactory.createCampaign(payload);
            return res.data;
        } finally {
            creating.value = false;
        }
    };

    const updateCampaign = async (id: string, payload: any) => {
        updating.value = true;
        try {
            const res = await marketingApiFactory.updateCampaign(id, payload);
            return res.data;
        } finally {
            updating.value = false;
        }
    };

    const deleteCampaign = async (id: string) => {
        try {
            await marketingApiFactory.deleteCampaign(id);
        } catch (e) {
            console.error("Delete failed");
            throw e;
        }
    };

    const sendCampaign = async (id: string) => {
        try {
            await marketingApiFactory.sendCampaign(id);
        } catch (e) {
            console.error("Send failed");
            throw e;
        }
    };

    return {
        campaigns,
        templates,
        stats,
        loading,
        creating,
        updating,
        loadingTemplates,
        fetchCampaigns,
        fetchStats,
        fetchTemplates,
        seedTemplates,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        sendCampaign
    };
};
