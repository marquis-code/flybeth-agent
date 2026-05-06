<template>
  <div class="bg-white">
    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-16">
        <div class="text-center space-y-6">
          <span class="text-xs font-bold text-primary uppercase tracking-widest">Live Updates</span>
          <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
             System <br />
             <span class="text-primary">status.</span>
          </h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
             Check the real-time health of the Flybeth network and our booking systems.
          </p>
        </div>

        <!-- Global Status Card -->
        <div class="bg-neutral-50 rounded-[3rem] p-10 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div class="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-neutral-200 pb-10">
              <div class="space-y-1 text-center md:text-left">
                 <p class="text-xs font-bold text-neutral-400 uppercase tracking-widest">Overall Status</p>
                 <h2 class="text-3xl font-bold text-green-600 tracking-tight">All systems operational</h2>
              </div>
              <div class="px-6 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200 uppercase tracking-widest">
                 Running Smoothly
              </div>
           </div>

           <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
              <div v-for="node in nodes" :key="node.name" class="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100">
                 <div class="flex items-center space-x-4">
                    <div class="w-2 h-2 rounded-full" :class="node.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'"></div>
                    <span class="font-bold text-primary-dark">{{ node.name }}</span>
                 </div>
                 <span class="text-sm  text-neutral-400  ">{{ node.latency }}ms</span>
              </div>
           </div>
        </div>

        <!-- Historical Uptime -->
        <div class="space-y-6">
           <h3 class="text-2xl font-bold text-neutral-900">Uptime history</h3>
           <div class="space-y-4">
              <div v-for="service in services" :key="service" class="space-y-3">
                 <div class="flex justify-between items-end">
                    <span class="text-sm  text-neutral-500  ">{{ service }}</span>
                    <span class="text-sm font-bold text-primary">99.98%</span>
                 </div>
                 <div class="flex gap-1">
                    <div v-for="i in 50" :key="i" class="h-8 flex-1 bg-green-500/20 rounded-sm hover:bg-green-500 transition-colors" title="Uptime 100%"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const nodes = [
  { name: 'Airline Booking (System A)', status: 'online', latency: 45 },
  { name: 'Airline Booking (System B)', status: 'online', latency: 38 },
  { name: 'Direct Airline Feeds', status: 'online', latency: 82 },
  { name: 'Hotel Booking System', status: 'online', latency: 124 },
  { name: 'Hotel Partner Network', status: 'online', latency: 210 },
  { name: 'Payment Processing', status: 'online', latency: 12 }
]

const services = ['Flight Search', 'Hotel Search', 'API Gateway', 'Agent Dashboard']
</script>

<style scoped>
. { font-weight: 900; }
</style>
