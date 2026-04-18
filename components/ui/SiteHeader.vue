<template>
  <header 
    :class="[
      'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-32px)] max-w-7xl',
      isScrolled 
        ? 'bg-white/70 backdrop-blur-2xl border border-white/20 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[24px]' 
        : 'bg-white/40 backdrop-blur-md border border-white/10 py-5 rounded-[28px]'
    ]"
  >
    <div class="px-8 lg:px-10">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group transition-all duration-500 hover:scale-105 active:scale-95">
          <div class="relative">
            <img src="@/assets/img/logo.png" class="w-auto h-9 lg:h-11 relative z-10" alt="Flybeth Logo" />
            <div class="absolute -inset-2 bg-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center bg-neutral-900/5 px-2 py-1.5 rounded-full border border-black/5">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="px-6 py-2.5 text-[14px] font-semibold text-primary-dark  hover:text-white hover:bg-neutral-900 rounded-full transition-all duration-500 relative"
            active-class="bg-neutral-900 !text-white"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center space-x-4">
          <template v-if="user">
            <div class="relative" ref="userMenuRef">
            <button 
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center bg-white/80 backdrop-blur-md border border-white py-1.5 pl-5 pr-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
              :class="{ 'ring-2 ring-primary/20 border-primary/20': isUserMenuOpen }"
            >
              <div class="flex flex-col items-end mr-4">
                <span class="text-[13px] font-bold text-primary-dark leading-tight">{{ user.firstName }} {{ user.lastName }}</span>
                <span class="text-[9px] font-black text-secondary   opacity-80">
                  {{ typeof user.role === 'object' ? user.role?.name : user.role }}
                </span>
              </div>
              <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 flex items-center justify-center border border-white shadow-sm overflow-hidden transition-transform group-hover:scale-105">
                 <img v-if="user.avatar" :src="user.avatar" class="w-full h-full object-cover" />
                 <span v-else class="text-[11px] font-bold text-secondary">{{ user.firstName?.charAt(0) }}</span>
              </div>
              <ChevronDownIcon 
                class="h-4 w-4 ml-2 text-primary-dark/40 transition-transform duration-300"
                :class="{ 'rotate-180': isUserMenuOpen }"
              />
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-1 scale-95"
            >
              <div 
                v-if="isUserMenuOpen" 
                class="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-3xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-[100]"
              >
                <div class="p-5 border-b border-gray-50 flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {{ user.firstName?.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <p class="text-[14px] font-bold text-gray-900 leading-tight">{{ user.firstName }} {{ user.lastName }}</p>
                    <p class="text-[11px] text-neutral-400 font-medium truncate">{{ user.email }}</p>
                  </div>
                </div>

                <div class="p-2">
                  <button 
                    @click="goTo('/dashboard')"
                    class="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div class="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                      <PresentationChartLineIcon class="h-5 w-5 text-gray-400 group-hover:text-primary" />
                    </div>
                    <span class="text-sm font-bold text-gray-700 group-hover:text-primary">Agent Dashboard</span>
                  </button>

                  <button 
                    @click="goTo('/dashboard/settings')"
                    class="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div class="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                      <UserCircleIcon class="h-5 w-5 text-gray-400 group-hover:text-secondary" />
                    </div>
                    <span class="text-sm font-bold text-gray-700 group-hover:text-secondary">Profile Settings</span>
                  </button>
                </div>

                <div class="p-2 border-t border-gray-50">
                  <button 
                    @click="handleLogout" 
                    class="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition-colors group"
                  >
                    <div class="w-10 h-10 rounded-xl bg-red-50/50 group-hover:bg-white flex items-center justify-center transition-colors">
                      <ArrowRightOnRectangleIcon class="h-5 w-5 text-red-400 group-hover:text-red-600" />
                    </div>
                    <span class="text-sm font-bold text-red-600">Secure Logout</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </template>
        <template v-else>
            <NuxtLink to="/auth/login" class="text-sm px-6 font-bold text-primary-dark hover:text-secondary transition-all duration-300">
              Sign In
            </NuxtLink>
            <BaseButton 
              to="/auth/register" 
              variant="primary" 
              size="sm" 
              class="!rounded-full px-8 py-3 bg-gradient-to-r from-primary to-primary-dark border-none hover:shadow-[0_10px_20px_-5px_rgba(25,33,81,0.3)] hover:-translate-y-0.5 transition-all text-white font-bold"
            >
              Get Started
            </BaseButton>
          </template>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-3 bg-neutral-50/50 backdrop-blur-sm text-primary-dark hover:bg-white rounded-full transition-all border border-black/5 active:scale-90"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </button>
      </nav>
    </div>

    <!-- Mobile Navigation Overlay -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-8 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-white/20 rounded-[32px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] p-8 space-y-8 overflow-hidden z-[60]">
        <!-- Animated Backdrop Shapes -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 blur-3xl rounded-full"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"></div>

        <div class="flex flex-col space-y-1 relative z-10">
          <NuxtLink 
            v-for="(item, idx) in navItems" 
            :key="item.path" 
            :to="item.path"
            @click="isMobileMenuOpen = false"
            class="text-base font-bold text-primary-dark p-4 rounded-2xl hover:bg-secondary/5 transition-all flex items-center justify-between group"
            :style="{ transitionDelay: `${idx * 50}ms` }"
          >
            {{ item.name }}
            <span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </NuxtLink>
        </div>

        <div class="pt-4 border-t border-neutral-100 relative z-10">
          <template v-if="user">
            <!-- Mobile User Profile & Quick Links -->
            <div class="space-y-4">
              <div class="flex items-center justify-between p-5 bg-neutral-900/5 rounded-[24px]">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-black/5 overflow-hidden">
                     <img v-if="user.avatar" :src="user.avatar" class="w-full h-full object-cover" />
                     <span v-else class="text font-bold text-secondary">{{ user.firstName?.charAt(0) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-base font-bold text-primary-dark leading-tight">{{ user.firstName }} {{ user.lastName }}</span>
                    <span class="text-[10px] font-black text-secondary  ">
                      {{ typeof user.role === 'object' ? user.role?.name : user.role }}
                    </span>
                  </div>
                </div>
                <button @click="handleLogout" class="p-4 bg-white text-red-500 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all">
                  <ArrowRightOnRectangleIcon class="h-6 w-6" />
                </button>
              </div>

              <div class="grid grid-cols-1 gap-2">
                <button 
                  @click="goTo('/dashboard')"
                  class="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-all group text-left"
                >
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <PresentationChartLineIcon class="h-5 w-5 text-primary" />
                  </div>
                  <span class="text-sm font-bold text-gray-700  ">Dashboard</span>
                </button>

                <button 
                  @click="goTo('/dashboard/settings')"
                  class="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-secondary/5 transition-all group text-left"
                >
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <UserCircleIcon class="h-5 w-5 text-secondary" />
                  </div>
                  <span class="text-sm font-bold text-gray-700  ">Profile Settings</span>
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-2 gap-4">
              <BaseButton to="/auth/login" variant="ghost" block class="!rounded-full font-bold" @click="isMobileMenuOpen = false">Sign In</BaseButton>
              <BaseButton to="/auth/register" variant="primary" block class="!rounded-full font-bold shadow-lg shadow-primary/20" @click="isMobileMenuOpen = false">Get Started</BaseButton>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useConfirmation } from '@/composables/core/useConfirmation'
import { onClickOutside } from '@vueuse/core'

const { user, logout } = useAuth()
const { confirm } = useConfirmation()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const userMenuRef = ref(null)
const router = useRouter()

const goTo = (path: string) => {
  isUserMenuOpen.value = false
  isMobileMenuOpen.value = false
  navigateTo(path)
}

onClickOutside(userMenuRef, () => {
  isUserMenuOpen.value = false
})

const handleLogout = async () => {
  const confirmed = await confirm({
    title: 'Leaving so soon?',
    message: 'Are you sure you want to sign out? We\'ll miss you while you\'re away. See you soon! ✈️',
    confirmText: 'Sign out',
    cancelText: 'Stay here',
    variant: 'primary'
  })

  if (confirmed) {
    // Clear localStorage auth data
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user_profile')

    logout()
    // Hard refresh to clear state and return to default logged-out view
    window.location.href = '/'
  }
}

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
/* Override the aggressive shadow removal for the navbar */
header {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05) !important;
}

.isScrolled {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05) !important;
}
</style>
