<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-serif font-bold text-primary-dark tracking-tight">Client Portfolio</h2>
        <p class="text-neutral/60 mt-1 font-medium">Manage and view your active customers and their travel history.</p>
      </div>
      <BaseButton variant="primary" :icon="UserPlusIcon" size="lg">Add New Client</BaseButton>
    </div>

    <!-- Search & Quick Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3 flex items-center space-x-4">
        <div class="flex-grow">
          <BaseInput placeholder="Search by name, email, or country..." :icon="MagnifyingGlassIcon" />
        </div>
        <BaseButton variant="outline" :icon="FunnelIcon">Filter</BaseButton>
      </div>
      <BaseCard :padding="false" class="flex items-center justify-center bg-secondary/5 border-secondary/20">
        <div class="p-3 text-center">
          <p class="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Clients</p>
          <p class="text-2xl font-serif font-bold text-primary-dark">84 Total</p>
        </div>
      </BaseCard>
    </div>

    <!-- Customer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BaseCard v-for="customer in customers" :key="customer.email" hover class="relative overflow-hidden group">
        <div class="flex flex-col items-center pt-2">
          <div class="relative mb-5">
            <div class="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-serif font-bold text-3xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              {{ customer.name[0] }}
            </div>
            <div class="absolute -bottom-1 -right-1 h-6 w-6 bg-secondary border-4 border-white rounded-full shadow-sm"></div>
          </div>
          
          <h3 class="text-xl font-serif font-bold text-primary-dark group-hover:text-secondary transition-colors">{{ customer.name }}</h3>
          <p class="text-sm text-neutral/40 font-medium mb-6">{{ customer.email }}</p>
          
          <div class="w-full grid grid-cols-2 gap-3 mb-8">
            <div class="p-3 bg-gray-50/50 rounded-xl border border-gray-100 text-center">
              <p class="text-[9px] text-neutral/40 font-bold uppercase tracking-widest">Bookings</p>
              <p class="text-lg font-bold text-primary-dark">{{ customer.bookings }}</p>
            </div>
            <div class="p-3 bg-gray-50/50 rounded-xl border border-gray-100 text-center">
              <p class="text-[9px] text-neutral/40 font-bold uppercase tracking-widest">Revenue</p>
              <p class="text-lg font-bold text-secondary">${{ customer.spent }}</p>
            </div>
          </div>

          <div class="w-full flex flex-col space-y-2">
            <BaseButton variant="primary" size="sm" block>Create Booking</BaseButton>
            <div class="grid grid-cols-2 gap-2">
              <BaseButton variant="outline" size="sm" class="rounded-xl">History</BaseButton>
              <BaseButton variant="outline" size="sm" class="rounded-xl">Profile</BaseButton>
            </div>
          </div>
        </div>
        
        <!-- Subtle Background Accent -->
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})

const customers = [
  { name: 'Sarah Johnson', email: 'sarah.j@example.com', bookings: 12, spent: '14,200' },
  { name: 'Michael Chen', email: 'm.chen@example.com', bookings: 5, spent: '3,850' },
  { name: 'David Smith', email: 'd.smith@example.com', bookings: 8, spent: '6,400' },
  { name: 'Emma Wilson', email: 'emma.w@example.com', bookings: 3, spent: '2,100' },
  { name: 'James Brown', email: 'james.b@example.com', bookings: 1, spent: '150' },
  { name: 'Olivia White', email: 'olivia.w@example.com', bookings: 21, spent: '32,450' },
]
</script>
