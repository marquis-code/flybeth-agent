import { ref } from "vue";
import { uploadApiFactory } from "@/api_factory/modules/upload";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useUpload = () => {
    const loading = ref(false);
    const { showToast } = useCustomToast();

    const uploadImage = async (file: File) => {
        loading.value = true;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await uploadApiFactory.uploadImage(formData);
            showToast({
                title: "Upload Success",
                message: "Image uploaded successfully",
                toastType: "success",
            });
            return res.data;
        } catch (error: any) {
            showToast({
                title: "Upload Error",
                message: error?.response?.data?.message || "Image upload failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const uploadDocument = async (file: File) => {
        loading.value = true;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await uploadApiFactory.uploadDocument(formData);
            showToast({
                title: "Upload Success",
                message: "Document uploaded successfully",
                toastType: "success",
            });
            return res.data;
        } catch (error: any) {
            showToast({
                title: "Upload Error",
                message: error?.response?.data?.message || "Document upload failed",
                toastType: "error",
            });
            throw error;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        uploadImage,
        uploadDocument,
    };
};
