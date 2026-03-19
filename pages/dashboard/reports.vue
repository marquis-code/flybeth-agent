<template>
  <div class="space-y-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-gray-200">
      <div class="space-y-1">
        <h2 class="text-4xl font-black text-primary-dark tracking-tight">Insights & revenue</h2>
        <p class="text-neutral/40 font-bold tracking-widest text-xs uppercase italic">Real-time performance metrics</p>
      </div>
      <BaseButton variant="outline" class="shadow-sm border border-gray-200 py-4 px-10 rounded-2xl">
        Export data
      </BaseButton>
    </div>

    <!-- Summary Reports Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <BaseCard v-for="report in summaryReports" :key="report.title" hover :padding="false" class="border border-gray-200 shadow-sm relative overflow-hidden group">
        <div class="p-10 relative z-10">
          <div class="flex items-center justify-between mb-8">
            <div class="p-5 bg-white border border-gray-200 shadow-sm rounded-[1.5rem] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" :class="report.iconColor">
              <component :is="report.icon" class="h-8 w-8" />
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[9px] font-black text-neutral/30 tracking-[0.2em] mb-1">Growth</span>
              <div class="flex items-center text-xs font-black text-secondary">
                <ArrowUpIcon class="h-3 w-3 mr-1" /> {{ report.growth }}
              </div>
            </div>
          </div>
          <p class="text-sm font-black text-neutral/40 tracking-[0.2em] mb-2">{{ report.subtitle }}</p>
          <p class="text-3xl font-black text-primary-dark tracking-tighter">{{ report.value }}</p>
          <h3 class="text-xs font-bold text-neutral/20 mt-1 tracking-wider">{{ report.title }}</h3>
        </div>
        <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
      </BaseCard>
    </div>

    <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
      <div class="p-10 bg-white border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 class="text-2xl font-black text-primary-dark">Revenue trends</h3>
          <p class="text-xs text-neutral/30 font-bold tracking-widest mt-1">Global revenue breakdown (Current quarter)</p>
        </div>
        <div class="flex items-center space-x-2 bg-gray-50 p-1 rounded-2xl border border-gray-200">
          <button class="px-5 py-2 text-sm font-black tracking-widest rounded-xl bg-primary-dark text-white shadow-sm transition-all">Daily</button>
          <button class="px-5 py-2 text-sm font-black tracking-widest rounded-xl text-neutral/40 hover:text-primary-dark transition-all">Weekly</button>
          <button class="px-5 py-2 text-sm font-black tracking-widest rounded-xl text-neutral/40 hover:text-primary-dark transition-all">Monthly</button>
        </div>
      </div>
      <div class="p-10">
        <div class="h-80 bg-gray-50/50 rounded-[2.5rem] flex items-center justify-center border-4 border-dashed border-gray-200 group relative cursor-pointer overflow-hidden">
          <div class="absolute inset-0 bg-primary-dark scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 opacity-5"></div>
          <div class="text-center relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
            <div class="p-8 bg-white border border-gray-200 shadow-sm rounded-[2.5rem] inline-block mb-6 group-hover:scale-110 transition-transform">
              <ChartBarIcon class="h-12 w-12 text-primary group-hover:text-secondary transition-colors" />
            </div>
            <p class="text-sm font-black tracking-[0.3em] uppercase">Load interactive charts</p>
            <p class="text-xs text-neutral/30 font-bold mt-2 px-20 uppercase">Connect to real-time data stream and render immersive visual layers</p>
          </div>
        </div>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12">
      <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-10 border-b border-gray-50">
          <h3 class="text-xl font-black text-primary-dark tracking-widest uppercase">Revenue by service</h3>
        </div>
        <div class="p-10 space-y-8">
          <div v-for="service in topServices" :key="service.name" class="group cursor-pointer">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-black text-primary-dark tracking-widest flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :class="service.color"></div>
                {{ service.name }}
              </span>
              <span class="text-sm font-black text-secondary">{{ service.percentage }}%</span>
            </div>
            <div class="w-full h-3 bg-gray-50 rounded-full overflow-hidden p-0.5">
              <div class="h-full rounded-full transition-all duration-1000 group-hover:opacity-80" :class="service.color" :style="{ width: service.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </BaseCard>

      <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-10 border-b border-gray-50">
          <h3 class="text-xl font-black text-primary-dark tracking-widest uppercase">Regional performance</h3>
        </div>
        <div class="p-10 space-y-8">
          <div v-for="region in regions" :key="region.name" class="group cursor-pointer">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-black text-primary-dark tracking-widest">{{ region.name }}</span>
              <span class="text-sm font-black text-primary">{{ region.value }}</span>
            </div>
            <div class="w-full h-3 bg-gray-50 rounded-full overflow-hidden p-0.5">
              <div class="bg-primary h-full rounded-full transition-all duration-1000 group-hover:bg-secondary" :style="{ width: region.width }"></div>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentArrowDownIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  TicketIcon,
  UsersIcon,
  ArrowUpIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const summaryReports = [
  { title: 'Portfolio Value', subtitle: 'Gross Revenue', value: '$124,500', growth: '18%', icon: CurrencyDollarIcon, iconColor: 'text-primary' },
  { title: 'Yield Metric', subtitle: 'Total Commissions', value: '$18,675', growth: '12%', icon: ChartBarIcon, iconColor: 'text-secondary' },
  { title: 'Operational Flow', subtitle: 'Ticket Volume', value: '1,420', growth: '24%', icon: TicketIcon, iconColor: 'text-blue-500' },
]

const topServices = [
  { name: 'Luxury Stays', percentage: 45, color: 'bg-primary' },
  { name: 'International Flights', percentage: 32, color: 'bg-secondary' },
  { name: 'Corporate Rentals', percentage: 18, color: 'bg-blue-400' },
  { name: 'Guided Experiences', percentage: 5, color: 'bg-yellow-400' },
]

const regions = [
  { name: 'Europe', width: '65%', value: '42%' },
  { name: 'North America', width: '45%', value: '28%' },
  { name: 'Asia Pacific', width: '30%', value: '18%' },
  { name: 'Africa', width: '15%', value: '12%' },
]
</script>
