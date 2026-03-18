import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const bookingsApiFactory = {
    getTenantBookings(tenantId: string, params?: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/bookings/tenant/${tenantId}`, { params });
    },
    getStats(tenantId: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/bookings/stats", { params: { tenantId } });
    }
};
