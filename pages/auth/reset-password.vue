<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-md w-full space-y-12 text-center">
      <!-- Logo/Brand -->
      <div class="flex justify-center mb-8" @click="navigateTo('/')">
        <img src="@/assets/img/logo.png" class="w-auto h-12 cursor-pointer" alt="logo" />
      </div>

      <div class="space-y-4">
        <h1 class="text-4xl font-black text-primary-dark tracking-tighter">Reset password.</h1>
        <p class="text-neutral-400 font-medium">
          Enter your new password below.
        </p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-8 text-left">
        <div class="space-y-6">
          <AnimatedInput
            v-model="form.password"
            label="New Password"
            type="password"
            required
            placeholder="Min. 8 characters"
          />
          <AnimatedInput
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            required
            placeholder="Repeat password"
          />
        </div>

        <div class="space-y-6">
          <BaseButton
            type="submit"
            variant="primary"
            block
            size="lg"
            :loading="loading"
            class="shadow-xl shadow-primary-dark/20"
          >
            Reset password
          </BaseButton>

          <div class="pt-4 text-center">
            <NuxtLink to="/auth/login" class="text-xs font-black text-neutral-300 hover:text-primary tracking-[0.2em] transition-colors uppercase">Return to sign in</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { resetPassword, loading } = useAuth()
const { showToast } = useCustomToast()
const route = useRoute()
const router = useRouter()

const form = reactive({
  password: '',
  confirmPassword: '',
  token: ''
})

definePageMeta({
  layout: 'auth'
})

onMounted(() => {
  form.token = route.query.token as string || ''
  if (!form.token) {
    showToast({
      title: 'Invalid Link',
      message: 'Reset token is missing or expired.',
      toastType: 'error'
    })
    router.push('/auth/login')
  }
})

const handleReset = async () => {
  if (form.password !== form.confirmPassword) {
    showToast({
      title: 'Mismatch',
      message: 'Passwords do not match.',
      toastType: 'warning'
    })
    return
  }

  try {
    await resetPassword({
      token: form.token,
      password: form.password
    })
    router.push('/auth/login')
  } catch (error) {
    // Error handled in useAuth
  }
}
</script>
