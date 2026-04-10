<template>
  <div class="space-y-12 relative">
    <!-- Verification Status Banner -->
    <div v-if="user?.agentStatus === 'pending'" class="absolute inset-0 z-50 backdrop-blur-[6px] bg-white/10 flex items-center justify-center pointer-events-auto rounded-[3rem]">
       <div class="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-2xl text-center max-w-lg mx-auto transform -translate-y-20">
          <div class="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
             <span class="text-4xl animate-pulse">🔒</span>
          </div>
          <h2 class="text-3xl  text-primary-dark tracking-tighter mb-4">Features Locked</h2>
          <p class="text-neutral-500 font-medium leading-relaxed">
            Your workspace is being prepared. Once our team approves your application, you'll have full access to global flight rates and luxury stay inventory.
          </p>
          <div class="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-center space-x-6">
             <div class="text-center">
                <p class="text-[10px]  uppercase tracking-widest text-neutral-400 mb-1">Status</p>
                <p class="text-xs  text-secondary uppercase tracking-widest">Under Review</p>
             </div>
             <div class="h-8 w-[1px] bg-neutral-100"></div>
             <div class="text-center">
                <p class="text-[10px]  uppercase tracking-widest text-neutral-400 mb-1">Estimated Time</p>
                <p class="text-xs  text-primary-dark uppercase tracking-widest">24-48 Hours</p>
             </div>
          </div>
       </div>
    </div>
    <!-- Hero / Welcome Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
      <div class="space-y-2">
        <div class="flex items-center space-x-3 mb-2">
          <span class="px-3 py-1 bg-green-50 text-green-700 text-sm font-bold tracking-widest rounded-full border border-green-200">Online</span>
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
      <BaseCard v-for="stat in stats" :key="stat.name" hover :padding="false" class="relative group overflow-hidden border border-gray-200 bg-white cursor-pointer hover:border-primary/30 transition-colors">
        <div class="p-6 relative z-10">
          <div class="flex items-start justify-between mb-6">
            <div class="p-3 rounded-xl bg-primary/5 border border-primary/10 text-primary">
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
        
        <BaseCard :padding="false" class="border border-gray-200 bg-white overflow-hidden rounded-xl">
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
                <tr v-for="item in displayedBookings" :key="item._id" class="hover:bg-gray-50 cursor-pointer transition-colors group">
                  <td class="px-6 py-5">
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-900 group-hover:text-primary transition-colors">{{ getServiceDescription(item) }}</span>
                      <span class="text-xs text-gray-400 font-medium mt-0.5">{{ item.pnr }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center space-x-3" v-if="item.contactDetails">
                      <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {{ item.contactDetails.name?.split(' ').map((n: any) => n[0]).join('') || 'U' }}
                      </div>
                      <span class="text-sm font-medium text-gray-700">{{ item.contactDetails.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 rounded-full text-sm font-bold tracking-wider border" :class="statusClass(item.status)">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <span class=" font-bold text-gray-900 text-base">${{ item.pricing?.totalAmount?.toLocaleString() }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-xs font-medium text-gray-500">{{ formatDate(item.createdAt) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Actions and Performance -->
      <div class="lg:col-span-4 space-y-6">
        <BaseCard :padding="false" class="bg-white border border-gray-200 relative overflow-hidden group rounded-xl">
          <div class="p-8 relative z-10 space-y-6">
            <div class="flex items-center justify-between border-b border-gray-100 pb-6">
              <div class="space-y-1">
                <p class="text-gray-500 text-sm font-bold tracking-wider">Monthly Yield</p>
                <p class="text-4xl  font-bold text-gray-900 tracking-tight">${{ monthlyYield.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <CurrencyDollarIcon class="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div class="space-y-3 pt-2">
              <div class="flex justify-between items-end">
                <div class="space-y-1">
                  <span class="text-gray-500 text-sm font-bold tracking-wider">Progress to Target</span>
                  <p class="text-lg font-bold text-gray-900">{{ progressPercentage.toFixed(1) }}%</p>
                </div>
                <div class="text-right">
                  <span class="text-gray-400 text-sm font-bold tracking-wider">Target</span>
                  <p class="text-sm font-medium text-gray-600">${{ targetRevenue.toLocaleString() }}</p>
                </div>
              </div>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div class="bg-primary h-full rounded-full transition-all duration-1000" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <p class="text-[11px] text-gray-500 font-medium leading-relaxed mt-2">
                Based on current trajectories, you will reach {{ progressPercentage.toFixed(1) }}% of your target this month.
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="border border-gray-200 bg-white p-8 rounded-xl">
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
  ArrowUpRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const statusIcon = computed(() => {
  switch(user.value?.agentStatus) {
    case 'under_review': return InformationCircleIcon
    case 'rejected': return ExclamationCircleIcon
    case 'suspended': return ExclamationCircleIcon
    default: return ClockIcon
  }
})

const statusIconBg = computed(() => {
  switch(user.value?.agentStatus) {
    case 'under_review': return 'bg-blue-50'
    case 'rejected': return 'bg-red-50'
    case 'suspended': return 'bg-red-50'
    default: return 'bg-yellow-50'
  }
})

const statusIconColor = computed(() => {
  switch(user.value?.agentStatus) {
    case 'under_review': return 'text-blue-600'
    case 'rejected': return 'text-red-600'
    case 'suspended': return 'text-red-600'
    default: return 'text-yellow-600'
  }
})

const statusMessage = computed(() => {
  switch(user.value?.agentStatus) {
    case 'under_review': return 'Our compliance team is currently reviewing your documents. You have limited view access until approval.'
    case 'rejected': return 'Your application was not approved. Please contact our support team for further details.'
    case 'suspended': return 'Your account has been suspended due to a policy violation. Reach out to your account manager.'
    default: return 'Your application has been received. Please ensure all documents are uploaded to expedite the review process.'
  }
})

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

const stats = computed(() => [
  {
    name: 'Total Revenue',
    value: statsData.value ? `$${statsData.value.totalRevenue.toLocaleString()}` : '$0',
    trend: '+12.5%',
    trendClass: 'text-secondary',
    icon: CurrencyDollarIcon,
    iconClass: 'text-secondary shadow-secondary/10'
  },
  {
    name: 'Total Bookings',
    value: statsData.value ? statsData.value.totalBookings.toLocaleString() : '0',
    trend: '+8.2%',
    trendClass: 'text-secondary',
    icon: TicketIcon,
    iconClass: 'text-primary shadow-primary/10'
  },
  {
    name: 'Confirmed',
    value: statsData.value?.byStatus?.confirmed?.count.toLocaleString() || '0',
    trend: '+14.1%',
    trendClass: 'text-secondary',
    icon: UsersIcon,
    iconClass: 'text-blue-500 shadow-blue-500/10'
  },
  {
    name: 'Rating',
    value: '9.8',
    trend: '+0.2',
    trendClass: 'text-secondary',
    icon: StarIcon,
    iconClass: 'text-yellow-600 shadow-yellow-600/10'
  }
])

const filterDate = ref('')
const displayedBookings = computed(() => {
  const data = bookings.value || []
  if (!filterDate.value) return data.slice(0, 5)
  return data.filter((b: any) => new Date(b.createdAt).toISOString().split('T')[0] === filterDate.value).slice(0, 5)
})

const { user } = useUser()
const { bookings, stats: statsData, fetchBookings, fetchStats } = useBookings()

const monthlyYield = computed(() => statsData.value?.totalRevenue || 0)
const targetRevenue = 15000
const progressPercentage = computed(() => Math.min(100, (monthlyYield.value / targetRevenue) * 100))

onMounted(() => {
  fetchBookings({ limit: 10 })
  fetchStats()
})

const getServiceDescription = (item: any) => {
  if (item.flights?.length) return `Flight: ${item.flights[0].flight?.airline || 'Airline'} (${item.flights[0].flight?.origin} - ${item.flights[0].flight?.destination})`
  if (item.stays?.length) return `Stay: ${item.stays[0].stay?.name || 'Hotel'}`
  if (item.cars?.length) return `Car: ${item.cars[0].car?.brand || 'Rental'}`
  return 'Custom Package'
}

const statusClass = (status: string) => {
  const s = status.toLowerCase()
  if (s === 'confirmed' || s === 'ticketed') return 'text-secondary bg-secondary/5 border-secondary/20'
  if (s === 'pending') return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  if (s === 'cancelled') return 'text-red-500 bg-red-50 border-red-100'
  return 'text-neutral/40 bg-gray-50 border-gray-200'
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 3600000) return 'Just now'
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
  return d.toLocaleDateString()
}

const handleBroadcast = () => {
  alert('Broadcast feature is ready to be linked to the messaging schema.')
}
</script>
