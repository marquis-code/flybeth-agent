import { ref } from 'vue';
import { packagesApiFactory } from '@/api_factory/modules/packages';
import { uploadApiFactory } from '@/api_factory/modules/upload';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const usePackages = () => {
    const packagesList = ref<any[]>([]);
    const loading = ref(false);
    const saving = ref(false);
    const uploading = ref(false);
    const { showToast } = useCustomToast();

    const fetchPackages = async () => {
        loading.value = true;
        try {
            const res = await packagesApiFactory.getPackages();
            packagesList.value = res.data?.data || res.data || [];
        } catch (error: any) {
            console.error('Failed to fetch packages:', error);
            showToast('Failed to load commercial offers', 'error');
            packagesList.value = [];
        } finally {
            loading.value = false;
        }
    };

    const createPackage = async (payload: any) => {
        saving.value = true;
        try {
            const res = await packagesApiFactory.createPackage(payload);
            showToast('Commercial offer dynamically constructed', 'success');
            await fetchPackages();
            return res.data?.data || res.data;
        } catch (error: any) {
            console.error('Failed to create offer:', error);
            showToast('Failed to deploy offer', 'error');
            throw error;
        } finally {
            saving.value = false;
        }
    };

    const updatePackage = async (id: string, payload: any) => {
        saving.value = true;
        try {
            const res = await packagesApiFactory.updatePackage(id, payload);
            showToast('Commercial offer configuration modernized', 'success');
            await fetchPackages();
            return res.data?.data || res.data;
        } catch (error: any) {
            console.error('Failed to update package:', error);
            showToast('Configuration modification failed', 'error');
            throw error;
        } finally {
            saving.value = false;
        }
    };

    const uploadCoverImage = async (file: File): Promise<string> => {
        uploading.value = true;
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'packages');
            const uploadRes = await uploadApiFactory.uploadImage(formData);
            const coverUrl = uploadRes.data?.data?.url || uploadRes.data?.url;
            return coverUrl;
        } catch (error: any) {
            console.error('Upload failed:', error);
            showToast('Cover photo upload failed', 'error');
            throw error;
        } finally {
            uploading.value = false;
        }
    };

    return {
        packagesList,
        loading,
        saving,
        uploading,
        fetchPackages,
        createPackage,
        updatePackage,
        uploadCoverImage
    };
};
