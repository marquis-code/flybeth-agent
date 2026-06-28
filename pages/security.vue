<template>
  <div class="bg-white">
    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
        <div class="space-y-6">
        <div class="space-y-6">
          <span class="text-xs font-bold text-primary uppercase ">Enterprise Protection</span>
          <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Our commitment to <br />
            <span class="text-primary">your security.</span>
          </h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
            Flybeth is built with your safety in mind. We use multiple layers of protection to keep your agency data and your travelers' information safe.
          </p>
        </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div v-for="item in securityFeatures" :key="item.title" class="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 space-y-4">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
              <component :is="item.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-xl  text-primary-dark">{{ item.title }}</h3>
            <p class="text-neutral-500 text-sm font-medium leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <div class="bg-neutral-900 rounded-3xl p-10 lg:p-14 text-white space-y-8 relative overflow-hidden">
           <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h3 class="text-3xl font-bold">Bank-grade protection</h3>
           <p class="text-white/70 text-lg font-medium leading-relaxed">
             Every request and piece of data is protected by the same encryption used by major banks. Our systems are monitored 24/7 to ensure everything runs smoothly and safely.
           </p>
           <div class="flex items-center space-x-6">
              <div class="flex flex-col">
                 <span class="text-2xl ">99.99%</span>
                 <span class="text-sm  text-secondary  ">Uptime SLA</span>
              </div>
              <div class="w-px h-10 bg-white/20"></div>
              <div class="flex flex-col">
                 <span class="text-2xl ">ISO 27001</span>
                 <span class="text-sm  text-secondary  ">Compliance</span>
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
    title: 'Two-Layer Login',
    description: 'Every account is protected by two-factor authentication to ensure only you can access your dashboard.',
    icon: LockClosedIcon
  },
  {
    title: 'Smart Fraud Filter',
    description: 'Our system constantly monitors bookings to catch and stop any suspicious or fraudulent activity immediately.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Data Privacy',
    description: 'You have full control over your data. We follow strict international rules to ensure your information stays private.',
    icon: KeyIcon
  },
  {
    title: 'Secure Connections',
    description: 'All communication between your computer and our systems is encrypted, keeping your information private.',
    icon: SignalIcon
  }
]
</script>

<style scoped>
. { font-weight: 900; }
</style>
