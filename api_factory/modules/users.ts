import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const usersApiFactory = {
    getProfile() {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/users/me");
    },
    updateProfile(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.patch("/users/me", payload);
    },
    getTenantUsers(params?: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get("/users", { params });
    },
    createUser(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/users", payload);
    }
};
