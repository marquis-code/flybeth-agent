import { ref, onMounted } from "vue";
import { GATEWAY_ENDPOINT_WITH_AUTH } from "@/api_factory/axios.config";

export const useNotifications = () => {
    const notifications = ref([]);
    const unreadCount = ref(0);
    const loading = ref(false);

    const fetchNotifications = async () => {
        loading.value = true;
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/notifications/my-notifications", {
                params: { page: 1, limit: 10 }
            });
            notifications.value = res.data.items || [];
        } finally {
            loading.value = false;
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const res = await GATEWAY_ENDPOINT_WITH_AUTH.get("/notifications/unread-count");
            unreadCount.value = res.data.count || 0;
        } catch (e) {
            console.error("Unread count fetch failed");
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await GATEWAY_ENDPOINT_WITH_AUTH.patch(`/notifications/${id}/read`);
            await fetchUnreadCount();
        } catch (e) {
            console.error("Mark read failed");
        }
    };

    const markAllAsRead = async () => {
        try {
            await GATEWAY_ENDPOINT_WITH_AUTH.patch("/notifications/mark-all-read");
            unreadCount.value = 0;
            notifications.value = notifications.value.map(n => ({ ...n, isRead: true }));
        } catch (e) {
            console.error("Mark all read failed");
        }
    };

    return {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead
    };
};
