<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden pb-32">
    <!-- Hero -->
    <section class="pt-10 pb-16 bg-white relative">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
        <span class="text-xs font-bold text-primary uppercase tracking-widest">Careers</span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
          Join the <span class="text-primary">journey.</span>
        </h1>
        <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          At Flybeth, we're building the future of travel technology. We're a small but mighty team with big ambitions.
        </p>
      </div>
    </section>

    <!-- Empty State -->
    <section class="py-24">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <div class="bg-neutral-50 rounded-3xl p-16 border border-neutral-100 space-y-8">
          
          <!-- Icon -->
          <div class="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto">
            <BriefcaseIcon class="h-12 w-12 text-primary" />
          </div>

          <h2 class="text-2xl font-bold text-neutral-900">No open positions right now</h2>
          
          <p class="text-neutral-500 font-medium leading-relaxed max-w-md mx-auto">
            We're not actively hiring at the moment, but we're always interested in hearing from talented people. Drop us a line and we'll keep your details on file for future opportunities.
          </p>

          <div class="border-t border-neutral-100 pt-8 mt-8 space-y-4">
            <p class="text-sm font-bold text-neutral-400 uppercase tracking-widest">Stay Connected</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:careers@flybeth.com" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                <EnvelopeIcon class="h-4 w-4" />
                Send Your CV
              </a>
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-600 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all">
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Flybeth -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="bg-neutral-900 rounded-3xl p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
           <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
           <div class="lg:w-1/2 relative z-10 space-y-6">
              <h2 class="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Why people love <br />working at <span class="text-primary">Flybeth.</span>
              </h2>
              <ul class="space-y-4">
                <li v-for="perk in perks" :key="perk" class="flex items-center gap-3 text-white/70 font-medium">
                  <CheckCircleIcon class="h-5 w-5 text-primary flex-shrink-0" />
                  {{ perk }}
                </li>
              </ul>
           </div>
           <div class="lg:w-1/2 relative z-10">
              <div class="rounded-2xl overflow-hidden shadow-2xl h-[350px]">
                <img src="/images/redesign/careers_team.png" alt="Flybeth Team" class="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BriefcaseIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const perks = [
  'Remote-first culture — work from anywhere in the world',
  'Direct impact on a product used by 65,000+ agents globally',
  'Competitive compensation with equity opportunities',
  'Unlimited learning budget for conferences and courses',
  'Annual team retreats in incredible destinations',
  'Health insurance and wellness benefits'
]
</script>
