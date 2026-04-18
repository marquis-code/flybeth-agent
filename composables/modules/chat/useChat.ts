import { ref } from 'vue';
import { chatApiFactory } from '@/api_factory/modules/chat';

export const useChat = () => {
    const loading = ref(false);
    const rooms = ref<any[]>([]);
    const messages = ref<any[]>([]);
    const activeRoom = ref<any>(null);

    const fetchRooms = async () => {
        loading.value = true;
        try {
            const res = await chatApiFactory.getRooms();
            rooms.value = res.data?.data || [];
            return res;
        } catch (err) {
            console.error('Failed to fetch rooms:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchMessages = async (roomId: string) => {
        loading.value = true;
        try {
            const res = await chatApiFactory.getMessages(roomId, { limit: 100 });
            messages.value = (res.data?.data || []).reverse();
            return res;
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        } finally {
            loading.value = false;
        }
    };

    const findAdminAndStartChat = async (guestData?: { email: string, name: string }) => {
        loading.value = true;
        try {
            // Handle common guest scenario
            if (guestData) {
                const res = await chatApiFactory.initSupport(guestData);
                const room = res.data?.data || res.data;
                activeRoom.value = room;
                // For guests, use the public support messages endpoint
                const msgRes = await chatApiFactory.getSupportMessages(room._id, { limit: 100 });
                messages.value = (msgRes.data?.data || []).reverse();
                return room;
            }

            // Standard logged-in agent logic
            await fetchRooms();
            const existingRoom = rooms.value.find(r => r.type === 'direct' || r.type === 'support');
            if (existingRoom) {
                activeRoom.value = existingRoom;
                await fetchMessages(existingRoom._id);
                return existingRoom;
            }

            // If not, find an admin and create a room
            const adminsRes = await chatApiFactory.getAdmins();
            const admins = adminsRes.data?.data || [];
            if (admins.length > 0) {
                const roomRes = await chatApiFactory.createRoom(admins[0]._id);
                const newRoom = roomRes.data?.data || roomRes.data;
                activeRoom.value = newRoom;
                messages.value = [];
                return newRoom;
            }
            throw new Error('No admin available to chat with.');
        } catch (err) {
            console.error('Failed to start chat with admin:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const sendMessage = async (roomId: string, content: string) => {
        // This is usually handled via WebSocket 'sendMessage' event
        // But we return a placeholder or handle optimistic UI here
        return { roomId, content, timestamp: new Date() };
    };

    return {
        loading,
        rooms,
        messages,
        activeRoom,
        fetchRooms,
        fetchMessages,
        findAdminAndStartChat,
        sendMessage
    };
};
