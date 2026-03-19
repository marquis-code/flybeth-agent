<template>
  <div class="h-screen overflow-hidden bg-[#F0F2F5] flex font-sans text-neutral-800">
    <!-- Desktop Sidebar -->
    <aside class="w-72 bg-white flex-shrink-0 hidden lg:flex flex-col border-r border-gray-200 z-20 relative">
      <div class="p-8 pb-10 flex items-center space-x-4 relative z-10 border-b border-gray-100">
        <img src="@/assets/img/logo.png" class="h-10 w-auto" alt="Flybeth" />
        <div class="flex flex-col">
          <span class="text-xl font-black text-primary-dark tracking-tight leading-tight">flybeth</span>
          <span class="text-sm text-primary font-black tracking-[0.2em]">Agent portal</span>
        </div>
      </div>
      
      <nav class="mt-4 flex-grow px-6 space-y-2 relative z-10 pt-4">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="flex items-center px-5 py-4 text-xs font-bold tracking-widest rounded-xl transition-all duration-300 group relative"
          :class="[route.path === item.href ? 'bg-primary/5 text-primary font-black' : 'text-neutral-500 hover:text-primary hover:bg-gray-50']"
        >
          <component 
            :is="item.icon" 
            class="h-5 w-5 mr-4 transition-colors duration-300"
            :class="[route.path === item.href ? 'text-primary' : 'text-neutral-400 group-hover:text-primary']"
          />
          {{ item.name }}
          <div v-if="route.path === item.href" class="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
        </NuxtLink>
      </nav>

      <div class="p-6 border-t border-gray-100 space-y-4 bg-gray-50/50 mt-auto">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
            {{ user?.firstName?.[0] || 'A' }}{{ user?.lastName?.[0] || '' }}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-bold text-neutral-800 truncate">{{ user?.firstName }} {{ user?.lastName }}</span>
            <span class="text-sm text-neutral-500 font-bold tracking-wider truncate">Premium agent</span>
          </div>
        </div>
        <button @click="isLogoutModalOpen = true" class="flex items-center px-4 py-3 text-sm font-bold tracking-widest text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-300 group outline outline-1 outline-gray-200 hover:outline-red-100">
          <ArrowLeftOnRectangleIcon class="h-4 w-4 mr-3 group-hover:text-red-500" />
          Secure logout
        </button>
      </div>
    </aside>

    <!-- Mobile Header & Navigation Toggle -->
    <div class="flex-grow flex flex-col min-w-0">
      <header class="bg-white/90 backdrop-blur-xl border-b border-gray-100 h-24 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-30 shadow-sm shadow-gray-200/50">
        <!-- Decoration for Premium Feel -->
        <div class="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        
        <div class="flex items-center">
          <button @click="isMobileMenuOpen = true" class="lg:hidden p-3 mr-4 text-neutral-500 hover:text-primary hover:bg-gray-100 rounded-xl transition-all">
            <Bars3Icon class="h-6 w-6" />
          </button>
          <div class="space-y-0.5">
            <h1 class="text-3xl font-black text-primary-dark tracking-tight capitalize">{{ currentPageTitle }}</h1>
            <p class="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] hidden sm:block">Flybeth Agent Intelligence Portal</p>
          </div>
        </div>

        <div class="flex items-center space-x-6">
          <div class="hidden md:flex items-center space-x-8 mr-4">
            <div class="text-right">
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">System Status</p>
              <div class="flex items-center justify-end space-x-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span class="text-[10px] font-bold text-gray-900">Live API Node Active</span>
              </div>
            </div>
          </div>

          <button @click="isSearchModalOpen = true" class="hidden sm:flex items-center bg-gray-50 hover:bg-white rounded-2xl px-6 py-3.5 transition-all duration-300 w-48 lg:w-72 text-left border border-gray-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 group">
            <MagnifyingGlassIcon class="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors mr-4" />
            <span class="text-xs text-gray-400 font-bold flex-grow tracking-wider group-hover:text-gray-900 transition-colors">Global Search...</span>
            <span class="text-[9px] text-gray-400 font-black px-2 py-1 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:border-primary/20">⌘K</span>
          </button>
          
          <button @click="isSearchModalOpen = true" class="sm:hidden p-3 bg-gray-50 rounded-xl text-neutral-500 hover:text-primary transition-all">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          
          <button class="relative p-3.5 bg-gray-50 text-neutral-500 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all duration-300 group">
            <BellIcon class="h-6 w-6" />
            <span class="absolute top-3.5 right-3.5 h-3 w-3 bg-secondary border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-grow overflow-x-hidden overflow-y-auto no-scrollbar scroll-smooth relative">
        <!-- Navigation Loader -->
        <ServiceLoader 
          :show="isNavigating" 
          :service-title="navigationTitle"
          :service-detail="navigationDetail"
        />

        <div class="p-8 lg:p-12 max-w-[1600px] mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Sidedrawer Navigation -->
    <BaseSidedrawer :show="isMobileMenuOpen" title="Navigation" @close="isMobileMenuOpen = false">
      <div class="space-y-2">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          @click="isMobileMenuOpen = false"
          class="flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all"
          :class="[route.path === item.href ? 'bg-primary/5 text-primary border-l-4 border-secondary' : 'text-neutral hover:bg-gray-50']"
        >
          <component :is="item.icon" class="h-6 w-6 mr-4" :class="[route.path === item.href ? 'text-primary' : 'text-neutral/40']" />
          {{ item.name }}
        </NuxtLink>
      </div>
      
      <template #footer>
        <BaseButton variant="ghost" block @click="isLogoutModalOpen = true" class="justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
          <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3" />
          Logout
        </BaseButton>
      </template>
    </BaseSidedrawer>

    <!-- Logout Modal -->
    <div v-if="isLogoutModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" @click="isLogoutModalOpen = false"></div>
      <div class="relative bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl border border-gray-100 text-center space-y-6">
        <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
          <ArrowLeftOnRectangleIcon class="h-8 w-8" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Confirm logout</h3>
          <p class="text-sm text-gray-500">Are you sure you want to securely end your current session?</p>
        </div>
        <div class="flex space-x-3 pt-2">
          <button @click="isLogoutModalOpen = false" class="flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors">Cancel</button>
          <button @click="handleLogoutConfirm" class="flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20 transition-all">Logout</button>
        </div>
      </div>
    </div>

    <!-- Global Search Modal -->
    <div v-if="isSearchModalOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
      <div class="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" @click="isSearchModalOpen = false"></div>
      <div class="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[70vh]">
        <div class="p-6 border-b border-gray-100 flex items-center bg-gray-50/50">
          <MagnifyingGlassIcon class="h-6 w-6 text-gray-400 mr-4" />
          <div class="flex-grow">
            <AnimatedInput 
              v-model="globalSearchQuery"
              label="Search all platform records"
              autofocus
            />
          </div>
          <button @click="isSearchModalOpen = false" class="ml-4 text-sm font-bold tracking-wider text-gray-500 bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors">ESC</button>
        </div>
        <div class="p-8 text-center text-gray-400 h-64 flex flex-col items-center justify-center">
          <DocumentChartBarIcon class="h-12 w-12 text-gray-200 mb-4" />
          <p class="text-sm font-medium">Type to search your platform records...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUser } from '@/composables/modules/auth/user'
import { 
  HomeIcon, 
  TicketIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  DocumentChartBarIcon
} from '@heroicons/vue/24/outline'

import ServiceLoader from '@/components/ui/ServiceLoader.vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const route = useRoute()
const { user, logOut: logout } = useUser()
const isMobileMenuOpen = ref(false)

const isLogoutModalOpen = ref(false)
const isSearchModalOpen = ref(false)
const globalSearchQuery = ref('')

const handleLogoutConfirm = async () => {
  isLogoutModalOpen.value = false
  if (logout) await logout()
}

const isNavigating = ref(false)
const navigationTitle = ref('')
const navigationDetail = ref('')

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: HomeIcon, detail: 'Accessing platform overview' },
  { name: 'Bookings', href: '/dashboard/bookings', icon: TicketIcon, detail: 'Loading your bookings' },
  { name: 'Travelers', href: '/dashboard/customers', icon: UsersIcon, detail: 'Loading traveler profiles' },
  { name: 'Insights', href: '/dashboard/reports', icon: ChartBarIcon, detail: 'Loading performance data' },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, detail: 'Loading your settings' },
]

const currentPageTitle = computed(() => {
  const item = navigation.find(n => n.href === route.path)
  return item ? item.name : 'Dashboard'
})

// Trigger loader on route change
watch(() => route.path, (newPath) => {
  const item = navigation.find(n => n.href === newPath)
  if (item) {
    navigationTitle.value = item.name
    navigationDetail.value = item.detail
    isNavigating.value = true
    
    // Simulate loading for effect
    setTimeout(() => {
      isNavigating.value = false
    }, 1800)
  }
})
</script>

<style scoped>
/* Scoped styles for the dashboard layout */
</style>
