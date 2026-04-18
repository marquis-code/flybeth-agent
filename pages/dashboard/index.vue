<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 ">
          Welcome, <span class="text-primary">{{ user?.firstName || 'Agent' }}</span>
        </h2>
        <p class="text-xs text-gray-500 font-medium">
          See your bookings, customers, and how much you have earned today.
        </p>
      </div>
      <div class="flex items-center space-x-3">
        <button class="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors" @click="navigateTo('/dashboard/reports')">
          View Reports
        </button>
        <button class="px-4 py-2 text-xs font-bold rounded-lg bg-primary-dark text-white hover:bg-black transition-colors" @click="navigateTo('/dashboard/customers')">
          Add Traveler
        </button>
      </div>
    </div>

    <!-- Booking Links -->
    <div class="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-7 gap-3">
      <div 
        v-for="service in serviceWidgets" 
        :key="service.name"
        @click="navigateTo(service.href)"
        class="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-all group"
      >
        <div class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
          <component :is="service.icon" class="h-5 w-5 text-gray-400 group-hover:text-primary" />
        </div>
        <p class="text-[9px] font-bold   text-gray-600 group-hover:text-gray-900">{{ service.name }}</p>
      </div>
    </div>

    <!-- Earnings & Bookings Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.name" class="p-4 rounded-xl border border-gray-100 bg-white">
        <div class="flex items-center justify-between mb-3">
          <div class="p-2 rounded-lg bg-gray-50 text-gray-400">
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
        </div>
        <div>
          <h3 class="text-[10px] font-bold text-gray-400   mb-1">{{ stat.name }}</h3>
          <p class="text-xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Recent Bookings Table -->
      <div class="lg:col-span-8 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-gray-900  ">Recent Bookings</h3>
          <NuxtLink to="/dashboard/bookings" class="text-xs font-bold text-primary hover:underline">See All</NuxtLink>
        </div>
        
        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50/50 border-b border-gray-100">
                  <th v-for="header in bookingHeaders" :key="header.key" class="px-4 py-3 text-[10px] font-bold   text-gray-400">
                    {{ header.label }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                   <td v-for="j in 5" :key="j" class="px-4 py-4"><div class="h-4 bg-gray-50 rounded"></div></td>
                </tr>
                <tr v-else-if="!bookings.length" class="text-center py-12">
                   <td colspan="5" class="py-12 text-center">
                      <p class="text-xs font-bold text-gray-400  ">No bookings yet</p>
                   </td>
                </tr>
                <tr v-for="item in bookings.slice(0, 8)" :key="item._id" class="hover:bg-gray-50 transition-colors group cursor-pointer" @click="handleBookingClick(item)">
                  <td class="px-4 py-3">
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors">{{ getServiceDescription(item) }}</span>
                      <span class="text-[9px] text-gray-400 font-bold  ">{{ item.pnr }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-medium text-gray-700">{{ item.contactDetails.name || 'No Name' }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-0.5 rounded-full text-[9px] font-bold   border" :class="statusClass(item.status)">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-xs font-bold text-gray-900">${{ item.pricing?.totalAmount?.toLocaleString() }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-[10px] font-medium text-gray-400">{{ formatDate(item.createdAt) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Side Section -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-primary-dark text-white p-6 rounded-xl relative overflow-hidden">
           <div class="absolute -right-8 -bottom-8 opacity-10">
              <CurrencyDollarIcon class="h-32 w-32" />
           </div>
           <p class="text-[10px] font-bold   text-white/50 mb-4">Total Money Earned</p>
           <h4 class="text-3xl font-bold mb-1">${{ totalEarnings.toLocaleString() }}</h4>
           <div class="flex items-center space-x-2 text-[10px] font-bold text-white/50">
              <span class="text-emerald-400">+12%</span>
              <span>more than last month</span>
           </div>
           <button class="mt-6 w-full py-2 bg-white text-primary-dark text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors" @click="navigateTo('/dashboard/reports')">
              See Reports
           </button>
        </div>

        <!-- Quick Links -->
        <div class="bg-white border border-gray-100 p-6 rounded-xl space-y-4">
           <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ">Quick Actions</h3>
           <div class="grid grid-cols-2 gap-3">
              <button 
                v-for="action in quickActions" 
                :key="action.name"
                @click="action.handler"
                class="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-lg hover:border-primary transition-all group"
              >
                 <component :is="action.icon" class="h-5 w-5 text-gray-400 group-hover:text-primary mb-1.5" />
                 <span class="text-[9px] font-bold text-gray-600 group-hover:text-gray-900  ">{{ action.name }}</span>
              </button>
           </div>
        </div>

        <!-- Notifications -->
        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden">
           <div class="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ">Recent Alerts</h3>
              <div v-if="unreadCount > 0" class="px-1.5 py-0.5 bg-rose-500 text-white text-[8px] font-black rounded">{{ unreadCount }}</div>
           </div>
           <div class="divide-y divide-gray-50 max-h-[400px] overflow-y-auto no-scrollbar">
              <div v-if="!notifications.length" class="p-8 text-center text-gray-400">
                 <p class="text-[10px] font-bold uppercase tracking-widest ">No alerts</p>
              </div>
              <div v-for="n in notifications.slice(0, 5)" :key="n._id" class="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                 <div class="flex items-start space-x-3">
                    <div class="h-2 w-2 rounded-full mt-1.5" :class="n.isRead ? 'bg-transparent' : 'bg-primary'"></div>
                    <div class="flex-grow">
                       <p class="text-[11px] font-bold text-gray-800">{{ n.title }}</p>
                       <p class="text-[9px] text-gray-500 line-clamp-2 mt-0.5">{{ n.message }}</p>
                       <span class="text-[8px] text-gray-400 font-bold uppercase mt-2 block">{{ formatDate(n.createdAt) }}</span>
                    </div>
                 </div>
              </div>
           </div>
           <div class="p-3 bg-gray-50/50 text-center border-t border-gray-100">
              <button class="text-[9px] font-bold text-primary hover:underline uppercase tracking-widest" @click="navigateTo('/dashboard/notifications')">View All Notifications</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useBookings } from '@/composables/modules/bookings/useBookings'
import { useUser } from '@/composables/modules/auth/user'
import { useConfirmation } from '@/composables/core/useConfirmation'
import { useNotifications } from '@/composables/core/useNotifications'
import { useAgentStats } from '@/composables/modules/analytics/useAgentStats'
import { 
  CurrencyDollarIcon, 
  TicketIcon, 
  UsersIcon, 
  StarIcon,
  PlusCircleIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  TruckIcon,
  KeyIcon,
  GiftIcon,
  GlobeAltIcon,
  ArrowUpRightIcon,
  PlusIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()
const { bookings, fetchBookings, loading: bookingsLoading } = useBookings()
const { statsData, fetchStats, loading: statsLoading } = useAgentStats()
const { notifications, fetchNotifications, unreadCount, fetchUnreadCount } = useNotifications()
const { confirm } = useConfirmation()

const loading = computed(() => bookingsLoading.value || statsLoading.value)

watch(() => user.value?.tenantId, (newId) => {
  if (newId) {
    fetchBookings({ limit: 8 })
    fetchStats()
    fetchNotifications()
    fetchUnreadCount()
  }
}, { immediate: true })

const serviceWidgets = [
  { name: 'Hotels', href: '/dashboard/stays', icon: BuildingOfficeIcon },
  { name: 'Flights', href: '/dashboard/flights', icon: PaperAirplaneIcon },
  { name: 'Transfers', href: '/dashboard/transfers', icon: TruckIcon },
  { name: 'Activities', href: '/dashboard/things-to-do', icon: TicketIcon },
  { name: 'Cars', href: '/dashboard/cars', icon: KeyIcon },
  { name: 'Packages', href: '/dashboard/packages', icon: GiftIcon },
  { name: 'Cruises', href: '/dashboard/cruises', icon: GlobeAltIcon },
]

const quickActions = [
  { name: 'New Booking', icon: PlusCircleIcon, handler: () => navigateTo('/dashboard/bookings') },
  { name: 'Add Traveler', icon: UserPlusIcon, handler: () => navigateTo('/dashboard/customers') },
  { name: 'Reports', icon: DocumentChartBarIcon, handler: () => navigateTo('/dashboard/reports') },
  { name: 'Send Email', icon: EnvelopeIcon, handler: () => navigateTo('/dashboard/marketing') }
]

const stats = computed(() => [
  {
    name: 'Money Earned',
    value: statsData.value ? `$${statsData.value.totalRevenue.toLocaleString()}` : '$0',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Active Bookings',
    value: statsData.value?.activeBookings.toLocaleString() || '0',
    icon: TicketIcon
  },
  {
    name: 'Total Bookings',
    value: statsData.value?.totalBookings.toLocaleString() || '0',
    icon: GiftIcon
  },
  {
    name: 'Your Status',
    value: user.value?.agentStatus || 'Active',
    icon: StarIcon
  }
])

const bookingHeaders = [
  { key: 'service', label: 'What was Booked' },
  { key: 'customer', label: 'Traveler Name' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Total Price' },
  { key: 'date', label: 'Date booked' },
]

const totalEarnings = computed(() => statsData.value?.totalRevenue || 0)

onMounted(async () => {
  if (user.value?.tenantId) {
    Promise.all([
      fetchBookings({ limit: 10 }),
      fetchStats(),
      fetchNotifications(),
      fetchUnreadCount()
    ])
  }
})

const getServiceDescription = (item: any) => {
  if (item.flights?.length) return `Flight to ${item.flights[0].flight?.destination || 'Destination'}`
  if (item.stays?.length) return `Hotel: ${item.stays[0].stay?.name || 'Hotel'}`
  if (item.cars?.length) return `Car: ${item.cars[0].car?.brand || 'Rental'}`
  return 'Travel Booking'
}

const statusClass = (status: string) => {
  const s = status?.toLowerCase() || ''
  if (s === 'confirmed' || s === 'ticketed') return 'text-emerald-600 bg-emerald-50 border-emerald-100'
  if (s === 'pending') return 'text-amber-600 bg-amber-50 border-amber-100'
  if (s === 'cancelled') return 'text-rose-600 bg-rose-50 border-rose-100'
  return 'text-gray-400 bg-gray-50 border-gray-100'
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const handleBookingClick = (booking: any) => {
  console.log('Booking details:', booking)
}
</script>
