import { ref } from "vue";
import { tenantsApiFactory } from "@/api_factory/modules/tenants";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGlobalLoader } from "@/composables/core/useGlobalLoader";

export const useTenants = () => {
    const loading = ref(false);
    const tenant = ref<any>(null);
    const { showToast } = useCustomToast();
    const { showLoader, hideLoader } = useGlobalLoader();

    const updateOnboarding = async (id: string, payload: any) => {
        loading.value = true;
        try {
            const res = await tenantsApiFactory.updateOnboarding(id, payload);
            showToast({
                title: "Progress Saved",
                message: "Your onboarding information has been updated.",
                toastType: "success",
            });
            return res.data;
        } catch (error: any) {
            showToast({
                title: "Error",
                message: error?.response?.data?.message || "Failed to update onboarding",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const getTenant = async (id: string) => {
        loading.value = true;
        try {
            const res = await tenantsApiFactory.getTenant(id);
            tenant.value = res.data;
            return res.data;
        } catch (error: any) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        tenant,
        updateOnboarding,
        getTenant,
    };
};
