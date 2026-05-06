<template>
  <div class="bg-white">
    <!-- About Hero -->
    <section class="pt-10 pb-24 bg-white relative overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div class="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
          Empowering the world's <br />
          <span class="text-primary">travel professionals.</span>
        </h1>
        <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Flybeth gives travel agents the same powerful tools as the world's largest online booking sites.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-24 bg-neutral-50 border-y border-neutral-100">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-neutral-900">Our mission</h2>
          <p class="text-base text-neutral-600 leading-relaxed font-medium">
            We connect local agents directly to thousands of airlines and hotels worldwide. By removing unnecessary middlemen, we help our partners get better prices and make more profit on every booking.
          </p>
          <div class="grid grid-cols-2 gap-8 pt-4">
            <div>
              <p class="text-3xl font-bold text-primary mb-1">2018</p>
              <p class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Established</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-secondary mb-1">100+</p>
              <p class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Global Partners</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl -z-10 animate-pulse"></div>
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" class="rounded-[2.5rem] shadow-2xl border border-white/50" alt="Office space" />
        </div>
      </div>
    </section>

    <!-- Why Flybeth -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 space-y-3">
          <span class="text-xs font-bold text-primary uppercase tracking-widest">Your Advantage</span>
          <h3 class="text-3xl lg:text-4xl font-bold text-neutral-900">Why partners choose us.</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="feature in whyChooseUs" :key="feature.title" class="space-y-6 group">
            <div class="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-neutral-100">
              <component :is="feature.icon" class="h-8 w-8" />
            </div>
            <h4 class="text-2xl  text-primary-dark ">{{ feature.title }}</h4>
            <p class="text-neutral-500 font-medium leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <footer class="bg-neutral-900 py-20 text-center">
      <div class="max-w-4xl mx-auto px-6 space-y-8">
        <h2 class="text-3xl lg:text-4xl font-bold text-white leading-tight">Ready to join our network?</h2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <BaseButton to="/auth/register" variant="primary" size="md" class="px-12 shadow-2xl shadow-primary/20">Get started now</BaseButton>
          <NuxtLink to="/contact" class="text-sm font-bold text-white hover:underline underline-offset-8 decoration-primary/50">Speak with us</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { GlobeAltIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const whyChooseUs = [
  {
    title: 'Instant Booking',
    description: 'No waiting around. Your bookings are confirmed instantly with thousands of airlines and hotels worldwide.',
    icon: GlobeAltIcon
  },
  {
    title: 'Better Profits',
    description: 'Get access to direct prices that others don\'t see. Boost your earnings on every ticket and room you sell.',
    icon: ChartBarIcon
  },
  {
    title: 'Secure & Reliable',
    description: 'Your transactions and data are protected by top-tier security systems, ensuring peace of mind for you and your clients.',
    icon: ShieldCheckIcon
  }
]
</script>

<style scoped>
. { font-weight: 900; }
</style>
