<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-md w-full space-y-12 text-center">
      <!-- Logo/Brand -->
      <div class="flex justify-center mb-8" @click="navigateTo('/')">
        <img src="@/assets/img/logo.png" class="w-auto h-12 cursor-pointer" alt="logo" />
      </div>

      <div class="space-y-4">
        <h1 class="text-4xl  text-primary-dark er">Verify your email.</h1>
        <p class="text-neutral-400 font-medium">
          A verification code has been sent to <br />
          <strong class="text-primary-dark">{{ email }}</strong>
        </p>
      </div>

      <div class="space-y-10">
        <div class="flex flex-col items-center">
          <OtpInput v-model="otp" @complete="handleVerify" />
        </div>

        <div class="space-y-6">
          <BaseButton 
            @click="handleVerify" 
            variant="primary" 
            block 
            size="lg" 
            :loading="loading"
            class="shadow-xl shadow-primary-dark/20"
            :disabled="otp.length !== 6"
          >
            Verify & sign in
          </BaseButton>

          <p class="text-sm font-medium text-neutral-400">
            Didn't receive the code? 
            <button 
              @click="handleResend" 
              :disabled="timer > 0 || resending"
              class="text-secondary    hover:underline ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ timer > 0 ? `Resend in ${timer}s` : 'Resend code' }}
            </button>
          </p>
        </div>

        <div class="pt-8 border-t border-neutral-100">
           <NuxtLink to="/auth/login" class="text-xs  text-neutral-300 hover:text-primary  transition-colors ">Return to sign in</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OtpInput from '@/components/ui/OtpInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

const otp = ref('')
const email = ref('')
const timer = ref(60)
const resending = ref(false)
let timerInterval: any = null

definePageMeta({
  layout: 'auth'
})

const { verifyOtp, resendOtp, loading } = useAuth()
const router = useRouter()
const route = useRoute()

const startTimer = () => {
  timer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

onMounted(() => {
  email.value = (route.query.email as string) || localStorage.getItem('verify_email') || ''
  if (!email.value) {
    router.push('/auth/login')
  }
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const handleVerify = async () => {
  if (otp.value.length !== 6) return
  
  try {
    const res = await verifyOtp({
      email: email.value,
      otp: otp.value
    })
    
    localStorage.removeItem('verify_email')
    
    // Auth-related localStorage state is already handled by useAuth.verifyOtp
    
    // Nuclear cookie cleanup (just in case)
    if (import.meta.client) {
      const cookieNames = ['accessToken', 'refreshToken', 'user_profile'];
      cookieNames.forEach(name => {
        document.cookie = `${name}=; path=/; max-age=0`;
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
    }

    if (res?.user?.status === 'pending') {
      window.location.replace('/auth/success')
    } else {
      // Use location.replace for a hard redirect to ensure
      // middleware picks up the new localStorage state.
      window.location.replace('/dashboard')
    }
  } catch (error) {
    // Error handled in useAuth
  }
}

const handleResend = async () => {
  if (timer.value > 0 || resending.value) return
  
  resending.value = true
  try {
    await resendOtp({ email: email.value })
    otp.value = ''
    startTimer()
  } catch (error) {
    // Error handled in useAuth
  } finally {
    resending.value = false
  }
}
</script>
