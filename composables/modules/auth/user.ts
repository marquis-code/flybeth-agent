import { ref, computed, onMounted } from "vue";
import { usersApiFactory } from "@/api_factory/modules/users";
import { uploadApiFactory } from "@/api_factory/modules/upload";

// Read from cookie at setup phase to initialize the ref
const _globalUser = ref(null);
const _globalLoading = ref(false);

const getUserFromCookie = () => {
    const stored = useCookie('user_profile').value;
    if (!stored) return null;
    try {
        return typeof stored === 'string' ? JSON.parse(stored) : stored;
    } catch (e) {
        return null;
    }
};

/**
 * Resolve the tenant id from a user object.
 *
 * The backend user document exposes `tenant`, NOT `tenantId`, and it may be
 * returned either as a raw id string or as a populated Tenant object
 * (e.g. `usersService.findById()` populates it). Both shapes are handled here
 * so every caller can rely on a single helper.
 */
export const resolveTenantId = (user: any): string | null => {
    const tenant = user?.tenant;
    if (!tenant) return null;
    if (typeof tenant === 'string') return tenant;
    // Populated object (Mongoose document / lean object)
    if (tenant._id) return String(tenant._id);
    if (tenant.id) return String(tenant.id);
    // Raw BSON ObjectId (not yet serialised)
    if (typeof (tenant as any).toHexString === 'function') {
        return String((tenant as any).toHexString());
    }
    return null;
};

export const useUser = () => {
    const user = _globalUser;
    const loading = _globalLoading;

    // ─── Actions ─────────────────────────────────────────────────────────────
    const setUser = (newUser: any) => {
        user.value = newUser;
        if (newUser) {
            useCookie('user_profile', { maxAge: 7 * 24 * 60 * 60, path: "/", sameSite: "lax" }).value = JSON.stringify(newUser);
        } else {
            useCookie('user_profile').value = null;
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
            useCookie('accessToken').value = null;
            useCookie('refreshToken').value = null;
            useCookie('user_profile').value = null;
            
            // Clean localStorage just in case
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user_profile');

            window.location.href = "/auth/login";
        }
    };

    const isLoggedIn = computed(() => !!user.value);

    const token = computed(() => useCookie('accessToken').value || "");

    onMounted(() => {
        if (!_globalUser.value) {
            _globalUser.value = getUserFromCookie();
        }
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

/**
 * Reactive tenant id for the currently authenticated user.
 * Returns `null` until the user (or their populated tenant) is available.
 */
export const useTenantId = () => {
    const { user } = useUser();
    return computed(() => resolveTenantId(user.value));
};
