<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Hero -->
    <section class=" pb-16 bg-white relative">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="max-w-4xl mx-auto px-6 relative z-10">
        <div class="max-w-3xl space-y-6">
          <span class="text-xs font-bold text-primary uppercase ">Our People</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            Meet the team behind <br />
            <span class="text-primary">Flybeth.</span>
          </h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
            We're a passionate team of travel veterans and technology innovators dedicated to making the travel business better for everyone.
          </p>
        </div>
      </div>
    </section>

    <!-- Team Grid -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        
        <!-- CEO Feature Card -->
        <div class="mb-20 bg-neutral-50 rounded-3xl p-10 lg:p-16 border border-neutral-100 flex flex-col lg:flex-row gap-16 items-center">
          <div class="lg:w-2/5">
            <div class="aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
              <img :src="ceo.image" :alt="ceo.name" class="h-full w-full object-cover" />
            </div>
          </div>
          <div class="lg:w-3/5 space-y-6">
            <span class="text-xs font-bold text-primary uppercase ">Founder & CEO</span>
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900">{{ ceo.name }}</h2>
            <p class="text-base text-neutral-500 font-medium leading-relaxed">
              {{ ceo.bio }}
            </p>
            <div class="flex items-center gap-4 pt-2">
              <a href="https://linkedin.com" target="_blank" class="text-sm font-bold text-primary hover:underline">LinkedIn →</a>
            </div>
          </div>
        </div>

        <!-- Growing Team Section -->
        <div class="text-center max-w-2xl mx-auto space-y-6 py-16">
          <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon class="h-10 w-10 text-primary" />
          </div>
          <h3 class="text-3xl font-bold text-neutral-900">We're just getting started.</h3>
          <p class="text-neutral-500 font-medium leading-relaxed text-lg">
            Flybeth is growing fast, and our team is expanding. We're looking for passionate people who want to reshape the travel industry. Interested in joining us?
          </p>
          <BaseButton to="/careers" size="md" variant="primary" class="px-10 py-3 font-bold text-sm shadow-lg shadow-primary/20">View Open Positions</BaseButton>
        </div>
      </div>
    </section>

    <!-- Join CTA -->
    <section class="pb-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="bg-neutral-900 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
           <div class="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 class="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Want to join our <span class="text-primary">team?</span>
              </h2>
              <p class="text-white/60 text-base font-medium leading-relaxed">
                We're always looking for talented people who are passionate about travel and technology.
              </p>
              <div class="pt-4">
                <BaseButton to="/careers" size="md" variant="primary" class="px-10 py-3 shadow-xl shadow-primary/10 font-bold text-sm">
                  View Careers
                </BaseButton>
              </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { UserGroupIcon } from '@heroicons/vue/24/outline'

const ceo = {
  name: 'Oluremi Oshinkoya',
  image: '/images/redesign/ceo.png',
  bio: 'Oluremi is the visionary founder of Flybeth, bringing over a decade of experience in travel technology and business operations. Her mission is to democratize access to institutional travel infrastructure, empowering independent agents and small agencies to compete with the world\'s largest travel companies. Under her leadership, Flybeth has grown to serve 65,000+ agents across 180+ countries.'
}
</script>
