<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Solutions Hero -->
    <section class="pt-10 pb-20 bg-white relative">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
        <span class="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-2">What We Offer</span>
        <h1 class="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
          Solutions for every <br />
          <span class="text-primary">travel business.</span>
        </h1>
        <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          From independent home-based advisors to global travel consolidators, Flybeth provides the flexible infrastructure you need to thrive.
        </p>
      </div>
    </section>

    <!-- Solutions Cards -->
    <section class="pb-32 px-6">
      <div class="max-w-7xl mx-auto space-y-16">
        <div v-for="(solution, idx) in solutions" :key="solution.title" 
             class="group bg-neutral-50 rounded-3xl p-10 lg:p-16 border border-neutral-100 flex flex-col lg:flex-row gap-16 items-center hover:bg-white hover:shadow-2xl transition-all duration-700">
          
          <div class="flex-1 space-y-6" :class="{ 'lg:order-2': idx % 2 !== 0 }">
             <div class="inline-flex py-1.5 px-4 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                {{ solution.tag }}
             </div>
             <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900">{{ solution.title }}</h2>
             <p class="text-base text-neutral-500 leading-relaxed font-medium">{{ solution.description }}</p>
             <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li v-for="item in solution.bullets" :key="item" class="flex items-center space-x-3 text-sm font-medium text-neutral-600">
                   <CheckIcon class="h-5 w-5 text-primary flex-shrink-0" />
                   <span>{{ item }}</span>
                </li>
             </ul>
             <div class="pt-4">
                <BaseButton to="/auth/register" variant="primary" class="px-8 font-bold text-sm shadow-lg shadow-primary/20">Get Started Free</BaseButton>
             </div>
          </div>

          <div class="flex-1 relative" :class="{ 'lg:order-1': idx % 2 !== 0 }">
             <img :src="solution.image" class="rounded-3xl shadow-xl w-full h-[380px] object-cover border border-neutral-100 group-hover:scale-[1.02] transition-transform duration-700" :alt="solution.title" />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section class="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
           <ChatBubbleBottomCenterIcon class="h-12 w-12 text-primary/40 mx-auto" />
           <p class="text-2xl lg:text-3xl font-medium leading-relaxed ">
              "We've doubled our booking volume without adding a single administrative staff member. Flybeth's automation is unrivaled."
           </p>
           <div>
              <p class="text-lg font-bold">Musa Haruna</p>
              <p class="text-sm text-primary font-medium">CEO, Prestige Travel Group</p>
           </div>
        </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-24 text-center bg-white">
      <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-neutral-900">Ready to simplify your travel business?</h2>
      <p class="text-neutral-500 font-medium text-lg mb-10 max-w-lg mx-auto">Start free today. No credit card required.</p>
      <BaseButton to="/auth/register" size="md" variant="primary" class="px-12 py-4 font-bold text-sm">Create Your Account</BaseButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline'

const solutions = [
  {
     tag: 'Independent Agents',
     title: 'Grow your business from anywhere.',
     description: "Our platform gives you the same power as a major travel agency. Create world-class trips from your laptop with instant booking and live support.",
     bullets: ['No monthly fees or targets', 'Work on any device', 'Get paid your earnings instantly', '24/7 priority support'],
     image: '/images/redesign/agent_consultation.png'
  },
  {
     tag: 'Team Leaders',
     title: 'Manage your whole team in one place.',
     description: "Bring all your agents under one main account. Track your team's sales, set your own prices, and keep your business organized.",
     bullets: ['Manage sub-accounts', 'Team performance reports', 'Set your own markups', 'Priority access'],
     image: '/images/redesign/hero_team_collab.png'
  },
  {
     tag: 'Large Businesses',
     title: 'Build your own travel brand.',
     description: "Connect our booking system directly into your own website. Launch a fully branded travel site in weeks using our expert tools.",
     bullets: ['Connect your own tools', 'Fully branded booking', 'Your own business name', 'Personal account manager'],
     image: '/images/redesign/interaction.png'
  }
]
</script>
