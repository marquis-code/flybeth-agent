<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100 overflow-hidden min-h-[85vh]">
      <!-- Brand & Visual Section -->
      <div class="hidden lg:flex flex-col justify-between p-10 bg-neutral-50 relative overflow-hidden group">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div class="relative z-10 flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>

        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl  font-black text-primary-dark leading-tight tracking-tighter">
            Manage your <br />
            travel empire <br />
            with <span class="text-secondary">precision.</span>
          </h2>
          <p class="text-lg text-neutral-400 font-medium max-w-sm border-l-2 border-secondary/20 pl-6 leading-relaxed">
            Access global wholesale inventory and intelligent analytics through the Flybeth Agent Network.
          </p>
        </div>

        <div class="relative z-10 pt-12 border-t border-neutral-200/50">
          <div class="flex items-center space-x-12 opacity-40 grayscale group-hover:opacity-100 transition-all duration-1000">
             <span class="text-xl font-black tracking-tighter">Trusted</span>
             <span class="text-xl font-black tracking-tighter">Reliable</span>
             <span class="text-xl font-black tracking-tighter">v1.0</span>
          </div>
        </div>
      </div>

      <!-- Login Form Section -->
      <div class="p-8 lg:p-12 flex flex-col justify-center bg-white">
        <div class="max-w-md w-full mx-auto space-y-12">
          <div class="space-y-4">
            <h1 class="text-4xl font-black text-primary-dark tracking-tighter">Welcome back.</h1>
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
                  <NuxtLink to="/auth/forgot-password" class="text-sm font-black text-neutral-300 hover:text-secondary tracking-[0.2em] transition-colors">Forgot password?</NuxtLink>
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
                <div class="relative flex justify-center text-sm font-black tracking-[0.3em]">
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
import { ref, reactive } from 'vue'
import AnimatedInput from '~/components/ui/AnimatedInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

definePageMeta({
  layout: 'auth'
})

const { login, loading } = useAuth()
const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const res = await login(form);
    localStorage.setItem('verify_email', form.email)
    navigateTo({
      path: '/auth/verify',
      query: { email: form.email }
    })
  } catch (error) {
    console.error('Login failed')
  }
}
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
