import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const staysApiFactory = {
    searchLive(data: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/stays/search/live", data);
    },
    fetchRates(data: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/stays/rates", data);
    },
    getStay(id: string, provider?: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/stays/${id}`, { params: { provider } });
    }
};
