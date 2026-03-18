import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const authApiFactory = {
    register(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/register", payload);
    },
    login(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/login", payload);
    },
    verifyOtp(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/verify-otp", payload);
    },
    refreshToken(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/refresh", payload);
    },
    resendOtp(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/resend-otp", payload);
    },
    forgotPassword(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/forgot-password", payload);
    },
    resetPassword(payload: any) {
        return GATEWAY_ENDPOINT.post("/auth/reset-password", payload);
    },
    logout() {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/auth/logout");
    }
};
