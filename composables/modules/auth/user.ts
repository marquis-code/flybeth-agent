import { ref } from "vue";

const isBrowser = typeof window !== "undefined";

const safeParseUser = () => {
    if (!isBrowser) return null;
    try {
        const raw = localStorage.getItem("user");
        if (!raw || raw === "undefined") return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const useUser = () => {
    const token = ref(isBrowser ? localStorage.getItem("token") || "" : "");
    const refreshToken = ref(isBrowser ? localStorage.getItem("refreshToken") || "" : "");
    const user = ref(safeParseUser());

    const setToken = (newToken: string) => {
        token.value = newToken;
        if (isBrowser) localStorage.setItem("token", newToken);
    };

    const setRefreshToken = (newRefreshToken: string) => {
        refreshToken.value = newRefreshToken;
        if (isBrowser) localStorage.setItem("refreshToken", newRefreshToken);
    };

    const setUser = (newUser: any) => {
        user.value = newUser;
        if (isBrowser) localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logOut = () => {
        token.value = "";
        refreshToken.value = "";
        user.value = null;
        if (isBrowser) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
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
