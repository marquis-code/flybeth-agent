<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-7xl w-full grid lg:grid-cols-2 gap-12 bg-white rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100 overflow-hidden min-h-[85vh]">
      <!-- Agency Advantage Section -->
      <div class="hidden lg:flex flex-col justify-between p-10 bg-neutral-50 relative overflow-hidden group">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div class="relative z-10 flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
           <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>

        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl  font-black text-primary-dark leading-tight tracking-tighter">
            Scale Your <br />
            Agency Without <br />
            <span class="text-secondary">Limits.</span>
          </h2>
          <p class="text-lg text-neutral-400 font-medium max-w-md border-l-2 border-secondary/20 pl-6 leading-relaxed">
            Join the Flybeth Agent Network and unlock global wholesale rates across flights and luxury stays.
          </p>
        </div>

        <div class="relative z-10 space-y-6 pt-12 border-t border-neutral-200/50">
          <div v-for="perk in perks" :key="perk.title" class="flex items-start space-x-4">
            <div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <CheckIcon class="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p class="text-xs font-black text-primary-dark tracking-widest">{{ perk.title }}</p>
              <p class="text-[11px] text-neutral-400 mt-1">{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form Section -->
      <div class="p-8 lg:p-12 flex flex-col justify-center bg-white overflow-y-auto">
        <div class="max-w-xl w-full mx-auto space-y-12">
          <div class="space-y-4">
            <h1 class="text-4xl font-black text-primary-dark tracking-tighter">Partner registration.</h1>
            <p class="text-neutral-400 font-medium">Create your Flybeth partner account below.</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-10">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-8">
                <div class="space-y-6">
                  <h4 class="text-[9px] font-black text-secondary tracking-[0.3em]">Agency details</h4>
                  <AnimatedInput v-model="form.agencyName" label="Agency Name" required />
                  <AnimatedInput v-model="form.email" label="Email Address" type="email" required />
                </div>
              </div>
              <div class="space-y-8">
                <div class="space-y-6">
                  <h4 class="text-[9px] font-black text-secondary tracking-[0.3em]">Agent profile</h4>
                  <AnimatedInput v-model="form.firstName" label="First Name" required />
                  <AnimatedInput v-model="form.lastName" label="Last Name" required />
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h4 class="text-[9px] font-black text-secondary tracking-[0.3em]">Account setup</h4>
              <div class="grid md:grid-cols-2 gap-8">
                <AnimatedInput v-model="form.password" label="Password" type="password" required />
                <SelectInput v-model="form.agencyType" label="Agency type" :options="agencyTypes" />
              </div>
            </div>

            <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start space-x-4 group cursor-pointer">
              <div class="relative flex items-center pt-1">
                <input id="terms" type="checkbox" required class="peer appearance-none w-5 h-5 border-2 border-neutral-200 rounded-lg checked:bg-secondary checked:border-secondary transition-all cursor-pointer">
                <CheckIcon class="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <label for="terms" class="text-[11px] text-neutral-400 font-medium leading-relaxed group-hover:text-primary-dark transition-colors">
                I agree to Flybeth's Professional Code of Conduct and Global Logistics Deployment Protocol.
              </label>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-8 pt-4">
              <BaseButton type="submit" variant="primary" size="lg" :loading="loading" class="px-12 w-full md:w-auto">
                Create account
              </BaseButton>
              <NuxtLink to="/auth/login" class="text-sm font-black tracking-[0.2em] text-neutral-300 hover:text-secondary transition-colors">Already registered?</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import SelectInput from '~/components/ui/SelectInput.vue'
import AnimatedInput from '~/components/ui/AnimatedInput.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'

const { register, loading } = useAuth()
const form = ref({
  agencyName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agencyType: ''
})

const perks = [
  { title: 'Global Flight Rates', desc: 'Secure net rates not available to the general public.' },
  { title: 'Analytics Dashboard', desc: 'Real-time booking management and automated reporting.' },
  { title: 'Priority Support', desc: 'Dedicated regional node manager for your account.' }
]

const agencyTypes = [
  'Independent OTA',
  'Travel Management Co.',
  'Corporate Travel Hub',
  'Boutique Agency',
  'Logistics Distributor'
]

const handleRegister = async () => {
  try {
    await register({
      ...form.value,
      role: 'agent'
    })
    localStorage.setItem('verify_email', form.value.email)
    navigateTo({
      path: '/auth/verify',
      query: { email: form.value.email }
    })
  } catch (error) {
    console.error('Registration failed')
  }
}
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
