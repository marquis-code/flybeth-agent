<template>
  <div class="min-h-screen bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex flex-col items-center">
        <div class="flex items-center space-x-2">
          <span class="text-4xl font-serif font-bold text-white tracking-tight">flybeth</span>
          <span class="px-2 py-0.5 bg-secondary text-[10px] font-bold text-white uppercase tracking-widest rounded">Agents</span>
        </div>
        <h2 class="mt-8 text-3xl font-serif font-bold text-white text-center">
          Agent Registry Access
        </h2>
        <p class="mt-2 text-center text-sm text-white/50 font-medium">
          Enter your credentials to manage your portfolio.
        </p>
      </div>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <BaseCard :padding="false" class="brand-glass border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div class="p-10">
          <form class="space-y-8" @submit.prevent="handleLogin">
            <BaseInput 
              v-model="form.email"
              label="Agent Email"
              type="email"
              autocomplete="email"
              required
              placeholder="agent@flybeth.com"
              class="dark-input"
              :icon="EnvelopeIcon"
            />

            <div class="space-y-2">
              <BaseInput 
                v-model="form.password"
                label="Security Key"
                type="password"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="dark-input"
                :icon="LockClosedIcon"
              />
              <div class="flex items-center justify-end">
                <a href="#" class="text-xs font-bold text-secondary hover:text-white transition-colors">
                  Lost Key?
                </a>
              </div>
            </div>

            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 bg-white/5 border-white/10 text-secondary focus:ring-secondary rounded transition-colors">
              <label for="remember-me" class="ml-2 block text-sm text-white/60 font-medium">
                Keep me logged in
              </label>
            </div>

            <BaseButton type="submit" block variant="secondary" size="lg" :loading="loading" class="shadow-lg shadow-secondary/20">
              Access Dashboard
            </BaseButton>
          </form>

          <div class="mt-10 pt-8 border-t border-white/5 text-center">
            <p class="text-sm text-white/40 font-medium">
              New to the platform?
              <NuxtLink to="/auth/register" class="text-secondary font-bold hover:underline underline-offset-4 ml-1">
                Apply for Agent Account
              </NuxtLink>
            </p>
          </div>
        </div>
      </BaseCard>
      
      <p class="mt-8 text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
        © 2026 Flybeth Global Logistics • Secure Layer
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  navigateTo('/dashboard')
}
</script>

<style scoped>
.dark-input :deep(label) {
  @apply text-white/70;
}
.dark-input :deep(input) {
  @apply bg-white/5 border-white/10 text-white placeholder-white/20;
}
.dark-input :deep(input:focus) {
  @apply border-secondary ring-secondary/20 bg-white/10;
}
</style>
