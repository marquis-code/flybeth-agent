import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const marketingApiFactory = {
    getStats() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/marketing/stats");
    },
    getCampaigns() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/marketing/campaigns");
    },
    getCampaignById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/marketing/campaigns/${id}`);
    },
    createCampaign(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/marketing/campaigns", payload);
    },
    updateCampaign(id: string, payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/marketing/campaigns/${id}`, payload);
    },
    deleteCampaign(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/marketing/campaigns/${id}`);
    },
    sendCampaign(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post(`/marketing/campaigns/${id}/send`);
    },
    getTemplates() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/marketing/templates");
    },
    seedTemplates() {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/marketing/templates/seed");
    }
};
