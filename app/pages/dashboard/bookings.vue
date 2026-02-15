<template>
  <div class="space-y-8">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 class="text-3xl font-serif font-bold text-primary-dark tracking-tight">Manage Bookings</h2>
      <BaseButton variant="primary" :icon="PlusIcon">Create New Booking</BaseButton>
    </div>

    <!-- Filters & Search -->
    <BaseCard :padding="false" class="border-none shadow-sm">
      <div class="p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
        <div class="md:col-span-5">
          <BaseInput 
            label="Search Reservations" 
            placeholder="Name, reference, or email..." 
            :icon="MagnifyingGlassIcon"
          />
        </div>
        <div class="md:col-span-3">
          <label class="block text-sm font-semibold text-primary/80 mb-1.5">Status</label>
          <select class="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-neutral focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all">
            <option>All Bookings</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-semibold text-primary/80 mb-1.5">Type</label>
          <select class="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-neutral focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all">
            <option>All Types</option>
            <option>Flights</option>
            <option>Stays</option>
            <option>Cars</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <BaseButton variant="outline" block :icon="FunnelIcon">Filters</BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Bookings Data -->
    <div class="space-y-4">
      <div class="flex items-center justify-between px-2">
        <span class="text-xs font-bold uppercase tracking-widest text-neutral/40">Showing {{ bookings.length }} results</span>
        <div class="flex items-center space-x-2">
          <BaseButton variant="ghost" size="sm" class="text-[10px] uppercase font-bold">Export CSV</BaseButton>
          <BaseButton variant="ghost" size="sm" class="text-[10px] uppercase font-bold">Bulk Actions</BaseButton>
        </div>
      </div>

      <BaseTable :headers="headers" :items="bookings">
        <template #reference="{ item }">
          <span class="font-mono text-xs font-bold text-primary/60 tracking-tighter">{{ item.reference }}</span>
        </template>
        <template #service="{ item }">
          <div class="flex items-center space-x-3">
            <div class="p-2 rounded-lg" :class="getTypeColor(item.service)">
              <component :is="getTypeIcon(item.service)" class="h-4 w-4" />
            </div>
            <span class="font-bold text-primary-dark underline decoration-secondary/30 decoration-2 underline-offset-4">{{ item.service }}</span>
          </div>
        </template>
        <template #customer="{ item }">
          <div class="flex flex-col">
            <span class="font-bold text-primary-dark">{{ item.customer }}</span>
            <span class="text-[10px] text-neutral/40 font-medium">{{ item.email }}</span>
          </div>
        </template>
        <template #status="{ item }">
          <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border" :class="statusClass(item.status)">
            {{ item.status }}
          </span>
        </template>
        <template #amount="{ item }">
          <span class="font-serif font-bold text-primary-dark text-lg">${{ item.amount }}</span>
        </template>
        <template #actions="{ item }">
          <div class="flex items-center justify-end space-x-2">
            <BaseButton variant="ghost" size="sm" @click="selectedBooking = item">View</BaseButton>
            <button class="p-2 hover:bg-gray-100 rounded-full transition-colors text-neutral/40 hover:text-primary">
              <EllipsisVerticalIcon class="h-5 w-5" />
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <!-- Booking Details Modal -->
    <BaseModal :show="!!selectedBooking" :title="'Booking Details: ' + selectedBooking?.reference" @close="selectedBooking = null">
      <div v-if="selectedBooking" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-xl">
            <p class="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">Customer</p>
            <p class="text-lg font-bold text-primary-dark">{{ selectedBooking.customer }}</p>
            <p class="text-sm text-neutral/60">{{ selectedBooking.email }}</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-xl">
            <p class="text-[10px] font-bold text-neutral/40 uppercase tracking-widest">Amount</p>
            <p class="text-3xl font-serif font-bold text-secondary">${{ selectedBooking.amount }}</p>
          </div>
        </div>
        
        <div class="space-y-2">
          <p class="text-sm font-bold text-primary-dark uppercase tracking-tight">Service Breakdown</p>
          <div class="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-primary/5 rounded-lg text-primary">
                <TicketIcon class="h-5 w-5" />
              </div>
              <span class="font-medium">{{ selectedBooking.service }}</span>
            </div>
            <span class="font-mono text-xs font-bold text-neutral/40 uppercase">{{ selectedBooking.date }}</span>
          </div>
        </div>

        <div class="p-4 border-l-4 border-secondary bg-secondary/5 rounded-r-xl">
          <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Agent Note</p>
          <p class="text-sm text-primary-dark font-medium italic">"VIP Customer - ensure airport pickup is confirmed 24h prior."</p>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="outline" @click="selectedBooking = null">Close</BaseButton>
        <BaseButton variant="primary">Download PDF</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  EllipsisVerticalIcon, 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  TicketIcon,
  EnvelopeIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const selectedBooking = ref(null)

const headers = [
  { key: 'reference', label: 'Ref' },
  { key: 'service', label: 'Service' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Total' },
  { key: 'actions', label: '' },
]

const getTypeIcon = (service: string) => {
  if (service.includes('Stay')) return TicketIcon
  if (service.includes('Flight')) return TicketIcon 
  return TicketIcon
}

const getTypeColor = (service: string) => {
  if (service.includes('Stay')) return 'bg-blue-50 text-blue-500'
  if (service.includes('Flight')) return 'bg-purple-50 text-purple-500'
  return 'bg-secondary/10 text-secondary'
}

const statusClass = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-secondary/10 text-secondary border-secondary/20'
    case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const bookings = [
  { id: 1, reference: 'FB-82930', service: 'Stay: Marriott Executive', customer: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Confirmed', amount: '1,200', date: 'Feb 14, 2026' },
  { id: 2, reference: 'FB-82931', service: 'Flight: JFK -> LHR', customer: 'Michael Chen', email: 'm.chen@example.com', status: 'Pending', amount: '850', date: 'Feb 14, 2026' },
  { id: 3, reference: 'FB-82932', service: 'Car: Tesla Model 3', customer: 'David Smith', email: 'd.smith@example.com', status: 'Cancelled', amount: '450', date: 'Feb 13, 2026' },
  { id: 4, reference: 'FB-82933', service: 'Stay: Hilton Paris', customer: 'Emma Wilson', email: 'emma.w@example.com', status: 'Confirmed', amount: '2,100', date: 'Feb 12, 2026' },
  { id: 5, reference: 'FB-82934', service: 'Experience: Louvre VIP', customer: 'James Brown', email: 'james.b@example.com', status: 'Confirmed', amount: '150', date: 'Feb 12, 2026' },
  { id: 6, reference: 'FB-82935', service: 'Stay: Grand Hyatt Tokyo', customer: 'Olivia White', email: 'olivia.w@example.com', status: 'Confirmed', amount: '3,450', date: 'Feb 11, 2026' },
]
</script>
