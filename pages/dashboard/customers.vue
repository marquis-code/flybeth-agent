<template>
  <div class="space-y-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-4 border-b border-gray-200">
      <div class="space-y-1">
        <h2 class="text-4xl  text-primary-dark tracking-tight">Traveler database</h2>
        <p class="text-neutral/40 font-bold tracking-widest text-xs uppercase">Manage your traveler profiles</p>
      </div>
      <BaseButton variant="primary" class="shadow-sm py-4 px-10">
        Add a new traveler
      </BaseButton>
    </div>

    <!-- Search & Quick Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-3">
        <BaseCard :padding="false" class="border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-8 flex items-center space-x-6 bg-white relative">
            <div class="flex-grow relative group">
              <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral/30 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, email, or country..." 
                class="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all"
              />
            </div>
            <BaseButton variant="outline" class="h-[52px] border-gray-200  px-8">
              Advanced filter
            </BaseButton>
          </div>
        </BaseCard>
      </div>
      <BaseCard :padding="false" class="flex items-center justify-center bg-primary-dark text-white shadow-sm relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-dark to-black opacity-90"></div>
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
        
        <div class="p-6 text-center relative z-10">
          <p class="text-[9px]  text-white/40 tracking-[0.2em] mb-1">Global network</p>
          <p class="text-3xl  text-secondary tracking-tighter">{{ customers.length }} Travelers</p>
        </div>
      </BaseCard>
    </div>

    <!-- Customer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <BaseCard v-for="customer in customers" :key="customer.email" hover :padding="false" class="relative overflow-hidden group border border-gray-200 shadow-sm">
        <div class="p-10 flex flex-col items-center relative z-10">
          <div class="relative mb-8">
            <div class="h-24 w-24 rounded-[2rem] bg-gray-50 flex items-center justify-center text-primary-dark   text-4xl shadow-sm border border-gray-200 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-primary-dark group-hover:text-white">
              {{ customer.name[0] }}
            </div>
            <div class="absolute -bottom-1 -right-1 h-8 w-8 bg-secondary border-4 border-white rounded-2xl flex items-center justify-center">
              <StarIcon class="h-4 w-4 text-white" />
            </div>
          </div>
          
          <h3 class="text-2xl  text-primary-dark group-hover:text-primary transition-colors text-center tracking-tight">{{ customer.name }}</h3>
          <p class="text-xs text-neutral/30 font-bold tracking-widest mt-1 mb-8">{{ customer.email }}</p>
          
          <div class="w-full grid grid-cols-2 gap-4 mb-10">
            <div class="p-5 bg-gray-50/50 rounded-[1.5rem] border border-gray-200 text-center group-hover:bg-white transition-colors">
              <p class="text-[9px] text-neutral/30  tracking-widest mb-1">Bookings</p>
              <p class="text-xl  text-primary-dark">{{ customer.bookings }}</p>
            </div>
            <div class="p-5 bg-gray-50/50 rounded-[1.5rem] border border-gray-200 text-center group-hover:bg-white transition-colors">
              <p class="text-xl  text-secondary">${{ customer.spent }}</p>
            </div>
          </div>

          <div class="w-full space-y-3">
            <BaseButton variant="primary" size="md" block class="shadow-sm">Create booking</BaseButton>
            <div class="grid grid-cols-2 gap-3">
              <BaseButton variant="outline" size="md" block class="rounded-2xl border-gray-200 text-sm  tracking-widest">History</BaseButton>
              <BaseButton variant="outline" size="md" block class="rounded-2xl border-gray-200 text-sm  tracking-widest">Profile</BaseButton>
            </div>
          </div>
        </div>
        
        <!-- Subtle Background Accent -->
        <div class="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronRightIcon,
  StarIcon
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
