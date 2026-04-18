<template>
  <div class="h-screen overflow-hidden bg-[#F8F9FA] flex font-sans text-neutral-800">
    <!-- Desktop Sidebar -->
    <aside class="w-64 bg-white flex-shrink-0 hidden lg:flex flex-col border-r border-gray-200 z-20 relative">
      <div class="px-6 py-5 flex items-center space-x-3 border-b border-gray-50">
        <img src="@/assets/img/logo.png" class="h-8 w-auto" alt="Flybeth" />
        <!-- <div class="flex flex-col">
          <span class="text-lg font-bold text-primary-dark leading-tight">flybeth</span>
          <span class="text-[9px] text-primary font-bold">Agent portal</span>
        </div> -->
      </div>
      
      <nav class="flex-grow px-4 space-y-0.5 overflow-y-auto no-scrollbar py-4">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="flex items-center px-4 py-3.5 text-[14px] font-bold rounded-lg transition-all duration-200 group relative"
          :class="[
            route.path === item.href || (item.href !== '/dashboard' && route.path.startsWith(item.href)) ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          ]"
        >
          <component 
            :is="item.icon" 
            class="h-5 w-5 mr-4 transition-colors"
            :class="[route.path === item.href || (item.href !== '/dashboard' && route.path.startsWith(item.href)) ? 'text-primary' : 'text-gray-400 group-hover:text-primary']"
          />
          {{ item.name }}
          <div v-if="route.path === item.href || (item.href !== '/dashboard' && route.path.startsWith(item.href))" class="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-100 space-y-3 bg-gray-50/30 mt-auto">
        <div class="flex items-center space-x-3 px-2">
          <img v-if="user?.avatar" :src="user.avatar" class="h-8 w-8 rounded-lg object-cover" />
          <div v-else class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
            {{ user?.firstName?.[0] || 'A' }}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-gray-900 truncate">{{ user?.firstName }} {{ user?.lastName }}</span>
            <span class="text-[9px] text-gray-400 font-bold truncate">Travel Agent</span>
          </div>
        </div>
        <button @click="isLogoutModalOpen = true" class="flex items-center px-3 py-2 text-[10px] font-bold text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg w-full transition-all border border-gray-100 bg-white">
          <ArrowLeftOnRectangleIcon class="h-3.5 w-3.5 mr-2" />
          Logout
        </button>
      </div>
    </aside>

    <div class="flex-grow flex flex-col min-w-0">
      <header class="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
        <div class="flex items-center">
          <button @click="isMobileMenuOpen = true" class="lg:hidden p-2 mr-3 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-all">
            <Bars3Icon class="h-5 w-5" />
          </button>
          <div class="flex items-baseline space-x-3">
            <h1 class="text-xl font-bold text-gray-900 tracking-tight">{{ currentPageTitle }}</h1>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center space-x-6 mr-2">
            <div class="text-right">
              <div class="flex items-center justify-end space-x-2">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="text-[9px] font-bold text-gray-400">Connected</span>
              </div>
            </div>
          </div>

          <button @click="isSearchModalOpen = true" class="hidden sm:flex items-center bg-gray-50 hover:bg-white rounded-lg px-4 py-2 transition-all w-48 lg:w-64 border border-gray-100 hover:border-primary/20 group">
            <MagnifyingGlassIcon class="h-3.5 w-3.5 text-gray-400 group-hover:text-primary mr-3" />
            <span class="text-[11px] text-gray-400 font-medium flex-grow tracking-wide text-left">Search everything...</span>
            <span class="text-[8px] text-gray-400 px-1.5 py-0.5 border border-gray-200 rounded">⌘K</span>
          </button>
          
          <button @click="isSearchModalOpen = true" class="sm:hidden p-2 bg-gray-50 rounded-lg text-gray-500">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>
          
          <!-- Notifications -->
          <div class="relative">
            <button @click="isNotificationsOpen = !isNotificationsOpen" class="relative p-2.5 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all group">
              <BellIcon class="h-5 w-5" />
              <span v-if="unreadCount > 0" class="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 border-2 border-white rounded-full animate-bounce"></span>
            </button>
            <div v-if="isNotificationsOpen" class="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden">
               <div class="p-4 bg-white border-b border-gray-50 flex items-center justify-between">
                  <h4 class="text-xs font-bold text-gray-900">Notifications</h4>
                  <button @click="markAllAsRead" class="text-[9px] font-bold text-primary hover:underline">Mark all read</button>
               </div>
               <div class="max-h-80 overflow-y-auto custom-scrollbar">
                  <div v-if="notifications.length === 0" class="p-10 text-center text-gray-300">
                     <BellIcon class="h-8 w-8 mx-auto mb-2 opacity-20" />
                     <p class="text-[10px] uppercase font-bold tracking-widest">No New Alerts</p>
                  </div>
                  <div v-for="n in notifications" :key="n._id" @click="markAsRead(n._id)" class="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                     <div class="flex items-start space-x-3">
                        <div class="h-2 w-2 rounded-full mt-1.5 flex-shrink-0" :class="n.isRead ? 'bg-transparent' : 'bg-primary'"></div>
                        <div>
                           <p class="text-[11px] font-bold text-gray-800">{{ n.title }}</p>
                           <p class="text-[10px] text-gray-500 leading-snug my-1">{{ n.message }}</p>
                           <span class="text-[8px] font-bold text-gray-400 uppercase">{{ n.createdAt }}</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="p-3 bg-gray-50 border-t border-gray-100 text-center">
                  <button class="text-[10px] font-bold text-gray-500 hover:text-primary">View All</button>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-grow overflow-x-hidden overflow-y-auto no-scrollbar scroll-smooth relative">
        <ServiceLoader 
          :show="isNavigating" 
          :service-title="navigationTitle"
          :service-detail="navigationDetail"
        />

        <div v-if="user?.agentStatus === 'pending'" class="bg-amber-50 border-b border-amber-100 p-4 text-amber-900 flex items-center justify-between">
          <div class="flex items-center space-x-3">
             <InformationCircleIcon class="h-5 w-5 text-amber-500" />
             <p class="text-xs font-bold">Your account is being reviewed. Please wait for approval.</p>
          </div>
        </div>

        <div class="p-6 lg:p-10 max-w-[1600px] mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Navigation Drawer -->
    <BaseSidedrawer :show="isMobileMenuOpen" title="Menu" position="left" @close="isMobileMenuOpen = false">
      <div class="space-y-1">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          @click="isMobileMenuOpen = false"
          class="flex items-center px-4 py-3.5 text-sm font-bold rounded-lg transition-all"
          :class="[
            route.path === item.href || (item.href !== '/dashboard' && route.path.startsWith(item.href)) ? 'bg-primary/5 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 mr-4" :class="[route.path === item.href || (item.href !== '/dashboard' && route.path.startsWith(item.href)) ? 'text-primary' : 'text-neutral-400']" />
          {{ item.name }}
        </NuxtLink>
      </div>
      
      <template #footer>
        <button @click="isLogoutModalOpen = true" class="flex w-full items-center px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
          <ArrowLeftOnRectangleIcon class="h-5 w-5 mr-3" />
          Logout
        </button>
      </template>
    </BaseSidedrawer>

    <!-- Logout Confirmation -->
    <ConfirmModal
      v-model:visible="isLogoutModalOpen"
      variant="logout"
      title="Logout"
      message="Are you sure you want to log out?"
      confirmText="Logout"
      cancelText="Cancel"
      @confirm="handleLogoutConfirm"
    />

    <!-- Search Modal -->
    <div v-if="isSearchModalOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] p-4">
      <div class="absolute inset-0 bg-gray-900/10 backdrop-blur-sm" @click="closeSearch"></div>
      <div class="relative bg-white rounded-xl w-full max-w-xl border border-gray-100 overflow-hidden flex flex-col max-h-[70vh] shadow-2xl">
        <div class="p-4 border-b border-gray-100 flex items-center">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 mr-3" />
          <input 
            v-model="globalSearchQuery"
            placeholder="Search bookings or travelers..."
            class="flex-grow text-sm font-medium outline-none"
            autofocus
            @input="handleSearch"
          />
          <button @click="closeSearch" class="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">ESC</button>
        </div>
        
        <div v-if="isSearching" class="p-12 flex flex-col items-center">
           <div class="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
           <span class="mt-2 text-[9px] font-bold text-primary uppercase">Searching...</span>
        </div>
        
        <div v-else-if="searchResults.length > 0" class="overflow-y-auto no-scrollbar">
           <div v-for="(group, type) in groupedResults" :key="type" class="p-2">
              <h5 class="px-2 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 rounded">{{ type }}s</h5>
              <div v-for="res in group" :key="res.id" @click="handleResultClick(res)" class="p-3 hover:bg-primary/5 rounded-lg cursor-pointer flex items-center justify-between group transition-colors">
                 <div class="flex items-center space-x-3">
                    <div class="p-1.5 bg-white border border-gray-100 rounded-lg group-hover:border-primary/20 transition-colors">
                       <component :is="res.icon" class="h-4 w-4 text-primary" />
                    </div>
                    <div>
                       <p class="text-[11px] font-bold text-gray-800">{{ res.title }}</p>
                       <p class="text-[9px] text-gray-400 font-medium tracking-wide">{{ res.subtitle }}</p>
                    </div>
                 </div>
                 <ChevronRightIcon class="h-3 w-3 text-gray-300 group-hover:text-primary transition-colors" />
              </div>
           </div>
        </div>
        
        <div v-else-if="globalSearchQuery && !isSearching" class="p-16 text-center text-gray-400">
          <DocumentMagnifyingGlassIcon class="h-10 w-10 text-gray-50 mx-auto mb-3" />
          <p class="text-[10px] font-bold uppercase">No results for "{{ globalSearchQuery }}"</p>
        </div>
        
        <div v-else class="p-10 text-center text-gray-300">
           <MagnifyingGlassIcon class="h-10 w-10 mx-auto mb-3 opacity-10" />
           <p class="text-[10px] font-bold uppercase">Search for anything</p>
           <p class="text-[9px] mt-1">Type traveler names or booking IDs</p>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <BaseModal 
      :show="isVisible" 
      :title="options.title" 
      @close="handleCancel"
    >
      <div class="text-center py-4">
        <p class="text-xs font-bold text-gray-500 leading-relaxed">
          {{ options.message }}
        </p>
      </div>
      <template #footer>
        <div class="flex items-center space-x-2 w-full">
          <BaseButton v-if="options.cancelText" variant="ghost" block @click="handleCancel" class="text-xs">{{ options.cancelText }}</BaseButton>
          <BaseButton variant="primary" block @click="handleConfirm" class="text-xs">{{ options.confirmText }}</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUser } from '@/composables/modules/auth/user'
import { useConfirmation } from '@/composables/core/useConfirmation'
import { useNotifications } from '@/composables/core/useNotifications'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { 
  HomeIcon, 
  TicketIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  TruckIcon,
  KeyIcon,
  GiftIcon,
  GlobeAltIcon,
  MapIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  InformationCircleIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  SpeakerWaveIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/vue/24/outline'

import ServiceLoader from '@/components/ui/ServiceLoader.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usersApiFactory } from '@/api_factory/modules/users'
import { bookingsApiFactory } from '@/api_factory/modules/bookings'

const { isVisible, options, handleConfirm, handleCancel } = useConfirmation()

const route = useRoute()
const { user, logOut: logout } = useUser()
const { notifications, unreadCount, fetchNotifications, fetchUnreadCount, markAsRead, markAllAsRead } = useNotifications()

const isMobileMenuOpen = ref(false)
const isLogoutModalOpen = ref(false)
const isSearchModalOpen = ref(false)
const isNotificationsOpen = ref(false)
const globalSearchQuery = ref('')
const isSearching = ref(false)
const searchResults = ref([])

const handleLogoutConfirm = async () => {
  isLogoutModalOpen.value = false
  if (logout) await logout()
}

const isNavigating = ref(false)
const navigationTitle = ref('')
const navigationDetail = ref('')

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, detail: 'Summary', isDisabledIfPending: true },
  { name: 'Hotels', href: '/dashboard/stays', icon: BuildingOfficeIcon, detail: 'Hotel Bookings', isDisabledIfPending: true },
  { name: 'Flights', href: '/dashboard/flights', icon: PaperAirplaneIcon, detail: 'Flight Bookings', isDisabledIfPending: true },
  { name: 'Itineraries', href: '/dashboard/itineraries', icon: MapIcon, detail: 'Trip Plans', isDisabledIfPending: true },
  { name: 'Airport Pickup', href: '/dashboard/transfers', icon: TruckIcon, detail: 'Transfers', isDisabledIfPending: true },
  { name: 'Tours & Activities', href: '/dashboard/things-to-do', icon: TicketIcon, detail: 'Tours', isDisabledIfPending: true },
  { name: 'Car Rentals', href: '/dashboard/cars', icon: KeyIcon, detail: 'Car Inventory', isDisabledIfPending: true },
  { name: 'Vacation Packages', href: '/dashboard/packages', icon: GiftIcon, detail: 'Holiday Bundles', isDisabledIfPending: true },
  { name: 'Cruises', href: '/dashboard/cruises', icon: GlobeAltIcon, detail: 'Cruise Routes', isDisabledIfPending: true },
  { name: 'Bookings', href: '/dashboard/bookings', icon: TicketIcon, detail: 'Manage Bookings', isDisabledIfPending: true },
  { name: 'Travelers', href: '/dashboard/customers', icon: UsersIcon, detail: 'Your Customers', isDisabledIfPending: true },
  { name: 'Messages', href: '/dashboard/communications', icon: ChatBubbleBottomCenterTextIcon, detail: 'Chat with us', isDisabledIfPending: true },
  { name: 'Promotions', href: '/dashboard/marketing', icon: SpeakerWaveIcon, detail: 'Send Emails', isDisabledIfPending: true },
  { name: 'Finance', href: '/dashboard/finance', icon: BanknotesIcon, detail: 'Money & Earnings', isDisabledIfPending: true },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon, detail: 'Business Performance', isDisabledIfPending: true },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, detail: 'Your Account', isDisabledIfPending: true },
]

const currentPageTitle = computed(() => {
  const item = navigation.find(n => n.href === route.path)
  return item ? item.name : 'Dashboard'
})

const handleSearch = async () => {
   if (globalSearchQuery.value.length < 2) {
      searchResults.value = []
      return
   }
   
   isSearching.value = true
   try {
      const tenantId = user.value?.tenant?._id || user.value?.tenant
      const [uRes, bRes] = await Promise.all([
         usersApiFactory.getTenantUsers({ search: globalSearchQuery.value, limit: 5 }),
         bookingsApiFactory.getTenantBookings(tenantId, { search: globalSearchQuery.value, limit: 5 })
      ])
      
      const travellers = (uRes.data.items || []).map(u => ({
         id: u._id,
         type: 'Traveler',
         title: `${u.firstName} ${u.lastName}`,
         subtitle: u.email,
         icon: UsersIcon,
         target: '/dashboard/customers'
      }))
      
      const bookings = (bRes.data.items || []).map(b => ({
         id: b._id,
         type: 'Booking',
         title: `Booking #${b.reference?.toUpperCase()}`,
         subtitle: `${b.serviceType} • ${b.status}`,
         icon: TicketIcon,
         target: '/dashboard/bookings'
      }))
      
      searchResults.value = [...travellers, ...bookings]
   } catch (e) {
      console.error("Search failed")
   } finally {
      isSearching.value = false
   }
}

const groupedResults = computed(() => {
   return searchResults.value.reduce((acc, curr) => {
      if (!acc[curr.type]) acc[curr.type] = []
      acc[curr.type].push(curr)
      return acc
   }, {})
})

const handleResultClick = (res) => {
   closeSearch()
   navigateTo(res.target)
}

const closeSearch = () => {
   isSearchModalOpen.value = false
   globalSearchQuery.value = ''
   searchResults.value = []
}

onMounted(() => {
   fetchUnreadCount()
   fetchNotifications()
   setInterval(fetchUnreadCount, 30000)
})

watch(() => route.path, (newPath) => {
  const item = navigation.find(n => n.href === newPath)
  if (item) {
    navigationTitle.value = item.name
    navigationDetail.value = item.detail
    isNavigating.value = true
    setTimeout(() => { isNavigating.value = false }, 1000)
  }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
</style>
