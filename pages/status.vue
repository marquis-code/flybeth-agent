<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Header -->
    <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <div class="flex items-center space-x-2">
           <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
           <span class="text-xs font-black text-primary-dark tracking-widest uppercase">Nodes operational</span>
        </div>
      </div>
    </nav>

    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-16">
        <div class="text-center space-y-6">
          <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
             System <br />
             <span class="text-secondary italic">vitality.</span>
          </h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
             Monitor the real-time health of the Flybeth global distribution network and our core service clusters.
          </p>
        </div>

        <!-- Global Status Card -->
        <div class="bg-neutral-50 rounded-[3rem] p-10 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div class="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-neutral-200 pb-10">
              <div class="space-y-1 text-center md:text-left">
                 <p class="text-sm font-black text-neutral-400 tracking-widest uppercase">Global Network</p>
                 <h2 class="text-4xl font-black text-green-600">All systems go</h2>
              </div>
              <div class="px-6 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black tracking-widest border border-green-200 uppercase">
                 Stable
              </div>
           </div>

           <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
              <div v-for="node in nodes" :key="node.name" class="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100">
                 <div class="flex items-center space-x-4">
                    <div class="w-2 h-2 rounded-full" :class="node.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'"></div>
                    <span class="font-bold text-primary-dark">{{ node.name }}</span>
                 </div>
                 <span class="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{{ node.latency }}ms</span>
              </div>
           </div>
        </div>

        <!-- Historical Uptime -->
        <div class="space-y-6">
           <h3 class="text-2xl font-black text-primary-dark tracking-tight">Node health history</h3>
           <div class="space-y-4">
              <div v-for="service in services" :key="service" class="space-y-3">
                 <div class="flex justify-between items-end">
                    <span class="text-sm font-black text-neutral-500 uppercase tracking-widest">{{ service }}</span>
                    <span class="text-xs font-bold text-primary">99.98%</span>
                 </div>
                 <div class="flex gap-1">
                    <div v-for="i in 50" :key="i" class="h-8 flex-1 bg-green-500/20 rounded-sm hover:bg-green-500 transition-colors" title="Uptime 100%"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <footer class="py-12 bg-neutral-50 border-t border-neutral-100 text-center">
        <p class="text-sm text-neutral-400 font-medium">© 2026 Flybeth Status Monitoring.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const nodes = [
  { name: 'GDS Integration (Sabre)', status: 'online', latency: 45 },
  { name: 'GDS Integration (Amadeus)', status: 'online', latency: 38 },
  { name: 'NDC Flight Pool', status: 'online', latency: 82 },
  { name: 'HotelBeds Feed', status: 'online', latency: 124 },
  { name: 'Expedia TAAP Sync', status: 'online', latency: 210 },
  { name: 'Payment Settlement Node', status: 'online', latency: 12 }
]

const services = ['Flight Search Engine', 'Hotel Booking Matrix', 'API Gateway', 'Partner Portal']
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
