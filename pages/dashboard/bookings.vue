<template>
  <div class="space-y-10">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-4 border-b border-gray-100">
      <div class="space-y-1">
        <h2 class="text-4xl font-black text-primary-dark tracking-tight">Manage reservations</h2>
        <p class="text-neutral/40 font-bold tracking-widest text-xs uppercase">Track and manage your bookings</p>
      </div>
      <BaseButton @click="showWizard = !showWizard" variant="primary" class="shadow-sm py-4 px-10 border border-primary/20">
        {{ showWizard ? 'Close search' : 'Start a new booking' }}
      </BaseButton>
    </div>

    <!-- Active Booking Engine -->
    <Transition name="slide-down">
      <div v-if="showWizard" class="w-full animate-in fade-in slide-in-from-top-4 duration-500">
        <FlightSearchWizard />
      </div>
    </Transition>

    <!-- Modern Tab Interface -->
    <div class="flex items-center space-x-2 p-1 bg-white rounded-full shadow-sm w-fit border border-gray-100 overflow-x-auto no-scrollbar">
      <button 
        v-for="tab in serviceTabs" 
        :key="tab.name"
        @click="activeTab = tab.name"
        class="flex items-center space-x-3 px-8 py-3.5 rounded-full transition-all duration-500 whitespace-nowrap group"
        :class="activeTab === tab.name ? 'bg-primary-dark text-white border border-primary-dark scale-105' : 'text-neutral/40 hover:text-primary hover:bg-primary/5'"
      >
        <component :is="tab.icon" class="h-4 w-4 transition-transform group-hover:scale-110" />
        <span class="text-sm font-black tracking-widest">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Filters & Search -->
    <BaseCard :padding="false" class="border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end bg-white relative">
        <div class="lg:col-span-5 relative group">
          <label class="text-sm font-black tracking-widest text-neutral/40 mb-3 block px-1 uppercase">Search all bookings</label>
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Passenger name, PNR, or loyalty ID..." 
              class="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>
        <div class="lg:col-span-3">
          <label class="text-sm font-black tracking-widest text-neutral/40 mb-3 block px-1 uppercase">Booking status</label>
          <select class="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer">
            <option>All operations</option>
            <option>Confirmed</option>
            <option>Pending validation</option>
            <option>On hold</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div class="lg:col-span-2">
          <label class="text-sm font-black tracking-widest text-neutral/40 mb-3 block px-1 uppercase">Sort by</label>
          <select class="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer">
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Value: High-low</option>
          </select>
        </div>
        <div class="lg:col-span-2">
          <BaseButton variant="outline" block class="h-[52px] border-gray-100 font-black">
            Full filters
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Bookings Table -->
    <div class="space-y-6">
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span class="text-sm font-black tracking-widest text-neutral/40 uppercase">Active bookings: {{ filteredBookings.length }} records</span>
        </div>
        <div class="flex items-center space-x-3">
          <button class="p-3 bg-white rounded-2xl border border-gray-100 text-neutral/40 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
            <ArrowDownTrayIcon class="h-4 w-4" />
          </button>
          <button class="p-3 bg-white rounded-2xl border border-gray-100 text-neutral/40 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
            <PrinterIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <BaseCard :padding="false" class="border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th v-for="header in headers" :key="header.key" class="px-10 py-6 text-sm font-black tracking-widest text-neutral/40">
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in filteredBookings" :key="item.id" class="hover:bg-primary/[0.02] transition-colors group">
                <td class="px-10 py-8">
                  <span class="font-mono text-[11px] font-black text-primary/40 tracking-wider group-hover:text-primary transition-colors cursor-copy">{{ item.reference }}</span>
                </td>
                <td class="px-10 py-8">
                  <div class="flex items-center space-x-5">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-primary relative overflow-hidden" :class="getTypeColor(item.service)">
                      <!-- Decorative inner shape -->
                      <div class="absolute inset-0 opacity-10 group-hover:scale-150 transition-transform duration-700 bg-current"></div>
                      <component :is="getTypeIcon(item.service)" class="h-6 w-6 relative z-10" />
                    </div>
                    <div class="flex flex-col">
                      <span class="font-black text-primary-dark group-hover:underline cursor-pointer decoration-secondary decoration-2 underline-offset-4">{{ item.service }}</span>
                      <span class="text-sm text-neutral/30 font-bold mt-1">Premium class</span>
                    </div>
                  </div>
                </td>
                <td class="px-10 py-8">
                  <div class="flex flex-col">
                    <span class="font-black text-primary-dark">{{ item.customer }}</span>
                    <span class="text-sm text-neutral/30 font-bold mt-1">{{ item.email }}</span>
                  </div>
                </td>
                <td class="px-10 py-8">
                  <span class="px-5 py-1.5 rounded-full text-[9px] font-black tracking-[0.15em] border border-current transition-all" :class="statusClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-10 py-8 text-right">
                  <div class="flex flex-col items-end">
                    <span class=" font-black text-primary-dark text-[22px] tracking-tighter">${{ item.amount }}</span>
                    <span class="text-sm text-neutral/30 font-bold mt-0.5">{{ item.date }}</span>
                  </div>
                </td>
                <td class="px-10 py-8 text-right">
                  <button @click="selectedBooking = item" class="p-3 hover:bg-primary/5 rounded-2xl text-primary/20 hover:text-primary transition-all group/btn">
                    <ChevronRightIcon class="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </div>

    <!-- Enhanced Detail Sidedrawer -->
    <BaseSidedrawer :show="!!selectedBooking" :title="'Booking ID: ' + selectedBooking?.reference" @close="selectedBooking = null" width="max-w-xl">
      <div v-if="selectedBooking" class="p-10 space-y-12">
        <!-- Top Visual Card -->
        <div class="bg-primary-dark rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div class="relative z-10 space-y-8">
            <div class="flex items-center justify-between">
              <h4 class="text-[11px] font-black tracking-[0.2em] text-white/40">Live status</h4>
              <span class="px-4 py-1.5 bg-secondary/20 text-secondary text-sm font-black tracking-widest rounded-full border border-secondary/30">
                Verified
              </span>
            </div>
            <div class="space-y-2">
              <p class="text-xs font-bold text-white/60">{{ selectedBooking.service }}</p>
              <h3 class="text-4xl  font-black tracking-tight leading-none">{{ selectedBooking.customer }}</h3>
            </div>
            <div class="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <p class="text-[9px] font-black tracking-widest text-white/30 uppercase">Total revenue</p>
                <p class="text-3xl font-black text-secondary">${{ selectedBooking.amount }}</p>
              </div>
              <div class="text-right">
                <p class="text-[9px] font-black tracking-widest text-white/30">Timeline</p>
                <p class="text-sm font-bold">{{ selectedBooking.date }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Technical Details Grid -->
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-2">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Global PNR</p>
            <p class="text-sm font-black text-primary-dark font-mono tracking-widest">FB-XM9283-{{ selectedBooking.id }}</p>
          </div>
          <div class="space-y-2 text-right">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Service channel</p>
            <p class="text-sm font-black text-primary-dark">GDS direct-node B</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Loyalty tier</p>
            <p class="text-sm font-black text-secondary">Elite platinum</p>
          </div>
          <div class="space-y-2 text-right">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Last sync</p>
            <p class="text-sm font-black text-primary-dark">{{ new Date().toLocaleTimeString() }}</p>
          </div>
        </div>

        <!-- Action Grid -->
        <div class="space-y-6">
          <h4 class="text-xs font-black tracking-widest text-primary-dark px-1 border-l-4 border-secondary ml-1">Critical protocols</h4>
          <div class="grid grid-cols-3 gap-4">
            <button class="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-primary-dark hover:text-white rounded-[2rem] transition-all duration-300 group">
              <PrinterIcon class="h-6 w-6 mb-3 text-primary group-hover:text-secondary" />
              <span class="text-[9px] font-black">Print</span>
            </button>
            <button class="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-primary-dark hover:text-white rounded-[2rem] transition-all duration-300 group">
              <EnvelopeIcon class="h-6 w-6 mb-3 text-blue-500 group-hover:text-white" />
              <span class="text-[9px] font-black">Share</span>
            </button>
            <button class="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-red-500 hover:text-white rounded-[2rem] transition-all duration-300 group">
              <XMarkIcon class="h-6 w-6 mb-3 text-red-500 group-hover:text-white" />
              <span class="text-[9px] font-black">Revoke</span>
            </button>
          </div>
        </div>

        <!-- Agent Commentary -->
        <div class="p-8 bg-secondary/5 border-l-8 border-secondary rounded-r-[2rem]">
          <p class="text-sm font-black text-secondary tracking-[0.2em] mb-2">Internal note</p>
          <p class="text-sm text-primary-dark font-medium leading-relaxed">
            "Priority client. Traveler requires express check-in and private lounge access for the London leg. Ensure all PNRs are synced with traveler's mobile app."
          </p>
        </div>
      </div>
      
      <template #footer>
        <div class="flex items-center space-x-4 p-4">
          <BaseButton variant="outline" @click="selectedBooking = null" class="flex-1">Stow profile</BaseButton>
          <BaseButton variant="primary" class="flex-1 shadow-sm">Execute sync</BaseButton>
        </div>
      </template>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FlightSearchWizard from '@/components/flights/FlightSearchWizard.vue'
import { 
  PaperAirplaneIcon,
  HomeModernIcon,
  KeyIcon,
  MapIcon,
  GiftIcon,
  MagnifyingGlassIcon, 
  EllipsisVerticalIcon, 
  PlusIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const activeTab = ref('All')
const selectedBooking = ref<any>(null)
const showWizard = ref(true)

const serviceTabs = [
  { name: 'All', label: 'Overview', icon: MapIcon },
  { name: 'Flights', label: 'Air Transit', icon: PaperAirplaneIcon },
  { name: 'Stays', label: 'Accommodations', icon: HomeModernIcon },
  { name: 'Cars', label: 'Ground Logistics', icon: KeyIcon },
  { name: 'Packages', label: 'Bundles', icon: GiftIcon },
]

const headers = [
  { key: 'reference', label: 'Protocol ID' },
  { key: 'service', label: 'Service profile' },
  { key: 'customer', label: 'Principal client' },
  { key: 'status', label: 'Lifecycle' },
  { key: 'amount', label: 'Yield' },
  { key: 'actions', label: '' },
]

const bookings = [
  { id: 1, reference: 'FLY-XM92A', service: 'Air Transit: Emirates First', customer: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Confirmed', amount: '8,200', date: 'Feb 14, 2026' },
  { id: 2, reference: 'FLY-XM92B', service: 'Air Transit: BA Club World', customer: 'Michael Chen', email: 'm.chen@example.com', status: 'Pending', amount: '4,850', date: 'Feb 14, 2026' },
  { id: 3, reference: 'FLY-XM92C', service: 'Ground Logistics: Tesla Plaid', customer: 'David Smith', email: 'd.smith@example.com', status: 'Cancelled', amount: '1,450', date: 'Feb 13, 2026' },
  { id: 4, reference: 'FLY-XM92D', service: 'Accommodations: Aman Tokyo', customer: 'Emma Wilson', email: 'emma.w@example.com', status: 'Confirmed', amount: '12,100', date: 'Feb 12, 2026' },
  { id: 5, reference: 'FLY-XM92E', service: 'Bundles: Maldives Escape', customer: 'James Brown', email: 'james.b@example.com', status: 'Confirmed', amount: '15,150', date: 'Feb 12, 2026' },
  { id: 6, reference: 'FLY-XM92F', service: 'Accommodations: Ritz Paris', customer: 'Olivia White', email: 'olivia.w@example.com', status: 'Confirmed', amount: '9,450', date: 'Feb 11, 2026' },
]

const filteredBookings = computed(() => {
  if (activeTab.value === 'All') return bookings
  return bookings.filter(b => b.service.includes(activeTab.value.slice(0, 3)))
})

const getTypeIcon = (service: string) => {
  if (service.includes('Stay') || service.includes('Acc')) return HomeModernIcon
  if (service.includes('Flight') || service.includes('Air')) return PaperAirplaneIcon
  if (service.includes('Car') || service.includes('Ground')) return KeyIcon
  return GiftIcon
}

const getTypeColor = (service: string) => {
  if (service.includes('Stay') || service.includes('Acc')) return 'text-blue-500 bg-blue-50/50'
  if (service.includes('Flight') || service.includes('Air')) return 'text-purple-500 bg-purple-50/50'
  if (service.includes('Car') || service.includes('Ground')) return 'text-orange-500 bg-orange-50/50'
  return 'text-secondary bg-secondary/10'
}

const statusClass = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'text-secondary bg-secondary/5 border-secondary/20'
    case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'Cancelled': return 'text-red-500 bg-red-50 border-red-100'
    default: return 'text-neutral/40 bg-gray-50 border-gray-200'
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
