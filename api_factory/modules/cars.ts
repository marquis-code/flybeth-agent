import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const carsApiFactory = {
    searchLive(data: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/cars/search/live", data);
    }
};
