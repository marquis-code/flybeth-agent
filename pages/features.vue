<template>
  <div class="bg-white">
    <!-- Features Hero -->
    <section class="py-24 lg:py-32 bg-neutral-50 border-b border-neutral-100 overflow-hidden relative">
      <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <h1 class="text-6xl  text-primary-dark er leading-tight">
            Intelligent <br />
            <span class="text-primary ">infrastructure.</span>
          </h1>
          <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-xl">
             Flybeth provides a robust suite of B2B tools designed to modernize every aspect of your travel agency's workflow, from inventory sourcing to revenue management.
          </p>
          <div class="flex items-center space-x-6">
             <BaseButton to="/auth/register" variant="primary" size="lg" class="px-10">Get started</BaseButton>
             <NuxtLink to="/help-center" class="text-sm  text-secondary  hover:text-primary transition-colors ">View documentation</NuxtLink>
          </div>
        </div>
        <div class="relative">
           <div class="bg-white rounded-[2.5rem] p-4 lg:p-6 border border-neutral-100 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" class="rounded-[1.5rem] lg:rounded-[2rem] w-full h-[400px] object-cover" alt="Analytics Dashboard" />
           </div>
        </div>
      </div>
    </section>

    <!-- Feature Grid -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div v-for="feature in features" :key="feature.title" class="space-y-6 group">
            <div class="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-neutral-100">
              <component :is="feature.icon" class="h-8 w-8" />
            </div>
            <h4 class="text-2xl  text-primary-dark ">{{ feature.title }}</h4>
            <p class="text-neutral-500 font-medium leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Section: Inventory -->
    <section class="py-24 bg-neutral-50 border-y border-neutral-100">
       <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
          <div class="flex-1 space-y-8 order-2 md:order-1">
             <h2 class="text-4xl  text-primary-dark  leading-tight">Millions of properties. <br />At your fingertips.</h2>
             <p class="text-lg text-neutral-600 leading-relaxed font-medium">
                Our global property node aggregates feeds from HotelBeds, Expedia TAAP, and direct-contracted hotel chains. Manage thousands of room nights across every continent with real-time availability and instant confirmation.
             </p>
             <ul class="space-y-4">
                <li class="flex items-center space-x-3 text-neutral-500 font-bold">
                   <div class="w-2 h-2 bg-secondary rounded-full"></div>
                   <span>Direct wholesale pricing</span>
                </li>
                <li class="flex items-center space-x-3 text-neutral-500 font-bold">
                   <div class="w-2 h-2 bg-secondary rounded-full"></div>
                   <span>Last-minute availability</span>
                </li>
             </ul>
          </div>
          <div class="flex-1 order-1 md:order-2">
             <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" class="rounded-[3rem] shadow-2xl border-8 border-white" alt="Luxury hotel" />
          </div>
       </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  GlobeAltIcon, 
  PuzzlePieceIcon, 
  BoltIcon, 
  DocumentChartBarIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    title: 'Global GDS pool',
    description: 'Instant access to Amadeus, Sabre, and Travelport inventory in a single unified search interface.',
    icon: GlobeAltIcon
  },
  {
    title: 'Smart ticketing',
    description: 'Our automated fulfillment engine routes every booking through the fastest available node for instant ticket issuance.',
    icon: BoltIcon
  },
  {
    title: 'Revenue analytics',
    description: 'Deep-dive into your agency productivity with real-time charts and revenue reporting.',
    icon: DocumentChartBarIcon
  },
  {
    title: 'API integration',
    description: 'Connect your existing B2C storefront directly to our wholesale inventory through our robust JSON API.',
    icon: PuzzlePieceIcon
  },
  {
    title: 'Trust matrix',
    description: 'Bank-grade security protocols ensuring every transaction is verified and encrypted end-to-end.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Agent collaboration',
    description: 'Manage a large team of advisors with granular permission controls and shared client databases.',
    icon: UserGroupIcon
  }
]
</script>

<style scoped>
. { font-weight: 900; }
</style>
