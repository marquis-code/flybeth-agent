<template>
  <div class="bg-white">
    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
        <div class="space-y-6">
          <h2 class="text-xs font-black text-secondary tracking-[0.4em] uppercase">Enterprise security</h2>
          <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
            The Flybeth <br />
            <span class="text-primary italic">security matrix.</span>
          </h1>
          <p class="text-xl text-neutral-500 font-medium leading-relaxed">
            Our platform is engineered for the highest level of institutional trust. We employ a multi-layered security architecture to protect agency data and traveler privacy.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div v-for="item in securityFeatures" :key="item.title" class="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 space-y-4">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <component :is="item.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-black text-primary-dark">{{ item.title }}</h3>
            <p class="text-neutral-500 text-sm font-medium leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <div class="bg-primary-dark rounded-[3rem] p-10 lg:p-14 text-white space-y-8 relative overflow-hidden">
           <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h3 class="text-3xl font-black">Bank-grade encryption</h3>
           <p class="text-white/70 text-lg font-medium leading-relaxed">
             Every API request and database entry is protected by 256-bit AES encryption. Our nodes are hosted in Tier-IV data centers with 24/7 physical and digital monitoring.
           </p>
           <div class="flex items-center space-x-6">
              <div class="flex flex-col">
                 <span class="text-2xl font-black">99.99%</span>
                 <span class="text-xs font-black text-secondary uppercase tracking-widest">Uptime SLA</span>
              </div>
              <div class="w-px h-10 bg-white/20"></div>
              <div class="flex flex-col">
                 <span class="text-2xl font-black">ISO 27001</span>
                 <span class="text-xs font-black text-secondary uppercase tracking-widest">Compliance</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  KeyIcon, 
  SignalIcon 
} from '@heroicons/vue/24/outline'

const securityFeatures = [
  {
    title: 'Multi-factor node access',
    description: 'Every agent login is validated through biometric or hardware-token multi-factor authentication.',
    icon: LockClosedIcon
  },
  {
    title: 'Fraud detection matrix',
    description: 'Real-time AI monitoring of booking patterns to identify and neutralize fraudulent transactions.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Data sovereignty',
    description: 'Complete control over your agency data with regional hosting options and strict data residency compliance.',
    icon: KeyIcon
  },
  {
    title: 'Encrypted GDS streams',
    description: 'Direct, isolated TLS-encrypted tunnels for all communication with Amadeus and Sabre clusters.',
    icon: SignalIcon
  }
]
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
