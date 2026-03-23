import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const tenantsApiFactory = {
  updateOnboarding(id: string, payload: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/tenants/${id}/onboarding`, payload);
  },
  getTenant(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/tenants/${id}`);
  },
};
