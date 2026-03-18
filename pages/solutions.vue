<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Basic Nav -->
    <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10 font-sans">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/auth/login" class="text-sm font-bold text-neutral-400 hover:text-primary transition-colors">Sign in</NuxtLink>
      </div>
    </nav>

    <!-- Solutions Hero -->
    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
          Solutions for every <br />
          <span class="text-primary italic">travel business.</span>
        </h1>
        <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          From independent home-based advisors to global travel consolidators, Flybeth provides the flexible infrastructure you need to thrive.
        </p>
      </div>
    </section>

    <!-- Solutions Categories -->
    <section class="pb-32 px-6">
      <div class="max-w-7xl mx-auto space-y-12">
        <div v-for="(solution, idx) in solutions" :key="solution.title" 
             class="group bg-neutral-50 rounded-[3rem] p-10 lg:p-16 border border-neutral-100 flex flex-col lg:flex-row gap-16 items-center hover:bg-white hover:shadow-2xl transition-all duration-700">
          
          <div class="flex-1 space-y-6" :class="{ 'lg:order-2': idx % 2 !== 0 }">
             <div class="inline-flex py-1 px-4 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase rounded-full border border-primary/20">
                {{ solution.tag }}
             </div>
             <h2 class="text-4xl font-black text-primary-dark tracking-tight">{{ solution.title }}</h2>
             <p class="text-lg text-neutral-500 leading-relaxed font-medium">{{ solution.description }}</p>
             <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li v-for="item in solution.bullets" :key="item" class="flex items-center space-x-3 text-sm font-bold text-primary-dark/70">
                   <CheckIcon class="h-5 w-5 text-secondary" />
                   <span>{{ item }}</span>
                </li>
             </ul>
             <div class="pt-6">
                <BaseButton to="/auth/register" variant="primary" class="px-8 shadow-lg shadow-primary/20">Learn more</BaseButton>
             </div>
          </div>

          <div class="flex-1 relative" :class="{ 'lg:order-1': idx % 2 !== 0 }">
             <div class="absolute inset-0 bg-secondary/5 rounded-[2.5rem] blur-3xl -z-10 group-hover:bg-secondary/10 transition-colors"></div>
             <img :src="solution.image" class="rounded-[2.5rem] shadow-xl w-full h-[400px] object-cover border border-neutral-100 group-hover:scale-[1.02] transition-transform duration-700" :alt="solution.title" />
          </div>
        </div>
      </div>
    </section>

    <!-- Global Infrastructure Quote -->
    <section class="py-24 bg-primary-dark text-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
           <QuoteIcon class="h-16 w-16 text-secondary/30 mx-auto" />
           <p class="text-3xl lg:text-4xl font-black tracking-tight leading-relaxed italic">
              "We've doubled our booking volume without adding a single administrative staff member. Flybeth's automation is unrivaled."
           </p>
           <div>
              <p class="text-xl font-bold">Musa Haruna</p>
              <p class="text-sm font-black text-secondary tracking-widest uppercase">CEO, Prestige Travel Group</p>
           </div>
        </div>
    </section>

    <footer class="py-12 bg-white text-center text-sm font-medium text-neutral-400">
        © 2026 Flybeth Solutions. Powering travel excellence.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'
// I'll use simple text for Quote icon or a common icon
import { ChatBubbleBottomCenterIcon as QuoteIcon } from '@heroicons/vue/24/outline'

const solutions = [
  {
     tag: 'Independent agents',
     title: 'Scale from anywhere.',
     description: "Our standalone portal gives you the same power as a massive boutique agency. Manage world-class itineraries from your laptop with instant ticketing and real-time support.",
     bullets: ['No minimum monthly targets', 'Mobile-responsive interface', 'Commission settlements', '24/7 partner support'],
     image: 'https://images.unsplash.com/photo-1484433349073-81e182ece89e?auto=format&fit=crop&q=80&w=1200'
  },
  {
     tag: 'Franchise networks',
     title: 'Command your fleet.',
     description: "Consolidate multiple sub-accounts under one master dashboard. Monitor revenue, control markups, and centralize your operations across your entire agent network.",
     bullets: ['Sub-account management', 'Hierarchical reporting', 'Custom pricing rules', 'Priority API node access'],
     image: 'https://images.unsplash.com/photo-1454165833221-d726baf27855?auto=format&fit=crop&q=80&w=1200'
  }
]
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
