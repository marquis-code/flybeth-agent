<template>
  <div class="max-w-4xl space-y-10">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-primary-dark tracking-tight">Account settings</h2>
      <p class="text-neutral/60 mt-1 font-medium">Manage your agency details, security preferences, and account parameters.</p>
    </div>

    <!-- Agency Profile Section -->
    <BaseCard :padding="false" class="overflow-hidden border-none shadow-sm group">
      <div class="p-8 bg-primary/5 border-b border-gray-200 flex items-center space-x-5">
        <div class="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <BuildingOfficeIcon class="h-8 w-8" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-primary-dark">Agency profile</h3>
          <p class="text-xs font-bold text-neutral/40 tracking-widest">Public & internal details</p>
        </div>
      </div>
      
      <div class="p-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BaseInput label="Agency official name" value="Elite Travel Agency" :icon="BuildingOfficeIcon" />
          <BaseInput label="Administrative email" value="bookings@elitetravel.com" :icon="EnvelopeIcon" />
          <BaseInput label="Primary phone" value="+1 (555) 000-0000" :icon="PhoneIcon" />
          <BaseInput label="Company website" value="www.elitetravel.com" :icon="GlobeAltIcon" />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-bold text-primary/80 tracking-tight">Corporate address</label>
          <textarea 
            class="block w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-neutral focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all h-32"
            placeholder="123 Travel Way, Suite 100, New York, NY 10001"
          ></textarea>
        </div>
      </div>
      <div class="px-8 py-4 bg-gray-50/50 flex justify-end">
        <BaseButton variant="primary">Update profile</BaseButton>
      </div>
    </BaseCard>

    <!-- Security Section -->
    <BaseCard :padding="false" class="overflow-hidden border-none shadow-sm group">
      <div class="p-8 bg-red-50/30 border-b border-gray-200 flex items-center space-x-5">
        <div class="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300">
          <ShieldCheckIcon class="h-8 w-8" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-primary-dark">Security & privacy</h3>
          <p class="text-xs font-bold text-neutral/40 tracking-widest">Credentials management</p>
        </div>
      </div>
      <div class="p-8 space-y-8">
        <div class="max-w-md">
          <BaseInput label="Current password" type="password" placeholder="••••••••" :icon="LockClosedIcon" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BaseInput label="New secure password" type="password" placeholder="••••••••" :icon="LockClosedIcon" />
          <BaseInput label="Confirm new password" type="password" placeholder="••••••••" :icon="LockClosedIcon" />
        </div>
      </div>
      <div class="px-8 py-4 bg-gray-50/50 flex justify-end space-x-3">
        <BaseButton variant="outline">Cancel</BaseButton>
        <BaseButton variant="primary" class="bg-red-600 hover:bg-red-700 focus:ring-red-100">Reset password</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { 
  BuildingOfficeIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'dashboard'
})
</script>
