import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const transfersApiFactory = {
    searchLive(data: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/transfers/search/live", data);
    }
};
