import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const bookingsApiFactory = {
    getTenantBookings(tenantId: string, params?: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/bookings/tenant/${tenantId}`, { params });
    },
    // NOTE: `GET /bookings/stats` is admin-only (SUPER_ADMIN / TENANT_ADMIN) and
    // always returned 403 for agents. It has been removed; `useBookings()`
    // derives its stats from the agent's own bookings list instead.
    createBooking(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/bookings", payload);
    }
};
