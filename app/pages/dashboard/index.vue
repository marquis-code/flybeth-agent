<template>
  <div class="space-y-10">
    <!-- Hero / Welcome Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-serif font-bold text-primary-dark">Dashboard Overview</h2>
        <p class="text-neutral/60 mt-1 font-medium">Here's what's happening with your travel business today.</p>
      </div>
      <div class="flex items-center space-x-3">
        <BaseButton variant="outline" size="sm" :icon="CalendarIcon">
          Last 30 Days
        </BaseButton>
        <BaseButton variant="primary" size="sm" :icon="PlusIcon">
          New Booking
        </BaseButton>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseCard v-for="stat in stats" :key="stat.name" hover :padding="false" class="relative overflow-hidden group">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-xl transition-all duration-300 group-hover:scale-110" :class="stat.bgClass">
              <component :is="stat.icon" class="h-6 w-6" :class="stat.iconClass" />
            </div>
            <div class="flex flex-col items-end">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral/40">Growth</span>
              <span class="text-xs font-bold font-sans" :class="stat.trendClass">{{ stat.trend }}</span>
            </div>
          </div>
          <h3 class="text-sm font-bold text-neutral/50 uppercase tracking-widest">{{ stat.name }}</h3>
          <p class="text-3xl font-serif font-bold text-primary-dark mt-1">{{ stat.value }}</p>
        </div>
        <div class="absolute bottom-0 left-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-500"></div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Recent Bookings Table -->
      <div class="lg:col-span-8 flex flex-col space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-serif font-bold text-primary-dark">Recent Activity</h3>
          <NuxtLink to="/dashboard/bookings" class="text-sm font-bold text-secondary hover:text-secondary-dark transition-colors flex items-center">
            View All Bookings <ChevronRightIcon class="h-4 w-4 ml-1" />
          </NuxtLink>
        </div>
        
        <BaseTable :headers="bookingHeaders" :items="recentBookings">
          <template #service="{ item }">
            <div class="flex flex-col">
              <span class="font-bold text-primary-dark">{{ item.service }}</span>
              <span class="text-[10px] text-neutral/40 font-mono tracking-tighter uppercase">{{ item.reference }}</span>
            </div>
          </template>
          <template #customer="{ item }">
            <div class="flex items-center space-x-2">
              <div class="w-7 h-7 bg-primary/5 rounded-full flex items-center justify-center text-[10px] font-bold text-primary">
                {{ item.customer.split(' ').map(n => n[0]).join('') }}
              </div>
              <span class="font-medium">{{ item.customer }}</span>
            </div>
          </template>
          <template #status="{ item }">
            <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border" :class="statusClass(item.status)">
              {{ item.status }}
            </span>
          </template>
          <template #amount="{ item }">
            <span class="font-bold text-primary-dark">${{ item.amount }}</span>
          </template>
          <template #date="{ item }">
            <span class="text-neutral/60 font-medium">{{ item.date }}</span>
          </template>
        </BaseTable>
      </div>

      <!-- Quick Actions and Mini Chart -->
      <div class="lg:col-span-4 space-y-8">
        <BaseCard title="Performance" class="bg-primary-dark text-white overflow-hidden border-none shadow-xl shadow-primary/20">
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-white/50 text-xs font-bold uppercase tracking-widest">Monthly Earning</p>
                <p class="text-4xl font-serif font-bold text-white mt-1">$12,450</p>
              </div>
              <div class="p-3 bg-secondary rounded-2xl shadow-lg shadow-secondary/20">
                <CurrencyDollarIcon class="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-white/60 uppercase">Progress to Target</span>
                <span class="text-secondary">83%</span>
              </div>
              <div class="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div class="bg-secondary h-full w-[83%] rounded-full shadow-[0_0_12px_rgba(50,180,4,0.4)]"></div>
              </div>
              <p class="text-[10px] text-white/40 flex items-center">
                <InformationCircleIcon class="h-3 w-3 mr-1" /> Almost there! $2,550 more to hit your goal.
              </p>
            </div>
          </div>
        </BaseCard>

        <BaseCard title="Quick Actions">
          <template #header>
            <h3 class="font-serif font-bold text-primary-dark">Quick Actions</h3>
          </template>
          <div class="grid grid-cols-2 gap-3">
            <BaseButton variant="outline" size="sm" class="flex-col h-20 space-y-1 rounded-2xl group">
              <PlusCircleIcon class="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span class="text-[10px] font-bold uppercase">New Booking</span>
            </BaseButton>
            <BaseButton variant="outline" size="sm" class="flex-col h-20 space-y-1 rounded-2xl group">
              <UserPlusIcon class="h-6 w-6 text-secondary group-hover:scale-110 transition-transform" />
              <span class="text-[10px] font-bold uppercase">Add Client</span>
            </BaseButton>
            <BaseButton variant="outline" size="sm" class="flex-col h-20 space-y-1 rounded-2xl group">
              <DocumentChartBarIcon class="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
              <span class="text-[10px] font-bold uppercase">Reports</span>
            </BaseButton>
            <BaseButton variant="outline" size="sm" class="flex-col h-20 space-y-1 rounded-2xl group">
              <EnvelopeIcon class="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
              <span class="text-[10px] font-bold uppercase">Support</span>
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const bookingHeaders = [
  { key: 'service', label: 'Booking Details' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Revenue' },
  { key: 'date', label: 'Date' },
]

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,230',
    trend: '+12.5%',
    trendClass: 'text-secondary',
    icon: CurrencyDollarIcon,
    bgClass: 'bg-secondary/10',
    iconClass: 'text-secondary'
  },
  {
    name: 'Total Bookings',
    value: '128',
    trend: '+8.2%',
    trendClass: 'text-secondary',
    icon: TicketIcon,
    bgClass: 'bg-primary/10',
    iconClass: 'text-primary'
  },
  {
    name: 'Active Clients',
    value: '84',
    trend: '+14.1%',
    trendClass: 'text-secondary',
    icon: UsersIcon,
    bgClass: 'bg-blue-50',
    iconClass: 'text-blue-500'
  },
  {
    name: 'Success Rate',
    value: '98%',
    trend: '+0.2',
    trendClass: 'text-secondary',
    icon: StarIcon,
    bgClass: 'bg-yellow-50',
    iconClass: 'text-yellow-600'
  }
]

const recentBookings = [
  { id: 1, service: 'Luxury Suite - Hilton', reference: 'FB-82930', customer: 'Sarah Johnson', status: 'Confirmed', amount: '1,200', date: 'Feb 14, 2026' },
  { id: 2, service: 'Economy Flight to London', reference: 'FB-82931', customer: 'Michael Chen', status: 'Pending', amount: '850', date: 'Feb 14, 2026' },
  { id: 3, service: 'Full-size SUV Rental', reference: 'FB-82932', customer: 'David Smith', status: 'Cancelled', amount: '450', date: 'Feb 13, 2026' },
  { id: 4, service: 'Stay - Beach Resort', reference: 'FB-82933', customer: 'Emma Wilson', status: 'Confirmed', amount: '2,100', date: 'Feb 12, 2026' },
  { id: 5, service: 'Guided City Tour', reference: 'FB-82934', customer: 'James Brown', status: 'Confirmed', amount: '150', date: 'Feb 12, 2026' },
]

const statusClass = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-secondary/10 text-secondary border-secondary/20'
    case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}
</script>
