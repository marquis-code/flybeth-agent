import { ref, computed } from "vue";
import { usersApiFactory } from "@/api_factory/modules/users";
import { uploadApiFactory } from "@/api_factory/modules/upload";

const getUserFromStorage = () => {
    if (!import.meta.client) return null;
    const stored = localStorage.getItem('user_profile');
    if (!stored || stored === 'undefined' || stored === 'null') return null;
    try {
        return JSON.parse(stored);
    } catch (e) {
        return null;
    }
};

const _globalUser = ref(getUserFromStorage());
const _globalLoading = ref(false);

export const useUser = () => {
    const user = _globalUser;
    const loading = _globalLoading;

    // ─── Actions ─────────────────────────────────────────────────────────────
    const setUser = (newUser: any) => {
        user.value = newUser;
        if (import.meta.client) {
            if (newUser) {
                localStorage.setItem('user_profile', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user_profile');
            }
        }
    };

    const fetchProfile = async () => {
        loading.value = true;
        try {
            const res = await usersApiFactory.getProfile();
            console.log(res.data, 'user profile');
            const userData = res.data?.data || res.data;
            setUser(userData);
        } finally {
            loading.value = false;
        }
    };

    const updateProfile = async (payload: any) => {
        loading.value = true;
        try {
            const res = await usersApiFactory.updateProfile(payload);
            const userData = res.data?.data || res.data;
            setUser(userData);
            return userData;
        } finally {
            loading.value = false;
        }
    };

    const uploadAvatar = async (file: File) => {
        loading.value = true;
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'avatars');
            const uploadRes = await uploadApiFactory.uploadImage(formData);
            const avatarUrl = uploadRes.data?.data?.url || uploadRes.data?.url;
            
            // Update profile with new avatar URL
            const updatedUser = await updateProfile({ avatar: avatarUrl });
            return updatedUser;
        } finally {
            loading.value = false;
        }
    };

    const logOut = () => {
        user.value = null;
        if (import.meta.client) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user_profile');
            
            // Nuclear cookie cleanup (just in case any old ones linger)
            const cookieNames = ['accessToken', 'refreshToken', 'user_profile'];
            cookieNames.forEach(name => {
              document.cookie = `${name}=; path=/; max-age=0`;
              document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            });

            window.location.href = "/auth/login";
        }
    };

    const isLoggedIn = computed(() => !!user.value);

    // Dummy for compatibility
    const token = ref("");

    onMounted(() => {
        fetchProfile()
    })

    return {
        token,
        user,
        loading,
        setUser,
        fetchProfile,
        updateProfile,
        uploadAvatar,
        logOut,
        isLoggedIn
    };
};
