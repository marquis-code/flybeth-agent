import { ref } from "vue";
import { usersApiFactory } from "@/api_factory/modules/users";

export const useUsers = () => {
    const users = ref([]);
    const loading = ref(false);
    const creating = ref(false);

    const fetchUsers = async () => {
        loading.value = true;
        try {
            const res = await usersApiFactory.getTenantUsers();
            users.value = res.data.items || res.data;
        } catch (e) {
            console.error("Failed to fetch users");
        } finally {
            loading.value = false;
        }
    };

    const createUser = async (payload: any) => {
        creating.value = true;
        try {
            const res = await usersApiFactory.createUser(payload);
            return res.data;
        } finally {
            creating.value = false;
        }
    };

    return {
        users,
        loading,
        creating,
        fetchUsers,
        createUser
    };
};
