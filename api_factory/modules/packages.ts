import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const packagesApiFactory = {
    getPackages(query = {}) {
        const queryStr = new URLSearchParams(query as any).toString();
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/packages?${queryStr}`);
    },
    getPackageById(id: string) {
        return GATEWAY_ENDPOINT_WITH_AUTH.get(`/packages/${id}`);
    },
    createPackage(payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post("/packages", payload);
    },
    updatePackage(id: string, payload: any) {
        return GATEWAY_ENDPOINT_WITH_AUTH.post(`/packages/${id}`, payload);
    }
};
