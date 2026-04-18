import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const analyticsApiFactory = {
    getBookings(tenantId: string, days?: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/analytics/bookings", { params: { tenantId, days } });
    },
    getRevenue(tenantId: string, days?: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/analytics/revenue", { params: { tenantId, days } });
    },
    getPopularRoutes(tenantId: string, limit?: number) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/analytics/popular-routes", { params: { tenantId, limit } });
    }
};
