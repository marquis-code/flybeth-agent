import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const itinerariesApiFactory = {
    getItineraries() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/itineraries");
    },
    getItineraryById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/itineraries/${id}`);
    },
    createItinerary(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/itineraries", payload);
    },
    updateItinerary(id: string, payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post(`/itineraries/${id}`, payload);
    }
};
