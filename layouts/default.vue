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
              Empowering the next generation of travel businesses with premium inventory and cutting-edge booking technology.
            </p>
          </div>

          <!-- Links -->
          <div v-for="(group, title) in footerLinks" :key="title" class="space-y-6">
            <h4 class="text-xs font-black text-white uppercase tracking-[0.2em]">{{ title }}</h4>
            <ul class="space-y-4">
              <li v-for="link in group" :key="link.name">
                <NuxtLink :to="link.path" class="text-[14px] text-neutral-500 hover:text-white transition-colors font-bold">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-xs font-bold text-neutral-600 tracking-wider uppercase">© 2026 Flybeth B2B. All rights reserved.</p>
          <div class="flex items-center space-x-8">
            <NuxtLink to="/terms" class="text-xs font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Terms</NuxtLink>
            <NuxtLink to="/privacy" class="text-xs font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Privacy</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '~/components/ui/SiteHeader.vue'

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
.font-black { font-weight: 900; }
</style>
