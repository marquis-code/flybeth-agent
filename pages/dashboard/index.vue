<template>
  <div class="space-y-12">
    <!-- Hero / Welcome Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
      <div class="space-y-2">
        <div class="flex items-center space-x-3 mb-2">
          <span class="px-3 py-1 bg-green-50 text-green-700 text-sm font-bold tracking-widest rounded-full border border-green-100">Status normal</span>
          <span class="text-neutral-400 text-sm font-bold tracking-widest">• {{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
        </div>
        <h2 class="text-4xl  font-bold text-gray-900 tracking-tight leading-none">
          Welcome back, <span class="text-primary">{{ user?.firstName || 'Agent' }}</span>
        </h2>
        <p class="text-gray-500 font-medium text-base max-w-xl">
          Your travel business is performing <span class="text-green-600 font-bold">12.5% better</span> than last month. Keep up the momentum!
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <BaseButton variant="outline" size="md" class="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" @click="navigateTo('/dashboard/reports')">
          Performance Report
        </BaseButton>
        <BaseButton variant="primary" size="md" class="shadow-sm" @click="navigateTo('/dashboard/customers')">
          Add Customer
        </BaseButton>
      </div>
    </div>

    <!-- Enhanced Service Search -->
    <ServiceSearch />

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseCard v-for="stat in stats" :key="stat.name" hover :padding="false" class="relative group overflow-hidden border border-gray-200 shadow-sm bg-white cursor-pointer hover:border-primary/30 transition-colors">
        <div class="p-6 relative z-10">
          <div class="flex items-start justify-between mb-6">
            <div class="p-3 rounded-xl bg-gray-50 border border-gray-100 text-primary">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <div class="flex flex-col items-end">
              <div class="flex items-center text-xs font-bold text-green-600">
                <span>{{ stat.trend }}</span>
                <ArrowUpRightIcon class="h-3 w-3 ml-1" />
              </div>
              <span class="text-[9px] font-bold tracking-widest text-gray-400 mt-1 text-center">Growth</span>
            </div>
          </div>
          <h3 class="text-xs font-bold text-gray-500 tracking-wider mb-1">{{ stat.name }}</h3>
          <p class="text-3xl  font-bold text-gray-900 tracking-tight">{{ stat.value }}</p>
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Recent Bookings Table -->
      <div class="lg:col-span-8 space-y-6">
        <div class="flex items-end justify-between px-1">
          <div>
            <h3 class="text-xl  font-bold text-gray-900">Recent Bookings</h3>
            <p class="text-xs text-gray-500 font-medium mt-1">Real-time activity log</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-48">
              <CustomDatePicker v-model="filterDate" label="Filter by Date" />
            </div>
            <NuxtLink to="/dashboard/bookings" class="px-5 py-2 bg-white rounded-lg text-[11px] font-bold tracking-wider text-primary border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors shadow-sm h-[42px] flex items-center justify-center">
              Manage All
            </NuxtLink>
          </div>
        </div>
        
        <BaseCard :padding="false" class="border border-gray-200 shadow-sm bg-white overflow-hidden rounded-xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th v-for="header in bookingHeaders" :key="header.key" class="px-6 py-4 text-sm font-bold tracking-wider text-gray-500">
                    {{ header.label }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="item in displayedBookings" :key="item.id" class="hover:bg-gray-50 cursor-pointer transition-colors group">
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-900 group-hover:text-primary transition-colors">{{ item.service }}</span>
                      <span class="text-xs text-gray-400 font-medium mt-0.5">{{ item.reference }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {{ item.customer.split(' ').map((n: any) => n[0]).join('') }}
                      </div>
                      <span class="text-sm font-medium text-gray-700">{{ item.customer }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 rounded-full text-sm font-bold tracking-wider border" :class="statusClass(item.status)">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <span class=" font-bold text-gray-900 text-base">${{ item.amount }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-xs font-medium text-gray-500">{{ item.date }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Actions and Performance -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard :padding="false" class="bg-white border border-gray-200 shadow-sm relative overflow-hidden group rounded-xl">
          <div class="p-8 relative z-10 space-y-6">
            <div class="flex items-center justify-between border-b border-gray-100 pb-6">
              <div class="space-y-1">
                <p class="text-gray-500 text-sm font-bold tracking-wider">Monthly Yield</p>
                <p class="text-4xl  font-bold text-gray-900 tracking-tight">$12,450</p>
              </div>
              <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <CurrencyDollarIcon class="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div class="space-y-3 pt-2">
              <div class="flex justify-between items-end">
                <div class="space-y-1">
                  <span class="text-gray-500 text-sm font-bold tracking-wider">Progress to Target</span>
                  <p class="text-lg font-bold text-gray-900">83.4%</p>
                </div>
                <div class="text-right">
                  <span class="text-gray-400 text-sm font-bold tracking-wider">Target</span>
                  <p class="text-sm font-medium text-gray-600">$15,000</p>
                </div>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div class="bg-primary h-full w-[83%] rounded-full transition-all duration-1000"></div>
              </div>
              <p class="text-[11px] text-gray-500 font-medium leading-relaxed mt-2">
                Based on current trajectories, you will exceed your target by 4.2% if momentum continues.
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="border border-gray-200 shadow-sm bg-white p-8 rounded-xl">
          <h3 class="text-base font-bold text-gray-900 mb-6 tracking-wider">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-4">
            <BaseButton variant="outline" class="flex-col animate-none h-24 space-y-2 rounded-xl group border-gray-200 hover:border-primary hover:bg-primary/5 shadow-none" @click="navigateTo('/dashboard/bookings')">
              <PlusCircleIcon class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
              <span class="text-sm font-bold text-gray-600 group-hover:text-primary tracking-wider">New booking</span>
            </BaseButton>
            <BaseButton variant="outline" class="flex-col animate-none h-24 space-y-2 rounded-xl group border-gray-200 hover:border-primary hover:bg-primary/5 shadow-none" @click="navigateTo('/dashboard/customers')">
              <UserPlusIcon class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
              <span class="text-sm font-bold text-gray-600 group-hover:text-primary tracking-wider">Add customer</span>
            </BaseButton>
            <BaseButton variant="outline" class="flex-col animate-none h-24 space-y-2 rounded-xl group border-gray-200 hover:border-primary hover:bg-primary/5 shadow-none" @click="navigateTo('/dashboard/reports')">
              <DocumentChartBarIcon class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
              <span class="text-sm font-bold text-gray-600 group-hover:text-primary tracking-wider">Insights</span>
            </BaseButton>
            <BaseButton variant="outline" class="flex-col animate-none h-24 space-y-2 rounded-xl group border-gray-200 hover:border-primary hover:bg-primary/5 shadow-none" @click="handleBroadcast">
              <EnvelopeIcon class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
              <span class="text-sm font-bold text-gray-600 group-hover:text-primary tracking-wider">Broadcast</span>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import CustomDatePicker from '@/components/ui/CustomDatePicker.vue'
import { useBookings } from '@/composables/modules/bookings/useBookings'
import { useUser } from '@/composables/modules/auth/user'
import { 
  CurrencyDollarIcon, 
  TicketIcon, 
  UsersIcon, 
  StarIcon,
  PlusCircleIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon,
  InformationCircleIcon,
  ArrowUpRightIcon
} from '@heroicons/vue/24/outline'

import ServiceSearch from '@/components/dashboard/ServiceSearch.vue'

definePageMeta({
  layout: 'dashboard'
})

const bookingHeaders = [
  { key: 'service', label: 'Service' },
  { key: 'customer', label: 'Traveler' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Revenue' },
  { key: 'date', label: 'Date' },
]

const stats = [
  {
    name: 'Total Revenue',
    value: '$435,230',
    trend: '+12.5%',
    trendClass: 'text-secondary',
    icon: CurrencyDollarIcon,
    iconClass: 'text-secondary shadow-secondary/10'
  },
  {
    name: 'Live Bookings',
    value: '1,128',
    trend: '+8.2%',
    trendClass: 'text-secondary',
    icon: TicketIcon,
    iconClass: 'text-primary shadow-primary/10'
  },
  {
    name: 'Market Share',
    value: '14.2%',
    trend: '+14.1%',
    trendClass: 'text-secondary',
    icon: UsersIcon,
    iconClass: 'text-blue-500 shadow-blue-500/10'
  },
  {
    name: 'Network Trust',
    value: '9.8',
    trend: '+0.2',
    trendClass: 'text-secondary',
    icon: StarIcon,
    iconClass: 'text-yellow-600 shadow-yellow-600/10'
  }
]

const today = new Date().toISOString().split('T')[0]
const recentBookings = [
  { id: 1, service: 'Emirates First Class (DXB-LHR)', reference: 'FLY-82930', customer: 'Sarah Johnson', status: 'Confirmed', amount: '8,200', date: 'Just now', timestamp: today },
  { id: 2, service: 'Villa Alila Manggis - Bali', reference: 'FLY-82931', customer: 'Michael Chen', status: 'Pending', amount: '12,850', date: '12 mins ago', timestamp: today },
  { id: 3, service: 'Bentley Bentayga Rental', reference: 'FLY-82932', customer: 'David Smith', status: 'Cancelled', amount: '1,450', date: '1 hour ago', timestamp: today },
  { id: 4, service: 'Amanyara Providenciales', reference: 'FLY-82933', customer: 'Emma Wilson', status: 'Confirmed', amount: '14,100', date: '2 hours ago', timestamp: today },
  { id: 5, service: 'Private Island Tour - Maldives', reference: 'FLY-82934', customer: 'James Brown', status: 'Confirmed', amount: '3,150', date: 'Today, 10:45 AM', timestamp: today },
]

const filterDate = ref('')
const displayedBookings = computed(() => {
  if (!filterDate.value) return recentBookings
  return recentBookings.filter(b => b.timestamp === filterDate.value)
})

const { user } = useUser()
const { bookings, fetchBookings, fetchStats } = useBookings()

onMounted(() => {
  fetchBookings()
  fetchStats()
})

const statusClass = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'text-secondary bg-secondary/5 border-secondary/20'
    case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'Cancelled': return 'text-red-500 bg-red-50 border-red-100'
    default: return 'text-neutral/40 bg-gray-50 border-gray-200'
  }
}
const handleBroadcast = () => {
  alert('Broadcast feature is ready to be linked to the messaging schema.')
}
</script>
