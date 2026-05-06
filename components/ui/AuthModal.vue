<template>
  <Teleport to="body">
    <Transition name="auth-modal">
      <div v-if="isOpen" class="fixed inset-0 z-[99999] flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click.self="close" />

        <!-- Modal Card -->
        <div class="relative w-full max-w-md mx-4 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          
          <!-- Top Gradient Bar -->
          <div class="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

          <!-- Header -->
          <div class="px-8 pt-8 pb-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :class="step === 'otp' ? 'bg-primary/10' : 'bg-amber-50'">
                  <KeyRound v-if="step === 'otp'" class="h-6 w-6 text-primary" />
                  <ShieldAlert v-else class="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 class="text-sm  text-gray-900 tracking-tight">
                    {{ step === 'otp' ? 'Verify Identity' : 'Session Expired' }}
                  </h3>
                  <p class="text-sm font-medium text-gray-800 mt-0.5">
                    {{ step === 'otp' ? `Code sent to ${maskedEmail}` : 'Sign in to continue' }}
                  </p>
                </div>
              </div>
              <button @click="close" class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-800 hover:text-red-500 hover:bg-red-50 transition-all">
                <X class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <Transition name="fade">
            <div v-if="errorMessage" class="mx-8 mb-4 px-5 py-3.5 bg-red-50 border border-red-100 rounded-2xl">
              <p class="text-sm font-bold text-red-600">{{ errorMessage }}</p>
            </div>
          </Transition>

          <!-- ═══ Step 1: Login Form ═══ -->
          <form v-if="step === 'login'" @submit.prevent="handleLogin" class="px-8 pb-8 space-y-5">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Email Address</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="agent@company.com"
                  class="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-5 text-sm font-semibold text-gray-900 placeholder:text-gray-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Password</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••••"
                  class="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-14 text-sm font-semibold text-gray-900 placeholder:text-gray-800 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 hover:text-gray-800 transition-colors"
                >
                  <Eye v-if="!showPassword" class="h-5 w-5" />
                  <EyeOff v-else class="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full h-14 bg-gray-900 hover:bg-black text-white  text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <div v-if="isLoading" class="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
              <template v-else>
                <LogIn class="h-5 w-5" />
                Authenticate
              </template>
            </button>
          </form>

          <!-- ═══ Step 2: OTP Verification ═══ -->
          <div v-if="step === 'otp'" class="px-8 pb-8 space-y-6">
            <!-- OTP Info -->
            <div class="bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4">
              <p class="text-sm font-semibold text-gray-800">
                A verification code has been sent to your email. Enter it below to complete authentication.
              </p>
            </div>

            <!-- OTP Input -->
            <div class="flex justify-center">
              <OtpInput
                v-model="otpCode"
                :length="6"
                @complete="handleOtpComplete"
              />
            </div>

            <!-- Verify Button -->
            <button
              @click="handleVerifyOtp"
              :disabled="isLoading || otpCode.length < 6"
              class="w-full h-14 bg-gray-900 hover:bg-black text-white  text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <div v-if="isLoading" class="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
              <template v-else>
                <ShieldCheck class="h-5 w-5" />
                Verify Code
              </template>
            </button>

            <!-- Resend & Back Actions -->
            <div class="flex items-center justify-between pt-2">
              <button
                @click="step = 'login'"
                class="text-sm font-semibold text-gray-800 hover:text-gray-800 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft class="h-4 w-4" />
                Back to login
              </button>
              <button
                @click="handleResendOtp"
                :disabled="resendCooldown > 0"
                class="text-sm font-bold transition-colors disabled:opacity-40"
                :class="resendCooldown > 0 ? 'text-gray-800' : 'text-primary hover:text-primary/80'"
              >
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import { ShieldAlert, ShieldCheck, X, Mail, Lock, Eye, EyeOff, LogIn, KeyRound, ArrowLeft } from 'lucide-vue-next'
import OtpInput from '@/components/ui/OtpInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'authenticated'])

const { login, verifyOtp, resendOtp } = useAuth()

// State
const step = ref<'login' | 'otp'>('login')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const otpCode = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

const maskedEmail = computed(() => {
  if (!email.value) return ''
  const [local, domain] = email.value.split('@')
  if (!domain) return email.value
  const visible = local.slice(0, 2)
  return `${visible}***@${domain}`
})

// Reset state when modal opens
watch(() => props.isOpen, (val) => {
  if (val) {
    errorMessage.value = ''
    step.value = 'login'
    otpCode.value = ''
  }
})

// Cleanup timer on unmount
onBeforeUnmount(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

const startResendCooldown = () => {
  resendCooldown.value = 60
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      if (cooldownTimer) clearInterval(cooldownTimer)
    }
  }, 1000)
}

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const result = await login({ email: email.value, password: password.value })

    if (result?.accessToken || result?.token) {
      // Direct login success (no OTP required)
      emit('authenticated')
      emit('close')
      resetForm()
    } else if (result?.requiresOtp) {
      // OTP required — switch to OTP step
      step.value = 'otp'
      otpCode.value = ''
      startResendCooldown()
    }
  } catch (err: any) {
    errorMessage.value = err?.response?.data?.message || 'Authentication failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleOtpComplete = (code: string) => {
  otpCode.value = code
  handleVerifyOtp()
}

const handleVerifyOtp = async () => {
  if (otpCode.value.length < 6) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    const result = await verifyOtp({ email: email.value, otp: otpCode.value })
    if (result?.accessToken || result?.token) {
      emit('authenticated')
      emit('close')
      resetForm()
    }
  } catch (err: any) {
    errorMessage.value = err?.response?.data?.message || 'Invalid verification code. Please try again.'
    otpCode.value = ''
  } finally {
    isLoading.value = false
  }
}

const handleResendOtp = async () => {
  if (resendCooldown.value > 0) return
  errorMessage.value = ''
  try {
    await resendOtp({ email: email.value })
    startResendCooldown()
  } catch (err: any) {
    errorMessage.value = err?.response?.data?.message || 'Failed to resend code.'
  }
}

const resetForm = () => {
  email.value = ''
  password.value = ''
  otpCode.value = ''
  step.value = 'login'
  errorMessage.value = ''
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.auth-modal-enter-active,
.auth-modal-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.auth-modal-enter-from,
.auth-modal-leave-to {
  opacity: 0;
}
.auth-modal-enter-from .relative,
.auth-modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
