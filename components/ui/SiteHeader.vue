<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-neutral-100 py-4 shadow-sm' 
        : 'bg-white border-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group transition-transform hover:scale-105">
          <img src="@/assets/img/logo.png" class="w-auto h-10 lg:h-12" alt="Flybeth Logo" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-10">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-[15px] font-black tracking-tight text-primary-dark hover:text-secondary transition-all duration-300 relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center space-x-6">
          <NuxtLink to="/auth/login" class="text-[15px] font-black py-3 px-6 text-primary-dark hover:text-secondary transition-all duration-300">
            Sign In
          </NuxtLink>
          <BaseButton to="/auth/register" variant="primary" size="md" class="px-8 py-3.5 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Signup
          </BaseButton>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 text-primary-dark hover:bg-neutral-50 rounded-xl transition-colors"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="h-8 w-8" />
          <XMarkIcon v-else class="h-8 w-8" />
        </button>
      </nav>
    </div>

    <!-- Mobile Navigation Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-2xl p-6 space-y-6">
        <div class="flex flex-col space-y-4">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            @click="isMobileMenuOpen = false"
            class="text-lg font-black text-primary-dark border-b border-neutral-50 pb-4"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="flex flex-col space-y-4 pt-2">
          <BaseButton to="/auth/login" variant="outline" block size="lg" @click="isMobileMenuOpen = false">Sign In</BaseButton>
          <BaseButton to="/auth/register" variant="primary" block size="lg" @click="isMobileMenuOpen = false">Join Flybeth</BaseButton>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Solutions', path: '/solutions' },
  { name: 'Airlines', path: '/platform/airlines' },
  { name: 'Properties', path: '/platform/properties' },
  { name: 'Status', path: '/status' },
  { name: 'Help Center', path: '/help-center' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
