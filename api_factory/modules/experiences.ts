import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const experiencesApiFactory = {
    searchLive(data: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/experiences/search/live", data);
    },
    getDetails(id: string, provider: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/experiences/${id}`, { params: { provider } });
    }
};
