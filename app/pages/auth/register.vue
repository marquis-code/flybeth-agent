<template>
  <div class="min-h-screen bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 left-0 -ml-20 -mt-20 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-0 right-0 -mr-20 -mb-20 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px]"></div>
    
    <div class="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 text-center mb-10">
      <div class="flex items-center justify-center space-x-2 mb-8">
        <span class="text-4xl font-serif font-bold text-white tracking-tight">flybeth</span>
        <span class="px-2 py-0.5 bg-secondary text-[10px] font-bold text-white uppercase tracking-widest rounded">Network</span>
      </div>
      <h2 class="text-4xl font-serif font-bold text-white mb-2">Agency Registration</h2>
      <p class="text-white/50 font-medium">Join our global network of elite travel partners.</p>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
      <div v-if="success" class="brand-glass border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl">
        <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-3xl bg-secondary/20 shadow-inner mb-6">
          <CheckIcon class="h-10 w-10 text-secondary" />
        </div>
        <h3 class="text-2xl font-serif font-bold text-white mb-3">Welcome Aboard!</h3>
        <p class="text-white/60 mb-10 leading-relaxed max-w-sm mx-auto">
          Your agency application has been submitted successfully. A regional manager will review your credentials within 24 hours.
        </p>
        <BaseButton to="/auth/login" block variant="secondary" size="lg">Return to Login</BaseButton>
      </div>

      <BaseCard v-else :padding="false" class="brand-glass border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl rounded-3xl">
        <div class="p-10">
          <form class="space-y-8" @submit.prevent="handleRegister">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <BaseInput 
                v-model="form.agencyName"
                label="Legal Agency Name"
                required
                placeholder="Grand Travel Agency"
                class="dark-input"
                :icon="BuildingOfficeIcon"
              />
              <BaseInput 
                v-model="form.agencyWebsite"
                label="Agency Portal (URL)"
                placeholder="www.example.com"
                class="dark-input"
                :icon="GlobeAltIcon"
              />
            </div>

            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 border-t border-white/5 pt-8">
              <BaseInput 
                v-model="form.firstName"
                label="Lead Agent: First Name"
                required
                placeholder="John"
                class="dark-input"
                :icon="UserIcon"
              />
              <BaseInput 
                v-model="form.lastName"
                label="Lead Agent: Last Name"
                required
                placeholder="Doe"
                class="dark-input"
                :icon="UserIcon"
              />
            </div>

            <BaseInput 
              v-model="form.email"
              label="Corporate Registry Email"
              type="email"
              required
              placeholder="admin@youragency.com"
              class="dark-input"
              :icon="EnvelopeIcon"
            />

            <BaseInput 
              v-model="form.password"
              label="Secure Access Key"
              type="password"
              required
              placeholder="Minimum 12 characters"
              class="dark-input"
              :icon="LockClosedIcon"
            />

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 bg-white/5 border-white/10 text-secondary focus:ring-secondary rounded">
              </div>
              <div class="ml-3">
                <label for="terms" class="text-xs text-white/50 leading-normal">
                  By registering, you agree to our <a href="#" class="text-secondary font-bold underline underline-offset-4">Terms of Service</a> and confirm your status as a registered travel agency.
                </label>
              </div>
            </div>

            <BaseButton type="submit" block variant="secondary" size="lg" :loading="loading" class="shadow-lg shadow-secondary/20">
              Submit Agency Application
            </BaseButton>
          </form>
          
          <div class="mt-10 pt-8 border-t border-white/5 text-center">
            <p class="text-sm text-white/40">
              Already a partner? 
              <NuxtLink to="/auth/login" class="text-secondary font-bold hover:underline underline-offset-4 ml-1">
                Secure Login
              </NuxtLink>
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  CheckIcon, 
  BuildingOfficeIcon, 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const form = ref({
  agencyName: '',
  agencyWebsite: '',
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const loading = ref(false)
const success = ref(false)

const handleRegister = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1800))
  success.value = true
  loading.value = false
}
</script>

<style scoped>
.dark-input :deep(label) {
  @apply text-white/70 font-bold tracking-tight;
}
.dark-input :deep(input) {
  @apply bg-white/5 border-white/10 text-white placeholder-white/20 rounded-xl py-3;
}
.dark-input :deep(input:focus) {
  @apply border-secondary ring-secondary/20 bg-white/10;
}
</style>
