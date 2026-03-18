<template>
  <div class="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 overflow-x-hidden">
    <!-- Static Header -->
    <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/auth/register" class="text-sm font-black text-primary hover:text-primary-dark transition-colors tracking-widest">Start free trial</NuxtLink>
      </div>
    </nav>

    <!-- Pricing Hero -->
    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 class="text-sm font-black text-secondary tracking-[0.4em] uppercase">Pricing modules</h2>
        <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
          Simple, wholesale <br />
          <span class="text-primary italic">transparency.</span>
        </h1>
        <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Flybeth was built to put profits back in the hands of agents. No hidden fees, no complicated tiers—just direct access to wholesale inventory.
        </p>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pb-32 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Agent Partner (Free) -->
        <div class="bg-white border-2 border-neutral-100 rounded-[3rem] p-10 lg:p-16 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div class="space-y-8 relative z-10">
            <div class="space-y-2">
              <h3 class="text-3xl font-black text-primary-dark">Agent partner</h3>
              <p class="text-neutral-500 font-medium">For independent advisors and small agencies.</p>
            </div>
            
            <div class="flex items-baseline space-x-2">
              <span class="text-6xl font-black text-primary-dark">$0</span>
              <span class="text-neutral-400 font-bold uppercase tracking-widest text-sm">per month</span>
            </div>

            <ul class="space-y-4">
              <li v-for="feature in agentFeatures" :key="feature" class="flex items-center space-x-3 text-neutral-600 font-medium">
                <CheckIcon class="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <BaseButton to="/auth/register" variant="outline" size="lg" block class="py-5 border-gray-200 text-gray-700 group-hover:border-primary group-hover:text-primary transition-all">Create free account</BaseButton>
          </div>
        </div>

        <!-- Enterprise Node (Custom) -->
        <div class="bg-primary-dark text-white rounded-[3rem] p-10 lg:p-16 hover:shadow-2xl hover:shadow-primary-dark/20 transition-all duration-700 relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"></div>
          
          <div class="space-y-8 relative z-10">
            <div class="inline-flex items-center space-x-2 px-4 py-1.5 bg-secondary/20 rounded-full border border-secondary/30 text-secondary text-[10px] font-black tracking-widest uppercase">
              Consolidator favorite
            </div>
            
            <div class="space-y-2">
              <h3 class="text-3xl font-black">Enterprise node</h3>
              <p class="text-white/60 font-medium">For large-scale consolidators and franchise networks.</p>
            </div>
            
            <div class="flex items-baseline space-x-2">
              <span class="text-6xl font-black">Custom</span>
            </div>

            <ul class="space-y-4">
              <li v-for="feature in enterpriseFeatures" :key="feature" class="flex items-center space-x-3 text-white/80 font-medium">
                <CheckIcon class="h-5 w-5 text-secondary flex-shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <BaseButton to="/contact" variant="primary" size="lg" block class="py-5 shadow-2xl shadow-primary/20">Talk to enterprise sales</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Preview -->
    <section class="py-24 bg-neutral-50 border-t border-neutral-100 mb-20">
      <div class="max-w-4xl mx-auto px-6">
        <h3 class="text-3xl font-black text-primary-dark text-center mb-16 tracking-tight">Common inquiries</h3>
        <div class="space-y-8">
           <div v-for="faq in faqs" :key="faq.q" class="space-y-3">
              <h4 class="text-lg font-bold text-primary-dark">{{ faq.q }}</h4>
              <p class="text-neutral-500 leading-relaxed font-medium">{{ faq.a }}</p>
           </div>
        </div>
        <div class="text-center mt-20">
           <NuxtLink to="/help-center" class="text-sm font-black text-primary tracking-widest hover:text-primary-dark transition-colors uppercase border-b-2 border-primary/20 pb-2">Visit Help Center</NuxtLink>
        </div>
      </div>
    </section>

    <footer class="py-12 text-center text-sm font-medium text-neutral-400">
       © 2026 Flybeth B2B. Empowering travel intelligence.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

const agentFeatures = [
  'Direct wholesale inventory access',
  'Instant GDS ticketing',
  'Unlimited passenger records',
  'Standard agent dashboard',
  'Email support (24h response)',
  'Base commission mapping'
]

const enterpriseFeatures = [
  'Unlimited agent sub-accounts',
  'Priority GDS API clusters',
  'Custom white-label options',
  'Real-time revenue sharing',
  'Dedicated account manager',
  'Advanced analytics suite',
  'Multi-currency settlement'
]

const faqs = [
  { 
    q: 'How does Flybeth offer wholesale rates?', 
    a: 'We aggregate inventory directly from global GDS and NDC pools, passing the direct-access price to our agents without the retail markups typically found on public travel sites.' 
  },
  { 
    q: 'Are there any hidden transaction fees?', 
    a: 'No. The price you see in the results is the net wholesale rate. Any markups or service fees you add are entirely yours to keep.' 
  }
]
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
