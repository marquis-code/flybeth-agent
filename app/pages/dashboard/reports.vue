<template>
  <div class="space-y-10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-serif font-bold text-primary-dark tracking-tight">Performance Reports</h2>
        <p class="text-neutral/60 mt-1 font-medium">Analyze your agency growth and commission earnings.</p>
      </div>
      <BaseButton variant="outline" :icon="DocumentArrowDownIcon">Export Full Audit</BaseButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard v-for="report in summaryReports" :key="report.title" hover>
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-primary/5 rounded-xl text-primary">
            <component :is="report.icon" class="h-6 w-6" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">{{ report.subtitle }}</p>
            <p class="text-xl font-serif font-bold text-primary-dark">{{ report.title }}</p>
          </div>
        </div>
        <div class="mt-6 flex items-end justify-between">
          <p class="text-2xl font-bold" :class="report.color">{{ report.value }}</p>
          <span class="text-xs font-bold text-secondary flex items-center">
            <ArrowUpIcon class="h-3 w-3 mr-1" /> {{ report.growth }}
          </span>
        </div>
      </BaseCard>
    </div>

    <BaseCard title="Revenue Distribution" class="overflow-hidden">
      <template #header>
        <h3 class="font-serif font-bold text-primary-dark">Monthly Revenue Growth</h3>
      </template>
      <div class="h-64 bg-gray-50/50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
        <div class="text-center">
          <ChartBarIcon class="h-10 w-10 text-neutral/20 mx-auto mb-2" />
          <p class="text-sm font-bold text-neutral/30 uppercase tracking-widest">Interactive Chart Layer Ready</p>
        </div>
      </div>
    </BaseCard>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <BaseCard title="Top Performing Services">
        <template #header>
          <h3 class="font-serif font-bold text-primary-dark">Top Services</h3>
        </template>
        <div class="space-y-4">
          <div v-for="service in topServices" :key="service.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 rounded-full" :class="service.color"></div>
              <span class="text-sm font-medium">{{ service.name }}</span>
            </div>
            <span class="text-sm font-bold text-primary-dark">{{ service.percentage }}%</span>
          </div>
        </div>
      </BaseCard>

      <BaseCard title="Regional Distribution">
        <template #header>
          <h3 class="font-serif font-bold text-primary-dark">Client Base</h3>
        </template>
        <div class="space-y-4">
          <div v-for="region in regions" :key="region.name" class="flex items-center justify-between">
            <span class="text-sm font-medium">{{ region.name }}</span>
            <div class="flex-grow mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div class="bg-secondary h-full" :style="{ width: region.width }"></div>
            </div>
            <span class="text-sm font-bold text-primary-dark">{{ region.value }}</span>
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
  { title: 'Gross Revenue', subtitle: 'Quarterly', value: '$124,500', growth: '18%', icon: CurrencyDollarIcon, color: 'text-primary-dark' },
  { title: 'Total Commissions', subtitle: 'Agent Earnings', value: '$18,675', growth: '12%', icon: ChartBarIcon, color: 'text-secondary' },
  { title: 'Ticket Volume', subtitle: 'Operations', value: '1,420', growth: '24%', icon: TicketIcon, color: 'text-blue-500' },
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
