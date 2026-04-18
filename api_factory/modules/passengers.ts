import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const passengersApiFactory = {
    getSavedPassengers() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/passengers");
    },
    createPassenger(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/passengers", payload);
    },
    updatePassenger(id: string, payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/passengers/${id}`, payload);
    },
    deletePassenger(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/passengers/${id}`);
    },
    getStats() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/passengers/stats");
    },
    getPassengerById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/passengers/${id}`);
    }
};
