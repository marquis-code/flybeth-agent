<template>
  <div class="min-h-screen bg-white flex flex-col sm:items-center sm:justify-center p-0 sm:p-6 lg:p-10 font-sans">
    <div class="max-w-7xl w-full flex-1 grid lg:grid-cols-2 sm:gap-12 items-center bg-white rounded-none sm:rounded-[3rem] sm:border border-neutral-100 sm:shadow-2xl shadow-neutral-100 overflow-hidden min-h-screen sm:min-h-[85vh]">
      <!-- Brand & Visual Section -->
      <div class="hidden lg:flex flex-col justify-between p-10 bg-neutral-50 relative overflow-hidden group h-full">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div class="relative z-10 flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>

        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl font-black text-primary-dark leading-tight">
            Manage your <br />
            travel empire <br />
            with <span class="text-secondary">precision.</span>
          </h2>
          <p class="text-lg text-neutral-400 font-medium max-w-sm border-l-2 border-secondary/20 pl-6 leading-relaxed">
            Access global wholesale inventory and intelligent analytics through the Flybeth Agent Network.
          </p>
        </div>

        <div class="relative z-10 pt-12 border-t border-neutral-200/50">
          <div class="flex flex-wrap items-center gap-6 opacity-40 grayscale group-hover:opacity-100 transition-all duration-1000">
             <span class="text-xl font-black">Trusted</span>
             <span class="text-xl font-black">Reliable</span>
             <span class="text-xl font-black">v1.0</span>
          </div>
        </div>
      </div>

      <!-- Login Form Section -->
      <div class="px-6 py-10 sm:p-8 lg:p-12 flex flex-col justify-center bg-white w-full">
        <div class="max-w-md w-full mx-auto space-y-10 sm:space-y-12">
          <div class="space-y-4">
            <h1 class="text-4xl  text-primary-dark er">Welcome back.</h1>
            <p class="text-neutral-400 font-medium">Enter your email and password to sign in.</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-8">
            <div class="space-y-6">
              <AnimatedInput
                v-model="form.email"
                label="Email Address"
                type="email"
                required
                :error="errors.email"
              />
              <div class="space-y-2">
                <AnimatedInput
                  v-model="form.password"
                  label="Password"
                  type="password"
                  required
                  :error="errors.password"
                />
                <div class="flex justify-end">
                  <NuxtLink to="/auth/forgot-password" class="text-sm  text-neutral-300 hover:text-secondary  transition-colors">Forgot password?</NuxtLink>
                </div>
              </div>
            </div>

            <div class="space-y-6 pt-4">
              <BaseButton
                type="submit"
                variant="primary"
                block
                size="lg"
                :loading="loading"
                class="shadow-xl shadow-primary-dark/20"
              >
                Sign in
              </BaseButton>

              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-neutral-100"></div>
                </div>
                <div class="relative flex justify-center text-sm  ">
                  <span class="px-4 bg-white text-neutral-200">New agency?</span>
                </div>
              </div>

              <BaseButton
                to="/auth/register"
                variant="outline"
                block
                size="lg"
              >
                Join Flybeth
              </BaseButton>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import AnimatedInput from '~/components/ui/AnimatedInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

definePageMeta({
  layout: 'auth'
})

const { login, loading } = useAuth()
const form = reactive({
  email: 'abahkauzy3@gmail.com',
  password: 'Miles1999@'
})

const errors = reactive({
  email: '',
  password: ''
})

// Agressively clear ANY old cookies on mount of the login page
// to ensure a clean slate for the localStorage system.
onMounted(() => {
  if (import.meta.client) {
    const cookieNames = ['accessToken', 'refreshToken', 'user_profile'];
    cookieNames.forEach(name => {
      document.cookie = `${name}=; path=/; max-age=0`;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  }
})

const handleLogin = async () => {
  try {
    const res = await login(form);
    // login composable already handles localStorage persistence
    if (!res.requiresOtp && (res.tokens || res.accessToken)) {
       // Using window.location.replace for a hard redirect to ensure
       // middleware picks up the new localStorage state.
       window.location.replace('/dashboard')
    } else {
      localStorage.setItem('verify_email', form.email)
      navigateTo({
        path: '/auth/verify',
        query: { email: form.email }
      })
    }
  } catch (error) {
    console.error('Login failed')
  }
}
</script>
