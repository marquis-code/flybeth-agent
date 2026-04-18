<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-md w-full space-y-12">
      <!-- Logo/Brand -->
      <div class="flex justify-center mb-8" @click="navigateTo('/')">
        <img src="@/assets/img/logo.png" class="w-auto h-12 cursor-pointer" alt="logo" />
      </div>

      <div class="space-y-4 text-center">
        <h1 class="text-4xl  text-primary-dark er">Forgot password?</h1>
        <p class="text-neutral-400 font-medium">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div v-if="success" class="p-8 bg-secondary/5 border-l-4 border-secondary rounded-r-3xl space-y-4">
        <p class="text-sm  text-secondary  ">Email Sent</p>
        <p class="text-sm text-primary-dark font-medium leading-relaxed">
          Check your inbox (and spam folder) for the password reset link sent to <strong>{{ email }}</strong>.
        </p>
        <BaseButton to="/auth/login" variant="outline" block size="md" class="mt-4">
          Return to sign in
        </BaseButton>
      </div>

      <form v-else @submit.prevent="handleForgot" class="space-y-8">
        <AnimatedInput
          v-model="email"
          label="Email Address"
          type="email"
          required
          placeholder="Enter your email"
        />

        <div class="space-y-6">
          <BaseButton
            type="submit"
            variant="primary"
            block
            size="lg"
            :loading="loading"
            class="shadow-xl shadow-primary-dark/20"
          >
            Send reset link
          </BaseButton>

          <div class="pt-4 text-center">
            <NuxtLink to="/auth/login" class="text-xs  text-neutral-300 hover:text-primary  transition-colors ">Back to sign in</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const success = ref(false)
const { forgotPassword, loading } = useAuth()

const handleForgot = async () => {
  try {
    await forgotPassword({ email: email.value })
    success.value = true
  } catch (error) {
    // Error handled in useAuth
  }
}
</script>
