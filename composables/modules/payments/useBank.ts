import { ref } from 'vue'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useBank = () => {
    const banks = ref<any[]>([])
    const loadingBanks = ref(false)
    const verifyingAccount = ref(false)
    const { showToast } = useCustomToast()
    const config = useRuntimeConfig()

    const fetchBanks = async () => {
        loadingBanks.value = true
        try {
            const baseUrl = config.public.apiBase || 'http://localhost:3000/api/v1'
            const response = await fetch(`${baseUrl}/payments/banks/paystack`)
            if (!response.ok) throw new Error('Failed to fetch banks')
            const data = await response.json()
            banks.value = data.data || []
            return data.data
        } catch (error: any) {
            console.error('Fetch banks error:', error)
            showToast({
                title: 'Error',
                message: 'Could not load bank list',
                toastType: 'error'
            })
        } finally {
            loadingBanks.value = false
        }
    }

    const verifyAccount = async (accountNumber: string, bankCode: string) => {
        if (!accountNumber || accountNumber.length < 10 || !bankCode) return null
        
        verifyingAccount.value = true
        try {
            const baseUrl = config.public.apiBase || 'http://localhost:3000/api/v1'
            const response = await fetch(`${baseUrl}/payments/verify-account?account_number=${accountNumber}&bank_code=${bankCode}`)
            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.message || 'Account verification failed')
            }
            const data = await response.json()
            return data.data
        } catch (error: any) {
            console.error('Verify account error:', error)
            showToast({
                title: 'Verification Failed',
                message: error.message || 'Could not verify account details',
                toastType: 'error'
            })
            return null
        } finally {
            verifyingAccount.value = false
        }
    }

    return {
        banks,
        loadingBanks,
        verifyingAccount,
        fetchBanks,
        verifyAccount
    }
}
