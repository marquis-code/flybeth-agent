<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold text-gray-900">Bookings</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">View and manage your traveler bookings</p>
      </div>
      <div class="flex items-center space-x-2">
         <button class="px-4 py-2 text-xs font-bold border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors" @click="showWizard = !showWizard">
            {{ showWizard ? 'Close Search' : 'Search for Trips' }}
         </button>
         <button class="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white hover:bg-black transition-colors" @click="navigateTo('/dashboard/bookings')">
            Manage Bookings
         </button>
      </div>
    </div>

    <!-- Collapsible Search -->
    <div v-if="showWizard" class="bg-gray-50 border border-gray-100 rounded-3xl p-6 animate-in slide-in-from-top duration-300">
      <div class="flex items-center gap-3 mb-6 p-1.5 bg-white border border-gray-100 rounded-2xl w-fit">
        <button 
          v-for="wt in wizardTabs" 
          :key="wt.name"
          @click="wizardTab = wt.name"
          class="px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
          :class="wizardTab === wt.name ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-900'"
        >
          {{ wt.label }}
        </button>
      </div>
      <div class="bg-white rounded-3xl p-12 border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
          <MagnifyingGlassIcon class="h-10 w-10 text-gray-100" />
          <div>
             <p class="text-[11px] font-black text-gray-900 uppercase tracking-widest">Search for {{ wizardTab }}</p>
             <p class="text-[10px] text-gray-400 font-medium">Use the global search or specific tabs to find inventory</p>
          </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
       <div class="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          <button 
            v-for="tab in serviceTabs" 
            :key="tab.name"
            @click="activeTab = tab.name"
            class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
            :class="activeTab === tab.name ? 'bg-primary/5 text-primary border border-primary/10' : 'text-gray-400 hover:text-gray-600 border border-transparent'"
          >
            {{ tab.label }}
          </button>
       </div>
       <div class="relative group w-full lg:w-80">
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="FIND BY PNR OR TRAVELER NAME..." 
            class="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold text-gray-900 outline-none focus:bg-white focus:border-primary transition-all shadow-sm"
          />
       </div>
    </div>

    <!-- Table -->
    <div class="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
       <div class="overflow-x-auto">
          <table class="w-full text-left">
             <thead>
                <tr class="bg-gray-50/50 border-b border-gray-100">
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Reference (PNR)</th>
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Traveler Name</th>
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Travel Type</th>
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Price Paid</th>
                   <th class="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Options</th>
                </tr>
             </thead>
             <tbody class="divide-y divide-gray-50">
                <tr v-if="loading" v-for="i in 8" :key="i" class="animate-pulse">
                   <td v-for="j in 6" :key="j" class="px-8 py-6"><div class="h-4 bg-gray-50 rounded w-full"></div></td>
                </tr>
                <tr v-else-if="!filteredBookings.length" class="text-center py-32">
                   <td colspan="6" class="py-32 text-center">
                      <div class="flex flex-col items-center justify-center max-w-xs mx-auto">
                         <div class="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <TicketIcon class="h-10 w-10 text-gray-200" />
                         </div>
                         <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">No Bookings Found</h3>
                         <p class="text-[10px] text-gray-400 mt-2 font-medium">No travel records matched your criteria.</p>
                      </div>
                   </td>
                </tr>
                <tr v-for="item in filteredBookings" :key="item._id" class="hover:bg-gray-50/50 transition-all group cursor-pointer" @click="handleSelect(item)">
                   <td class="px-8 py-5">
                      <div class="flex items-center space-x-3">
                         <div class="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 font-mono text-[10px] font-black text-gray-500 group-hover:bg-primary group-hover:text-white transition-all">
                            ID
                         </div>
                         <span class="font-mono text-xs font-black text-gray-900 tracking-tighter">{{ item.pnr }}</span>
                      </div>
                   </td>
                   <td class="px-8 py-5">
                      <div class="flex flex-col">
                         <span class="text-xs font-black text-gray-900 uppercase tracking-tight">{{ item.contactDetails?.name || 'Unknown' }}</span>
                         <span class="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{{ item.user?.email || item.contactDetails?.email }}</span>
                      </div>
                   </td>
                   <td class="px-8 py-5">
                      <div class="flex items-center gap-2">
                         <div class="p-1.5 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                            <component :is="getTypeIcon(item)" class="h-3.5 w-3.5 text-gray-400 group-hover:text-primary" />
                         </div>
                         <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">{{ getServiceType(item) }}</span>
                      </div>
                   </td>
                   <td class="px-8 py-5">
                      <span class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border transition-colors" :class="statusClass(item.status)">{{ item.status }}</span>
                   </td>
                   <td class="px-8 py-5 text-right">
                      <span class="text-sm font-black text-gray-900 tracking-tight">${{ item.pricing?.totalAmount?.toLocaleString() }}</span>
                   </td>
                   <td class="px-8 py-5 text-right">
                      <button class="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-gray-100">
                         <ChevronRightIcon class="h-4 w-4 text-gray-300 group-hover:text-primary" />
                      </button>
                   </td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  </div>

  <BaseSidedrawer :show="!!selectedBooking" :title="'Booking Details: ' + selectedBooking?.pnr" @close="selectedBooking = null" width="max-w-xl">
    <div v-if="selectedBooking" class="p-10 space-y-10">
       <div class="p-8 bg-gray-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-black/20">
          <div class="flex justify-between items-start">
             <div class="space-y-1.5">
                <p class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Traveler</p>
                <h4 class="text-2xl font-black tracking-tight uppercase">{{ selectedBooking.contactDetails?.name }}</h4>
             </div>
             <div class="text-right">
                <p class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Total Price</p>
                <p class="text-3xl font-black text-white tracking-tighter">${{ selectedBooking.pricing?.totalAmount?.toLocaleString() }}</p>
             </div>
          </div>
       </div>

       <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-3 p-5 bg-gray-50 rounded-3xl text-[10px] font-black uppercase tracking-widest" @click="handlePrint">
             <PrinterIcon class="h-4 w-4" />
             Print Ticket
          </button>
          <button class="flex items-center justify-center gap-3 p-5 bg-gray-50 rounded-3xl text-[10px] font-black uppercase tracking-widest">
             <EnvelopeIcon class="h-4 w-4" />
             Send Invoice
          </button>
       </div>

       <div class="space-y-8">
          <div v-if="selectedBooking.flights?.length" class="p-6 bg-gray-50 rounded-3xl border border-gray-100">
             <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Flights</h5>
             <div v-for="(f, i) in selectedBooking.flights" :key="i" class="flex justify-between items-center text-xs">
                <span>{{ f.flight?.flightNumber }} • {{ f.flight?.origin }} to {{ f.flight?.destination }}</span>
                <span>{{ formatDate(f.flight?.departureDate) }}</span>
             </div>
          </div>

          <div v-if="selectedBooking.stays?.length" class="p-6 bg-gray-50 rounded-3xl border border-gray-100">
             <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Hotels</h5>
             <div v-for="(s, i) in selectedBooking.stays" :key="i" class="flex justify-between items-center text-xs">
                <span>{{ s.stay?.name }}</span>
                <span>{{ formatDate(s.checkIn) }}</span>
             </div>
          </div>
       </div>

       <!-- Cancel -->
       <div class="pt-10 border-t border-gray-50">
          <button 
            v-if="selectedBooking.status !== 'CANCELLED'"
            class="w-full py-5 border-2 border-dashed border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-[2rem] hover:bg-rose-50 hover:border-rose-200 transition-all"
            @click="handleCancelRequest(selectedBooking)"
          >
             Cancel Entire Booking
          </button>
       </div>
    </div>
  </BaseSidedrawer>

  <BaseModal 
    :show="isVisible" 
    :title="options.title" 
    @close="handleCancel"
  >
    <div class="text-center py-4">
      <p class="text-xs font-bold text-gray-500 leading-relaxed">
        {{ options.message }}
      </p>
    </div>
    <template #footer>
      <div class="flex items-center space-x-2 w-full">
        <BaseButton v-if="options.cancelText" variant="ghost" block @click="handleCancel" class="text-xs">{{ options.cancelText }}</BaseButton>
        <BaseButton variant="primary" block @click="handleConfirm" class="text-xs">{{ options.confirmText }}</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useBookings } from "@/composables/modules/bookings/useBookings"
import { useUser } from "@/composables/modules/auth/user"
import { useConfirmation } from "@/composables/core/useConfirmation"
import { 
  PaperAirplaneIcon, BuildingOfficeIcon, TicketIcon, MagnifyingGlassIcon,
  ChevronRightIcon, PrinterIcon, EnvelopeIcon, KeyIcon, GiftIcon
} from "@heroicons/vue/24/outline"
import BaseModal from "@/components/ui/BaseModal.vue"
import BaseButton from "@/components/ui/BaseButton.vue"

definePageMeta({ layout: "dashboard" })

const { user } = useUser()
const { bookings: allBookings, fetchBookings, loading } = useBookings()
const { isVisible, options, handleConfirm, handleCancel, confirm } = useConfirmation()

const activeTab = ref("All")
const selectedBooking = ref<any>(null)
const showWizard = ref(false)
const wizardTab = ref("Flights")
const searchQuery = ref("")

watch(() => user.value?.tenantId, (newId) => { if (newId) fetchBookings() }, { immediate: true })

const wizardTabs = [
  { name: "Flights", label: "Flights" },
  { name: "Hotels", label: "Hotels" },
  { name: "Cars", label: "Car Rentals" },
  { name: "Transfers", label: "Transfers" },
]

const serviceTabs = [
  { name: "All", label: "Show All" },
  { name: "Flights", label: "Flights" },
  { name: "Stays", label: "Stays" },
  { name: "Cars", label: "Car Rentals" },
  { name: "Packages", label: "Packages" },
]

const filteredBookings = computed(() => {
  let data = allBookings.value || []
  if (activeTab.value !== "All") {
    data = data.filter((b: any) => {
      if (activeTab.value === "Flights" && b.flights?.length) return true
      if (activeTab.value === "Stays" && b.stays?.length) return true
      if (activeTab.value === "Cars" && b.cars?.length) return true
      if (activeTab.value === "Packages" && b.packageId) return true
      return false
    })
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter((b: any) => b.pnr?.toLowerCase().includes(q) || b.contactDetails?.name?.toLowerCase().includes(q))
  }
  return data
})

const getServiceType = (item: any) => {
  if (item.flights?.length) return "Flight"
  if (item.stays?.length) return "Hotel"
  if (item.cars?.length) return "Car Rental"
  if (item.packageId) return "Package"
  return "Service"
}

const getTypeIcon = (item: any) => {
  if (item.flights?.length) return PaperAirplaneIcon
  if (item.stays?.length) return BuildingOfficeIcon
  if (item.cars?.length) return KeyIcon
  return GiftIcon
}

const statusClass = (status: string) => {
  const s = status?.toLowerCase() || ""
  if (s === "confirmed" || s === "ticketed") return "bg-emerald-50 text-emerald-600 border-emerald-100"
  if (s === "pending") return "bg-amber-50 text-amber-600 border-amber-100"
  if (s === "cancelled") return "bg-rose-50 text-rose-600 border-rose-100"
  return "bg-gray-50 text-gray-400 border-gray-100"
}

const handleSelect = (booking: any) => { selectedBooking.value = booking }

const formatDate = (dateString: string) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString()
}

const handleCancelRequest = async (booking: any) => {
  const confirmed = await confirm({
    title: "Cancel Travel Booking?",
    message: `Are you sure you want to permanently cancel booking ${booking.pnr}? This action cannot be undone.`,
    confirmText: "Yes, Cancel it",
    cancelText: "Keep Booking"
  })
  if (confirmed) {
     // Cancel logic here
     showToast({ title: "Cancelled", message: "Booking cancellation request submitted", toastType: "success" })
  }
}

const handlePrint = () => { window.print() }
</script>
