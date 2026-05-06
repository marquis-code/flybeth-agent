<template>
  <div class="h-screen w-screen bg-[#F8F9FA] flex flex-col overflow-hidden font-body relative">
    <!-- Clean Header -->
    <header class="h-[70px] bg-white border-b border-gray-100 px-6 lg:px-10 flex items-center justify-between shrink-0 z-30 shadow-sm">
      <div class="flex items-center gap-4">
        <button 
          @click="goBack" 
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-primary/5 hover:text-primary transition-all font-bold text-sm group"
        >
          <ArrowLeftIcon class="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Dashboard
        </button>
        <div class="w-[1px] h-6 bg-gray-200 mx-2 hidden md:block"></div>
        <div class="hidden md:flex items-center gap-3">
          <h1 class="text-[15px]  text-gray-900 leading-none">Global Search</h1>
        </div>
      </div>

      <div class="flex items-center gap-3">
         <div class="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
            {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
         </div>
      </div>
    </header>

    <!-- Centered Search Widget Area -->
    <main class="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 md:p-8 lg:p-12 flex flex-col items-center justify-start scroll-smooth no-scrollbar pt-[10vh]">
      <div class="w-full max-w-6xl">
        <SearchWidget />
      </div>

      <!-- Subtle background hints -->
      <div class="fixed top-0 left-0 w-full h-[300px] bg-gradient-to-b from-white to-transparent pointer-events-none -z-10"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeftIcon
} from '@heroicons/vue/24/solid'
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({
  layout: false
})

const route = useRoute()
const { user } = useUser()

const goBack = () => {
  navigateTo('/dashboard')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

.font-body {
  font-family: 'Sora', sans-serif;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
