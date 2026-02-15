<template>
  <div class="min-h-screen bg-[#F8F9FA] flex font-sans text-neutral">
    <!-- Desktop Sidebar -->
    <aside class="w-72 bg-primary-dark text-white flex-shrink-0 hidden lg:flex flex-col shadow-2xl z-20">
      <div class="p-8 flex items-center space-x-3">
        <div class="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
          <span class="text-white font-serif font-bold text-xl">F</span>
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-serif font-bold tracking-tight">flybeth</span>
          <span class="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full uppercase font-bold tracking-widest w-fit">Agent Portal</span>
        </div>
      </div>
      
      <nav class="mt-4 flex-grow px-4 space-y-1">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group"
          :class="[route.path === item.href ? 'bg-white/10 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5']"
        >
          <component 
            :is="item.icon" 
            class="h-5 w-5 mr-3 transition-colors duration-200"
            :class="[route.path === item.href ? 'text-secondary' : 'text-white/40 group-hover:text-white/80']"
          />
          {{ item.name }}
          <div v-if="route.path === item.href" class="ml-auto w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(50,180,4,0.6)]"></div>
        </NuxtLink>
      </nav>

      <div class="p-6 border-t border-white/5 space-y-4">
        <div class="bg-white/5 p-4 rounded-2xl flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold border border-secondary/20">
            JD
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-bold truncate">John Doe</span>
            <span class="text-[11px] text-white/40 truncate">Elite Travel Agency</span>
          </div>
        </div>
        <button @click="logout" class="flex items-center px-4 py-3 text-sm font-medium text-white/40 hover:text-white hover:bg-red-500/10 rounded-xl w-full transition-all duration-200 group">
          <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3 group-hover:text-red-400" />
          Logout
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
            <h1 class="text-2xl font-serif font-bold text-primary-dark leading-none capitalize">{{ currentPageTitle }}</h1>
            <p class="text-xs text-neutral/40 mt-1 font-medium hidden sm:block">Welcome back to your travel dashboard</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-5">
          <div class="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all duration-300">
            <MagnifyingGlassIcon class="h-4 w-4 text-neutral/30 mr-2" />
            <input type="text" placeholder="Search anything..." class="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-64 placeholder:text-neutral/30" />
          </div>
          
          <button class="relative p-2.5 text-neutral/50 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200 group">
            <BellIcon class="h-6 w-6" />
            <span class="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-6 lg:p-10 max-w-[1600px]">
        <slot />
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
        <BaseButton variant="ghost" block @click="logout" class="justify-start">
          <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3" />
          Logout
        </BaseButton>
      </template>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  HomeIcon, 
  TicketIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Bars3Icon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Bookings', href: '/dashboard/bookings', icon: TicketIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UsersIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

const currentPageTitle = computed(() => {
  const item = navigation.find(n => n.href === route.path)
  return item ? item.name : 'Dashboard'
})

const logout = () => {
  navigateTo('/')
}
</script>

<style scoped>
.router-link-active {
  /* Using standard class for active states in nav logic above */
}
</style>
