<template>
  <div class="min-h-screen bg-white font-sans text-neutral">
    <!-- Premium Navigation -->
    <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-serif font-bold text-xl">F</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-serif font-bold text-primary-dark tracking-tight leading-none">flybeth</span>
              <span class="text-[10px] text-secondary font-bold uppercase tracking-widest">Network</span>
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <NuxtLink to="/auth/login" class="text-sm font-bold text-neutral hover:text-primary transition-colors">Partner Login</NuxtLink>
            <BaseButton to="/auth/register" variant="secondary" size="sm" class="rounded-full px-6">Affiliate Registry</BaseButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Luxury Hero Section -->
    <div class="relative py-32 lg:py-48 overflow-hidden bg-primary-dark">
      <!-- Animated Background Accents -->
      <div class="absolute top-0 right-0 -mr-40 -mt-40 w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 -ml-40 -mb-40 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px]"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div class="lg:w-3/5">
          <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
            The Pinnacle of <span class="text-secondary italic">Travel Management</span>
          </h1>
          <p class="mt-8 text-xl text-white/60 max-w-2xl font-medium leading-relaxed">
            Empowering elite agents with a global distribution network, wholesale rates, and sophisticated logistics tools.
          </p>
          <div class="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <BaseButton size="lg" variant="secondary" to="/auth/register" class="rounded-full px-10 py-4 text-lg">Initialize Partnership</BaseButton>
            <BaseButton size="lg" variant="outline" class="text-white border-white/20 hover:bg-white hover:text-primary-dark rounded-full px-10 py-4 text-lg backdrop-blur-sm">Our Network</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Ribbon -->
    <div class="bg-gray-50 border-y border-gray-100 py-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in landingStats" :key="stat.label" class="text-center">
            <p class="text-3xl font-serif font-bold text-primary-dark">{{ stat.value }}</p>
            <p class="text-[10px] font-bold text-neutral/40 uppercase tracking-[0.2em] mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center mb-24">
          <h2 class="text-4xl lg:text-5xl font-serif font-bold text-primary-dark">Engineered for Excellence</h2>
          <p class="mt-4 text-lg text-neutral/50 font-medium">The most sophisticated suite of tools for the modern travel industry.</p>
        </div>

        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <BaseCard v-for="feature in features" :key="feature.name" hover class="border-none shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div class="flex flex-col items-start p-2">
              <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/5 text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                <component :is="feature.icon" class="h-8 w-8" />
              </div>
              <h3 class="text-2xl font-serif font-bold text-primary-dark">{{ feature.name }}</h3>
              <p class="mt-4 text-neutral/50 font-medium leading-relaxed">{{ feature.description }}</p>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-dark py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <h2 class="text-4xl font-serif font-bold text-white mb-8">Ready to Elevate Your Agency?</h2>
        <BaseButton to="/auth/register" variant="secondary" size="lg" class="rounded-full px-12 py-4">Get Started Immediately</BaseButton>
      </div>
    </div>

    <!-- Refined Footer -->
    <footer class="bg-white py-20 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-3 mb-8 md:mb-0">
            <span class="text-3xl font-serif font-bold text-primary-dark tracking-tight">flybeth</span>
            <span class="px-2 py-0.5 bg-secondary text-[10px] font-bold text-white uppercase tracking-widest rounded leading-none">Global</span>
          </div>
          <p class="text-neutral/40 font-medium text-sm">© 2026 Flybeth Logistics Network. All rights reserved.</p>
          <div class="flex space-x-6 mt-8 md:mt-0">
            <a href="#" class="text-neutral/40 hover:text-primary transition-colors font-medium">Terms</a>
            <a href="#" class="text-neutral/40 hover:text-primary transition-colors font-medium">Privacy</a>
            <a href="#" class="text-neutral/40 hover:text-primary transition-colors font-medium">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  GlobeAltIcon, 
  TicketIcon, 
  ChartBarIcon, 
  BriefcaseIcon, 
  ShieldCheckIcon, 
  UserGroupIcon 
} from '@heroicons/vue/24/outline'

const landingStats = [
  { value: '1M+', label: 'Global Stays' },
  { value: '450+', label: 'Airlines' },
  { value: '12K', label: 'Active Agents' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  {
    name: 'Unified Inventory',
    description: 'A singular access point for hotels, flights, and logistics at privileged wholesale rates.',
    icon: GlobeAltIcon
  },
  {
    name: 'Rapid Deployment',
    description: 'Initialize, verify, and confirm bookings in milliseconds through our optimized engine.',
    icon: TicketIcon
  },
  {
    name: 'Predictive ROI',
    description: 'Sophisticated analytical modeling to track commissions and agency performance metrics.',
    icon: ChartBarIcon
  },
  {
    name: 'Portfolio Control',
    description: 'Centralized management of high-value client accounts and complex travel itineraries.',
    icon: UserGroupIcon
  },
  {
    name: 'Military-Grade Shield',
    description: 'Financial transactions protected by the most advanced encryption layers available.',
    icon: ShieldCheckIcon
  },
  {
    name: 'Concierge Logic',
    description: 'Round-the-clock dedicated agent assistance for seamless operational continuity.',
    icon: BriefcaseIcon
  }
]
</script>
