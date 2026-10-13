import { ref } from "vue";
import { bookingsApiFactory } from "@/api_factory/modules/bookings";
import { useUser, resolveTenantId } from "../auth/user";

export const useBookings = () => {
    const loading = ref(false);
    const bookings = ref<any[]>([]);
    const stats = ref<any>(null);
    const { user } = useUser();

    const fetchBookings = async (params?: any) => {
        const tenantId = resolveTenantId(user.value);
        if (!tenantId) return;
        loading.value = true;
        try {
            const res = await bookingsApiFactory.getTenantBookings(tenantId, params);
            if (res.status === 200 || res.status === 201) {
                // Backend envelope: { success, data, message, timestamp, meta? }
                const payload = res.data?.data ?? res.data;
                if (Array.isArray(payload)) {
                    bookings.value = payload;
                } else if (Array.isArray(payload?.items)) {
                    bookings.value = payload.items;
                } else if (Array.isArray(payload?.data)) {
                    bookings.value = payload.data;
                } else {
                    bookings.value = [];
                }
                return res;
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    /**
     * `GET /bookings/stats` is restricted to SUPER_ADMIN / TENANT_ADMIN, so the
     * agent portal only ever received a 403 for it. The numbers the UI needs
     * are tiny, so they are derived client-side from the agent's own bookings
     * list instead of hammering an endpoint we are not allowed to call.
     */
    const fetchStats = async () => {
        const tenantId = resolveTenantId(user.value);
        if (!tenantId) return;

        if (!bookings.value.length) {
            await fetchBookings({ limit: 100 });
        }

        const list = Array.isArray(bookings.value) ? bookings.value : [];
        const statusOf = (booking: any) =>
            String(booking?.status || "").toLowerCase();
        const countBy = (statuses: string[]) =>
            list.filter((booking) => statuses.includes(statusOf(booking))).length;

        stats.value = {
            total: list.length,
            totalBookings: list.length,
            activeBookings: countBy(["pending", "confirmed", "ticketed"]),
            pendingBookings: countBy(["pending"]),
            confirmedBookings: countBy(["confirmed", "ticketed"]),
            cancelledBookings: countBy(["cancelled", "canceled"]),
            totalRevenue: list.reduce(
                (sum: number, booking: any) =>
                    sum + Number(booking?.pricing?.totalAmount || 0),
                0,
            ),
        };
        return stats.value;
    };

    const createBooking = async (payload: any) => {
        loading.value = true;
        try {
            const res = await bookingsApiFactory.createBooking(payload);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            }
        } catch (error: any) {
            console.error(error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        bookings,
        stats,
        fetchBookings,
        fetchStats,
        createBooking,
    };
};
