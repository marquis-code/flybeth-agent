<template>
  <div class="bg-white">
    <!-- Features Hero -->
    <section class="py-16 lg:py-24 bg-neutral-50 border-b border-neutral-100 overflow-hidden relative">
      <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-6">
          <span class="text-xs font-bold text-primary uppercase ">Our Platform</span>
          <h1 class="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
            Smart tools for <br />
            <span class="text-primary">everyone.</span>
          </h1>
          <p class="text-base text-neutral-500 font-medium leading-relaxed max-w-xl">
            Flybeth provides a simple set of tools designed to modernize your travel agency, from searching for flights to managing your earnings.
          </p>
          <div class="flex items-center space-x-6">
             <BaseButton to="/auth/register" variant="primary" size="sm" class="px-6 py-3 font-bold">Get Started</BaseButton>
             <NuxtLink to="/help-center" class="text-sm font-bold text-neutral-400 hover:text-primary transition-colors">Help Center</NuxtLink>
          </div>
        </div>
        <div class="relative">
           <div class="bg-white rounded-[2rem] p-4 lg:p-6 border border-neutral-100 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" class="rounded-[1.5rem] w-full h-[300px] object-cover" alt="Analytics Dashboard" />
           </div>
        </div>
      </div>
    </section>

    <!-- Feature Grid -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div v-for="feature in features" :key="feature.title" class="space-y-6 group">
            <div class="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-neutral-100">
              <component :is="feature.icon" class="h-6 w-6" />
            </div>
            <h4 class="text-xl font-bold text-primary-dark ">{{ feature.title }}</h4>
            <p class="text-sm text-neutral-500 font-medium leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Section: Inventory -->
    <section class="py-16 lg:py-24 bg-neutral-50 border-y border-neutral-100">
       <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div class="flex-1 space-y-6 order-2 md:order-1">
             <h2 class="text-3xl font-bold text-neutral-900 leading-tight">Thousands of hotels. <br />Available instantly.</h2>
             <p class="text-base text-neutral-600 leading-relaxed font-medium">
                Our global network connects you to thousands of hotels worldwide. Book everything from luxury stays to budget rooms with real-time availability and instant confirmation.
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
    title: 'Worldwide Flights',
    description: 'Find and book flights from thousands of airlines in one simple search.',
    icon: GlobeAltIcon
  },
  {
    title: 'Instant Tickets',
    description: 'No waiting around. We issue your tickets instantly as soon as you confirm a booking.',
    icon: BoltIcon
  },
  {
    title: 'Business Reports',
    description: 'Keep track of your agency\'s performance with clear charts and earnings reports.',
    icon: DocumentChartBarIcon
  },
  {
    title: 'Easy Integration',
    description: 'Connect your own website directly to our prices with our simple technical tools.',
    icon: PuzzlePieceIcon
  },
  {
    title: 'Secure Platform',
    description: 'Top-tier security keeps every transaction and piece of data safe and private.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Team Management',
    description: 'Work together with your team and control who can see and do what on your account.',
    icon: UserGroupIcon
  }
]
</script>

<style scoped>
. { font-weight: 900; }
</style>
