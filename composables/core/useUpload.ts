import { ref } from 'vue'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useUpload = () => {
    const uploading = ref(false)
    const { showToast } = useCustomToast()
    const config = useRuntimeConfig()

    const uploadFile = async (file: File, type: 'image' | 'document' = 'image', folder: string = 'agents') => {
        uploading.value = true
        const formData = new FormData()
        formData.append('file', file)

        try {
            const baseUrl = config.public.apiBase || 'http://localhost:3000/api/v1'
            const response = await fetch(`${baseUrl}/upload/${type}?folder=${folder}`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Upload failed')
            }

            const data = await response.json()
            showToast({
                title: 'Upload Success',
                message: 'File uploaded successfully',
                toastType: 'success'
            })
            return data
        } catch (error: any) {
            console.error('Upload error:', error)
            showToast({
                title: 'Upload Error',
                message: error.message || 'Failed to upload file',
                toastType: 'error'
            })
            throw error
        } finally {
            uploading.value = false
        }
    }

    return {
        uploading,
        uploadFile
    }
}
