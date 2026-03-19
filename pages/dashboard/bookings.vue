<template>
  <div class="space-y-10">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-4 border-b border-gray-200">
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
        <FlightSearchWizard v-if="wizardTab === 'Flights'" />
        <CarSearchWizard v-else-if="wizardTab === 'Cars'" />
        <ActivitySearchWizard v-else-if="wizardTab === 'Activities'" />
        <TransferSearchWizard v-else-if="wizardTab === 'Transfers'" />
        <FlightSearchWizard v-else />

        <!-- Wizard Tab Switcher -->
        <div class="flex items-center justify-center space-x-2 mt-4">
          <button
            v-for="wt in wizardTabs"
            :key="wt.name"
            @click="wizardTab = wt.name"
            class="px-5 py-2 text-xs font-black tracking-wider rounded-full border transition-all"
            :class="wizardTab === wt.name ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-neutral-500 border-neutral-200 hover:border-primary/30 hover:text-primary'"
          >
            {{ wt.label }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Modern Tab Interface -->
    <div class="flex items-center space-x-2 p-1 bg-white rounded-full shadow-sm w-fit border border-gray-200 overflow-x-auto no-scrollbar">
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
    <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
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
          <BaseButton variant="outline" block class="h-[52px] border-gray-200 font-black">
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
          <button class="p-3 bg-white rounded-2xl border border-gray-200 text-neutral/40 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
            <ArrowDownTrayIcon class="h-4 w-4" />
          </button>
          <button class="p-3 bg-white rounded-2xl border border-gray-200 text-neutral/40 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
            <PrinterIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-200">
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
                      <span class="text-sm text-neutral/30 font-bold mt-1">Standard booking</span>
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
              <h4 class="text-[11px] font-black tracking-[0.2em] text-white/40">Booking status</h4>
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
            <p class="text-sm font-black text-neutral/30 tracking-widest">Booking reference</p>
            <p class="text-sm font-black text-primary-dark font-mono tracking-widest">FB-XM9283-{{ selectedBooking.id }}</p>
          </div>
          <div class="space-y-2 text-right">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Booking source</p>
            <p class="text-sm font-black text-primary-dark">Online booking</p>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Customer tier</p>
            <p class="text-sm font-black text-secondary">Premium</p>
          </div>
          <div class="space-y-2 text-right">
            <p class="text-sm font-black text-neutral/30 tracking-widest">Last updated</p>
            <p class="text-sm font-black text-primary-dark">{{ new Date().toLocaleTimeString() }}</p>
          </div>
        </div>

        <!-- Action Grid -->
        <div class="space-y-6">
          <h4 class="text-xs font-black tracking-widest text-primary-dark px-1 border-l-4 border-secondary ml-1">Actions</h4>
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
              <span class="text-[9px] font-black">Cancel</span>
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
          <BaseButton variant="outline" @click="selectedBooking = null" class="flex-1">Close</BaseButton>
          <BaseButton variant="primary" class="flex-1">Sync booking</BaseButton>
        </div>
      </template>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookings } from '@/composables/modules/bookings/useBookings'
import FlightSearchWizard from '@/components/flights/FlightSearchWizard.vue'
import CarSearchWizard from '@/components/cars/CarSearchWizard.vue'
import ActivitySearchWizard from '@/components/activities/ActivitySearchWizard.vue'
import TransferSearchWizard from '@/components/transfers/TransferSearchWizard.vue'
import { 
  PaperAirplaneIcon,
  HomeModernIcon,
  KeyIcon,
  MapIcon,
  GiftIcon,
  TruckIcon,
  SparklesIcon as SparklesTabIcon,
  ArrowsRightLeftIcon,
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
const showWizard = ref(false)
const wizardTab = ref('Flights')

const { bookings: allBookings, fetchBookings, loading } = useBookings()

onMounted(() => {
  fetchBookings()
})

const wizardTabs = [
  { name: 'Flights', label: 'Flights' },
  { name: 'Cars', label: 'Cars' },
  { name: 'Activities', label: 'Activities' },
  { name: 'Transfers', label: 'Transfers' },
]

const serviceTabs = [
  { name: 'All', label: 'Overview', icon: MapIcon },
  { name: 'Flights', label: 'Flights', icon: PaperAirplaneIcon },
  { name: 'Stays', label: 'Stays', icon: HomeModernIcon },
  { name: 'Cars', label: 'Car Rentals', icon: TruckIcon },
  { name: 'Activities', label: 'Activities', icon: SparklesTabIcon },
  { name: 'Transfers', label: 'Transfers', icon: ArrowsRightLeftIcon },
  { name: 'Packages', label: 'Bundles', icon: GiftIcon },
]

const headers = [
  { key: 'reference', label: 'Booking ID' },
  { key: 'service', label: 'Service' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount' },
  { key: 'actions', label: '' },
]

const filteredBookings = computed(() => {
  const data = allBookings.value || []
  if (activeTab.value === 'All') return data
  
  return data.filter((b: any) => {
    if (activeTab.value === 'Flights' && b.flights?.length) return true
    if (activeTab.value === 'Stays' && b.stays?.length) return true
    if (activeTab.value === 'Cars' && b.cars?.length) return true
    if (activeTab.value === 'Activities' && b.activities?.length) return true
    if (activeTab.value === 'Transfers' && b.transfers?.length) return true
    if (activeTab.value === 'Packages' && b.packageId) return true
    return false
  })
})

const getServiceDescription = (item: any) => {
  if (item.flights?.length) return `Flight: ${item.flights[0].flight?.airline || 'Airline'} (${item.flights[0].flight?.origin} - ${item.flights[0].flight?.destination})`
  if (item.stays?.length) return `Stay: ${item.stays[0].stay?.name || 'Hotel'}`
  if (item.cars?.length) return `Car: ${item.cars[0].car?.brand || 'Rental'}`
  return 'Custom Package'
}

const getTypeIcon = (item: any) => {
  if (item.stays?.length) return HomeModernIcon
  if (item.flights?.length) return PaperAirplaneIcon
  if (item.cars?.length) return KeyIcon
  return GiftIcon
}

const getTypeColor = (item: any) => {
  if (item.stays?.length) return 'text-blue-500 bg-blue-50/50'
  if (item.flights?.length) return 'text-purple-500 bg-purple-50/50'
  if (item.cars?.length) return 'text-orange-500 bg-orange-50/50'
  return 'text-secondary bg-secondary/10'
}

const statusClass = (status: string) => {
  if (!status) return 'text-neutral/40 bg-gray-50 border-gray-200'
  const s = status.toLowerCase()
  if (s === 'confirmed' || s === 'ticketed') return 'text-secondary bg-secondary/5 border-secondary/20'
  if (s === 'pending') return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  if (s === 'cancelled') return 'text-red-500 bg-red-50 border-red-100'
  return 'text-neutral/40 bg-gray-50 border-gray-200'
}

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
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
