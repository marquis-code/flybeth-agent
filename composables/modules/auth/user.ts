import { ref, computed } from "vue";

export const useUser = () => {
    const token = useCookie('token', { path: '/', sameSite: 'lax' });
    const refreshToken = useCookie('refreshToken', { path: '/', sameSite: 'lax' });
    const userData = useCookie('user', { path: '/', sameSite: 'lax' });

    const user = computed(() => userData.value);

    const setToken = (newToken: string) => {
        token.value = newToken;
    };

    const setRefreshToken = (newRefreshToken: string) => {
        refreshToken.value = newRefreshToken;
    };

    const setUser = (newUser: any) => {
        userData.value = newUser;
    };

    const logOut = () => {
        token.value = null;
        refreshToken.value = null;
        userData.value = null;
        if (typeof window !== 'undefined') {
            window.location.href = "/";
        }
    };

    return {
        token,
        refreshToken,
        user,
        setToken,
        setRefreshToken,
        setUser,
        logOut,
    };
};
