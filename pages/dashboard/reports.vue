<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold text-gray-900 ">Reports & Analytics</h2>
        <p class="text-[10px] text-gray-400 font-bold  ">See how your business is growing over time</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="days" class="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 outline-none" @change="fetchAllAnalytics(days)">
          <option :value="7">Last 7 Days</option>
          <option :value="30">Last 30 Days</option>
          <option :value="90">Last 90 Days</option>
        </select>
        <button class="px-4 py-2 bg-primary-dark text-white rounded-lg text-xs font-bold hover:bg-black transition-colors" @click="fetchAllAnalytics(days)">
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="stat in summaryStats" :key="stat.label" class="p-5 bg-white border border-gray-100 rounded-xl relative overflow-hidden group">
         <div class="absolute -right-4 -top-4 opacity-5 rotate-12 transition-transform group-hover:scale-110">
            <component :is="stat.icon" class="h-20 w-20" />
         </div>
         <p class="text-[10px] font-bold text-gray-400   mb-1">{{ stat.label }}</p>
         <h4 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h4>
         <div v-if="stat.trend" class="mt-3 flex items-center text-[10px] font-bold" :class="stat.trend > 0 ? 'text-emerald-500' : 'text-rose-500'">
            {{ stat.trend > 0 ? '▲' : '▼' }} {{ Math.abs(stat.trend) }}% since last time
         </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Popular Routes -->
      <div class="space-y-4">
         <h3 class="text-xs font-bold text-gray-400   px-1">Most Popular Trips</h3>
         <div class="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table class="w-full text-left">
               <thead>
                  <tr class="bg-gray-50/50 border-b border-gray-100">
                     <th class="px-5 py-3 text-[9px] font-bold   text-gray-400">Where to</th>
                     <th class="px-5 py-3 text-[9px] font-bold   text-gray-400">Total Bookings</th>
                     <th class="px-5 py-3 text-[9px] font-bold   text-gray-400 text-right">Money Made</th>
                  </tr>
               </thead>
               <tbody class="divide-y divide-gray-50">
                  <tr v-if="loading" v-for="i in 5" :key="i"><td colspan="3" class="px-5 py-3 animate-pulse bg-gray-50/20"></td></tr>
                  <tr v-else-if="!popularRoutes.length" class="text-center py-10"><td colspan="3" class="py-10 text-[10px] text-gray-400 font-bold ">No data yet</td></tr>
                  <tr v-for="route in popularRoutes" :key="route.id" class="hover:bg-gray-50 transition-colors">
                     <td class="px-5 py-3 text-xs font-bold text-gray-900">{{ route.origin }} to {{ route.destination }}</td>
                     <td class="px-5 py-3 text-xs text-gray-600">{{ route.count }} Bookings</td>
                     <td class="px-5 py-3 text-xs font-bold text-gray-900 text-right">${{ route.revenue.toLocaleString() }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      <!-- Service Type Breakdown -->
      <div class="space-y-4">
         <h3 class="text-xs font-bold text-gray-400   px-1">What people are booking</h3>
         <div class="bg-white border border-gray-100 rounded-xl p-5 min-h-[200px] flex items-center justify-center">
            <div class="text-center space-y-2">
               <ChartPieIcon class="h-8 w-8 text-gray-200 mx-auto" />
               <p class="text-[10px] text-gray-400 font-bold  ">See your top services here</p>
               <div class="flex gap-4 mt-4">
                  <div class="flex items-center gap-2">
                     <div class="h-2 w-2 rounded-full bg-primary"></div>
                     <span class="text-[9px] font-bold  text-gray-500">Flights</span>
                  </div>
                  <div class="flex items-center gap-2">
                     <div class="h-2 w-2 rounded-full bg-secondary"></div>
                     <span class="text-[9px] font-bold  text-gray-500">Hotels</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAnalytics } from '@/composables/modules/analytics/useAnalytics'
import { useUser } from '@/composables/modules/auth/user'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  TicketIcon, 
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ChartPieIcon,
  ArrowUpRightIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const days = ref(30)
const { user } = useUser()
const { loading, bookingStats, revenueStats, popularRoutes, fetchAllAnalytics } = useAnalytics()

watch(() => user.value?.tenantId, (newId) => {
  if (newId) {
    fetchAllAnalytics(days.value)
  }
}, { immediate: true })

const summaryStats = computed(() => [
  {
    label: 'Total Money Made',
    value: revenueStats.value ? `$${revenueStats.value.totalRevenue.toLocaleString()}` : '$0',
    icon: CurrencyDollarIcon,
    trend: 14.2
  },
  {
    label: 'Booking Success Rate',
    value: '3.8%',
    icon: ArrowTrendingUpIcon,
    trend: -2.1
  },
  {
    label: 'New Customers',
    value: '42',
    icon: UserGroupIcon,
    trend: 8.5
  }
])
</script>
