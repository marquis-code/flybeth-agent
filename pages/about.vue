<template>
  <div class="bg-white">
    <!-- About Hero -->
    <section class="pt-48 pb-24 bg-white relative overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div class="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-6xl lg:text-7xl  text-primary-dark er leading-tight">
          Empowering the world's <br />
          <span class="text-secondary ">elite travel advisors.</span>
        </h1>
        <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-3xl mx-auto">
          Flybeth was founded on a simple premise: that travel agents deserve the same cutting-edge infrastructure as the world's largest online booking engines.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-24 bg-neutral-50 border-y border-neutral-100">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div class="space-y-8">
          <h2 class="text-4xl  text-primary-dark ">Our mission</h2>
          <p class="text-lg text-neutral-600 leading-relaxed font-medium">
            We provide a high-performance B2B travel framework that connects regional agents directly to global GDS and NDC pools. By bypassing traditional retail layers, we enable our partners to secure market-leading wholesale rates and maximize their operational profitability.
          </p>
          <div class="grid grid-cols-2 gap-8 pt-4">
            <div>
              <p class="text-3xl  text-primary mb-1">2018</p>
              <p class="text-sm font-bold text-neutral-400  ">Established</p>
            </div>
            <div>
              <p class="text-3xl  text-secondary mb-1">45+</p>
              <p class="text-sm font-bold text-neutral-400  ">Global nodes</p>
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
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-sm  text-secondary ">The Flybeth edge</h2>
          <h3 class="text-5xl  text-primary-dark er">Why partners choose us.</h3>
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
    <footer class="bg-primary-dark py-24 text-center">
      <div class="max-w-4xl mx-auto px-6 space-y-10">
        <h2 class="text-5xl  text-white er">Ready to join the network?</h2>
        <div class="flex items-center justify-center space-x-6">
          <BaseButton to="/auth/register" variant="primary" size="lg" class="px-12 shadow-2xl shadow-primary/20">Get started now</BaseButton>
          <NuxtLink to="/contact" class="text-sm font-bold text-white hover:text-secondary transition-colors underline underline-offset-8 decoration-white/30">Speak to an advisor</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { GlobeAltIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const whyChooseUs = [
  {
    title: 'Direct API fulfillment',
    description: 'We eliminate the middleman. Your bookings are issued directly through our Amadeus and Sabre clusters, ensuring instant ticketing and valid PNRs.',
    icon: GlobeAltIcon
  },
  {
    title: 'Market-leading margins',
    description: 'Bypass retail markups completely. Our partners access the same wholesale rates used by global OTA giants, allowing for significantly higher profitability.',
    icon: ChartBarIcon
  },
  {
    title: 'Bank-grade security',
    description: 'Our platform is built on enterprise-grade infrastructure, with every transaction validated through multi-tiered encryption and fraud detection nodes.',
    icon: ShieldCheckIcon
  }
]
</script>

<style scoped>
. { font-weight: 900; }
</style>
