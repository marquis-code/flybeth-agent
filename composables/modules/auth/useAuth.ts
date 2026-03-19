import { ref } from "vue";
import { authApiFactory } from "@/api_factory/modules/auth";
import { useUser } from "./user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGlobalLoader } from "@/composables/core/useGlobalLoader";

export const useAuth = () => {
    const loading = ref(false);
    const { setToken, setRefreshToken, setUser, logOut } = useUser();
    const { showToast } = useCustomToast();
    const { showLoader, hideLoader } = useGlobalLoader();

    const login = async (payload: any) => {
        loading.value = true;
        showLoader();
        try {
            const res = await authApiFactory.login(payload);
            if (res.status === 200 || res.status === 201) {
                showToast({
                    title: "Verification Sent",
                    message: "A code has been sent to your email.",
                    toastType: "info",
                });
                return res.data;
            }
            throw new Error("Login failed");
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Login failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
            hideLoader();
        }
    };

    const register = async (payload: any) => {
        loading.value = true;
        showLoader();
        try {
            const res = await authApiFactory.register(payload);
            if (res.status === 200 || res.status === 201) {
                showToast({
                    title: "Registration Success",
                    message: "Account created! Please verify your email.",
                    toastType: "success",
                });
                return res.data;
            }
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Registration failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
            hideLoader();
        }
    };

    const verifyOtp = async (payload: { email: string; otp: string }) => {
        loading.value = true;
        showLoader();
        try {
            const res = await authApiFactory.verifyOtp(payload);
            if (res.status === 200 || res.status === 201) {
                const { accessToken, refreshToken, user } = res.data;
                setToken(accessToken);
                setRefreshToken(refreshToken);
                setUser(user);
                showToast({
                    title: "Access Granted",
                    message: "Verified successfully",
                    toastType: "success",
                });
                return res.data;
            }
            throw new Error("Verification failed");
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Verification failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
            hideLoader();
        }
    };

    const logout = async () => {
        loading.value = true;
        try {
            await authApiFactory.logout();
            logOut();
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const resendOtp = async (payload: { email: string }) => {
        loading.value = true;
        try {
            const res = await authApiFactory.resendOtp(payload);
            if (res.status === 200 || res.status === 201) {
                showToast({
                    title: "Code Resent",
                    message: "A new code has been sent to your email.",
                    toastType: "success",
                });
                return res.data;
            }
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Failed to resend code",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const forgotPassword = async (payload: { email: string }) => {
        loading.value = true;
        showLoader();
        try {
            const res = await authApiFactory.forgotPassword(payload);
            if (res.status === 200 || res.status === 201) {
                showToast({
                    title: "Reset link sent",
                    message: "Please check your inbox for instructions.",
                    toastType: "success",
                });
                return res.data;
            }
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Request failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
            hideLoader();
        }
    };

    const resetPassword = async (payload: any) => {
        loading.value = true;
        showLoader();
        try {
            const res = await authApiFactory.resetPassword(payload);
            if (res.status === 200 || res.status === 201) {
                showToast({
                    title: "Password Updated",
                    message: "Credentials successfully reset.",
                    toastType: "success",
                });
                return res.data;
            }
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Reset failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
            hideLoader();
        }
    };

    return {
        loading,
        login,
        register,
        verifyOtp,
        resendOtp,
        forgotPassword,
        resetPassword,
        logout,
    };
};
