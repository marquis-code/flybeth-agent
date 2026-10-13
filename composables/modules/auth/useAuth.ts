import { ref } from "vue";
import { authApiFactory } from "@/api_factory/modules/auth";
import { useUser } from "./user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGlobalLoader } from "@/composables/core/useGlobalLoader";

export const useAuth = () => {
  const loading = ref(false);
  const { user, setUser, logOut } = useUser();
  const { showToast } = useCustomToast();
  const { showLoader, hideLoader } = useGlobalLoader();

  /**
   * Persist auth state to cookies — the single source of truth shared with the
   * auth middleware (`middleware/auth.global.ts`), `useUser()` and the axios
   * interceptors (`api_factory/axios.config.ts`).
   */
  const persistSession = (accessToken: string, refreshToken: string, userData: any) => {
    const accessTokenCookie = useCookie("accessToken", { maxAge: 7 * 24 * 60 * 60, path: "/", sameSite: "lax" });
    const refreshTokenCookie = useCookie("refreshToken", { maxAge: 30 * 24 * 60 * 60, path: "/", sameSite: "lax" });
    const userProfileCookie = useCookie("user_profile", { maxAge: 7 * 24 * 60 * 60, path: "/", sameSite: "lax" });

    const profileJson = JSON.stringify(userData);

    accessTokenCookie.value = accessToken;
    refreshTokenCookie.value = refreshToken;
    userProfileCookie.value = profileJson;

    // Nuxt's cookie ref only flushes to `document.cookie` on the next tick,
    // but login/verify hard-redirect with `window.location.replace()` straight
    // away. Write the cookies synchronously too so the middleware can never
    // miss them.
    if (import.meta.client) {
      const maxAgeAccess = 7 * 24 * 60 * 60;
      const maxAgeRefresh = 30 * 24 * 60 * 60;
      document.cookie = `accessToken=${encodeURIComponent(accessToken || "")}; path=/; max-age=${maxAgeAccess}; SameSite=Lax`;
      document.cookie = `refreshToken=${encodeURIComponent(refreshToken || "")}; path=/; max-age=${maxAgeRefresh}; SameSite=Lax`;
      document.cookie = `user_profile=${encodeURIComponent(profileJson)}; path=/; max-age=${maxAgeAccess}; SameSite=Lax`;

      // Nuke localStorage just in case legacy tokens remain
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_profile");
    }
  };

  const login = async (payload: any) => {
    loading.value = true;
    showLoader();
    try {
      const res = await authApiFactory.login(payload);
      const data = res.data.data || res.data;

      if (data?.user) {
        const token = data.accessToken || data.tokens?.accessToken;
        const refresh = data.refreshToken || data.tokens?.refreshToken;

        persistSession(token, refresh, data.user);
        setUser(data.user);

        showToast({
          title: "Login Successful",
          message: "Welcome back!",
          toastType: "success",
        });

        return { ...data, token, accessToken: token, refreshToken: refresh };
      } else if (data?.requiresOtp) {
        showToast({
          title: "Verification Sent",
          message: "A code has been sent to your email.",
          toastType: "info",
        });
        return data;
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
      const data = res.data.data || res.data;
      if (data.user) {
        // We don't necessarily persist session on register if it requires OTP
        // but if it returns a user/token, handle it.
        showToast({
          title: "Registration Success",
          message: data.message || "Account created!",
          toastType: "success",
        });
      } else {
        showToast({
          title: "Registration Success",
          message: data.message || "Account created! Please verify your email.",
          toastType: "success",
        });
      }
      return data;
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
      const data = res.data.data || res.data;

      const token = data.accessToken || data.tokens?.accessToken;
      const refresh = data.refreshToken || data.tokens?.refreshToken;

      persistSession(token, refresh, data.user);
      setUser(data.user);

      showToast({
        title: "Access Granted",
        message: "Verified successfully",
        toastType: "success",
      });
      return { ...data, token, accessToken: token, refreshToken: refresh };
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

  const logout = () => {
    logOut(); // useUser handles the clearing
  };

  const resendOtp = async (payload: { email: string }) => {
    loading.value = true;
    try {
      const res = await authApiFactory.resendOtp(payload);
      showToast({
        title: "Code Resent",
        message: "A new code has been sent to your email.",
        toastType: "success",
      });
      return res.data;
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
      showToast({
        title: "Reset link sent",
        message: "Please check your inbox for instructions.",
        toastType: "success",
      });
      return res.data;
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
      showToast({
        title: "Password Updated",
        message: "Credentials successfully reset.",
        toastType: "success",
      });
      return res.data;
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
    user,
  };
};