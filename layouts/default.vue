<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <SiteHeader />
    <main class="flex-grow pt-[88px] lg:pt-[104px]">
      <slot />
    </main>
    
    <!-- Footer Section -->
    <footer class="bg-neutral-900 py-20 mt-auto">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          <!-- Brand -->
          <div class="col-span-2 lg:col-span-2 space-y-8">
            <img src="@/assets/img/logo.png" class="h-10 w-auto brightness-0 invert" alt="Flybeth" />
            <p class="text-neutral-400 font-medium max-w-sm leading-relaxed">
              <strong>FLYBETH LLC</strong><br>
              1880 S Dairy Ashford Rd, Suite 207, Houston, TX 77077 United States.<br>
              <span class="block mt-2 font-bold text-white">+1 844 FLYBETH (359-2384)</span>
              <span class="block text-brand-orange font-medium">Hello@flybeth.com</span>
            </p>
          </div>

          <!-- Links -->
          <div v-for="(group, title) in footerLinks" :key="title" class="space-y-6">
            <h4 class="text-xs  text-white  ">{{ title }}</h4>
            <ul class="space-y-4">
              <li v-for="link in group" :key="link.name">
                <NuxtLink :to="link.path" class="text-[14px] text-neutral-500 hover:text-white transition-colors font-bold">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-xs font-bold text-neutral-600  ">© 2026 FLYBETH LLC. All rights reserved.</p>
          <div class="flex items-center space-x-8">
            <NuxtLink to="/terms" class="text-xs font-bold text-neutral-500 hover:text-white transition-colors  ">Terms</NuxtLink>
            <NuxtLink to="/privacy" class="text-xs font-bold text-neutral-500 hover:text-white transition-colors  ">Privacy</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- Global Confirmation Modal -->
    <BaseModal 
      :show="isVisible" 
      :title="options.title" 
      :size="'sm'"
      hideHeader
      @close="handleCancel"
    >
      <div class="text-center space-y-6 pt-4">
        <!-- Cute Icon Context -->
        <div class="flex justify-center">
          <div class="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center relative">
             <div class="absolute inset-0 bg-secondary/5 rounded-full animate-ping opacity-20"></div>
             <component 
               :is="options.title === 'Leaving so soon?' ? ArrowRightOnRectangleIcon : ExclamationTriangleIcon" 
               class="h-10 w-10 text-secondary" 
             />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-2xl font-black text-primary-dark ">{{ options.title }}</h3>
          <p class="text-[15px] font-medium text-neutral-500 leading-relaxed px-4">
            {{ options.message }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="grid grid-cols-2 gap-3 w-full">
          <BaseButton 
            v-if="options.cancelText"
            variant="ghost" 
            class="!rounded-2xl py-4 font-bold text-sm bg-neutral-100/50 hover:bg-neutral-100"
            @click="handleCancel"
          >
            {{ options.cancelText }}
          </BaseButton>
          <BaseButton 
            variant="secondary" 
            class="!rounded-2xl py-4 font-bold text-sm shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
            @click="handleConfirm"
          >
            {{ options.confirmText }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '~/components/ui/SiteHeader.vue'
import { useConfirmation } from '@/composables/core/useConfirmation'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { ArrowRightOnRectangleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const { isVisible, options, handleConfirm, handleCancel } = useConfirmation()

const footerLinks = {
  'Platform': [
    { name: 'Airlines', path: '/platform/airlines' },
    { name: 'Properties', path: '/platform/properties' },
    { name: 'Cars', path: '/platform/cars' },
    { name: 'B2B API', path: '/platform/api' }
  ],
  'Company': [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Security', path: '/security' },
    { name: 'Status', path: '/status' }
  ],
  'Support': [
    { name: 'Help Center', path: '/help-center' },
    { name: 'Contact', path: '/contact' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Pricing', path: '/pricing' }
  ]
}
</script>

<style>
/* Global scroll behavior */
html {
  scroll-behavior: smooth;
}
. { font-weight: 900; }
</style>
