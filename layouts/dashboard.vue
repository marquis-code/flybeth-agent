<template>
  <div class="h-screen overflow-hidden bg-[#F8F9FA] flex font-sans text-neutral-800">
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
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
        <div class="flex items-center">
          <button @click="isMobileMenuOpen = true" class="lg:hidden p-2 mr-4 text-neutral/60 hover:text-primary transition-colors">
            <Bars3Icon class="h-6 w-6" />
          </button>
          <div>
            <h1 class="text-2xl  font-bold text-primary-dark leading-none capitalize">{{ currentPageTitle }}</h1>
            <p class="text-xs text-neutral/40 mt-1 font-medium hidden sm:block">Welcome back to your travel dashboard</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-5">
          <button @click="isSearchModalOpen = true" class="hidden sm:flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2.5 transition-all duration-300 w-40 lg:w-64 text-left border border-gray-200">
            <MagnifyingGlassIcon class="h-4 w-4 text-gray-500 mr-3" />
            <span class="text-xs text-gray-500 font-bold flex-grow tracking-wider">Search all records</span>
            <span class="text-[9px] text-gray-400 font-black px-1.5 py-0.5 bg-white rounded shadow-sm border border-gray-200">⌘K</span>
          </button>
          
          <button @click="isSearchModalOpen = true" class="sm:hidden p-2 text-neutral-500 hover:text-primary transition-colors">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          
          <button class="relative p-2.5 text-neutral-500 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200 group">
            <BellIcon class="h-6 w-6" />
            <span class="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
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
  { name: 'Bookings', href: '/dashboard/bookings', icon: TicketIcon, detail: 'Syncing your reservations' },
  { name: 'Travelers', href: '/dashboard/customers', icon: UsersIcon, detail: 'Loading traveler profiles' },
  { name: 'Insights', href: '/dashboard/reports', icon: ChartBarIcon, detail: 'Calculating agency performance' },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, detail: 'Managing account parameters' },
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
