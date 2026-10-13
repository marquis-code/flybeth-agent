import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export interface CarSearchParams {
    type?: string;
    pickUpLocation: string;
    dropOffLocation?: string;
    pickUpDate: string;
    dropOffDate?: string;
    pickUpTime?: string;
    dropOffTime?: string;
    category?: string;
    currency?: string;
    passengers?: number;
    driverAge?: number;
    driverCountryCode?: string;
}

export const carsApiFactory = {
    /**
     * Search car inventory.
     *
     * The backend has no `POST /cars/search/live` route; the real (and only)
     * search route is `GET /cars/search`. It returns
     * `{ dbResults, liveResults, results, meta }` inside the standard
     * `{ success, data, … }` envelope.
     */
    search(params: CarSearchParams) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/cars/search", { params });
    }
};
