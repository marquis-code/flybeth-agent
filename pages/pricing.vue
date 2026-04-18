<script setup lang="ts">
import { onMounted } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { useTracking } from '@/composables/core/useTracking'

const { trackAction } = useTracking()

onMounted(() => trackAction('navigated_to_pricing'))

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
</script>

<template>
  <div class="bg-white">
    <section class="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-primary-dark">
      <div class="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 class="text-sm  text-secondary  ">Pricing modules</h2>
        <h1 class="text-5xl lg:text-7xl  text-white er leading-tight">
          Simple, wholesale <br />
          <span class="text-primary ">transparency.</span>
        </h1>
        <p class="text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
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
              <h3 class="text-3xl  text-primary-dark">Agent partner</h3>
              <p class="text-neutral-500 font-medium">For independent advisors and small agencies.</p>
            </div>
            
            <div class="flex items-baseline space-x-2">
              <span class="text-6xl  text-primary-dark">$0</span>
              <span class="text-neutral-400 font-bold   text-sm">per month</span>
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
            <div class="inline-flex items-center space-x-2 px-4 py-1.5 bg-secondary/20 rounded-full border border-secondary/30 text-secondary text-[10px]   ">
              Consolidator favorite
            </div>
            
            <div class="space-y-2">
              <h3 class="text-3xl ">Enterprise node</h3>
              <p class="text-white/60 font-medium">For large-scale consolidators and franchise networks.</p>
            </div>
            
            <div class="flex items-baseline space-x-2">
              <span class="text-6xl ">Custom</span>
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
  </div>
</template>



<style scoped>
. { font-weight: 900; }
</style>
