<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Basic Nav for Help Center -->
    <nav class="bg-white border-b border-neutral-100 py-6">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/auth/login" class="text-sm font-bold text-primary hover:text-primary-dark transition-colors">Sign in to your account</NuxtLink>
      </div>
    </nav>

    <!-- Help Center Hero -->
    <section class="py-16 lg:py-24 bg-white relative overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div class="max-w-6xl mx-auto px-6">
        <div class="space-y-4 mb-12">
          <h1 class="text-4xl lg:text-5xl  text-primary-dark tracking-tight">Help center</h1>
          <p class="text-2xl lg:text-3xl font-bold text-neutral-800">Hi, Traveler</p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-5xl flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative group">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="How can we help?" 
              class="w-full pl-12 pr-4 py-4 bg-white border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-lg font-medium transition-all"
              @keyup.enter="handleSearch"
            />
          </div>
          <BaseButton @click="handleSearch" size="lg" variant="primary" class="px-12 py-4 shadow-lg shadow-primary/20">
            Search
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="pb-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl  text-primary-dark mb-10 tracking-tight">Explore help articles</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Support Category -->
          <div class="bg-white border border-neutral-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 group">
            <h3 class="text-2xl  text-primary-dark mb-6">Support</h3>
            <div class="space-y-4">
              <NuxtLink v-for="article in supportArticles" :key="article.id" :to="`/help-center/article/${article.id}`" class="flex items-center justify-between group/link">
                <span class="text-sm font-bold text-primary group-hover/link:text-secondary transition-colors">{{ article.title }}</span>
                <ChevronRightIcon class="h-4 w-4 text-primary group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>
              
              <div class="pt-6 border-t border-neutral-50 mt-4">
                <NuxtLink to="/help-center/category/support" class="flex items-center space-x-2 group/more">
                  <ListBulletIcon class="h-4 w-4 text-primary" />
                  <span class="text-sm  text-primary-dark group-hover/more:text-secondary transition-colors">More</span>
                  <ChevronRightIcon class="h-4 w-4 text-primary group-hover/more:translate-x-1 transition-transform" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Registration Category -->
          <div class="bg-white border border-neutral-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 group">
            <h3 class="text-2xl  text-primary-dark mb-6">Registration</h3>
            <div class="space-y-4">
              <NuxtLink v-for="article in registrationArticles" :key="article.id" :to="`/help-center/article/${article.id}`" class="flex items-center justify-between group/link">
                <span class="text-sm font-bold text-primary group-hover/link:text-secondary transition-colors">{{ article.title }}</span>
                <ChevronRightIcon class="h-4 w-4 text-primary group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>
              
              <div class="pt-6 border-t border-neutral-50 mt-4">
                <NuxtLink to="/help-center/category/registration" class="flex items-center space-x-2 group/more">
                  <ListBulletIcon class="h-4 w-4 text-primary" />
                  <span class="text-sm  text-primary-dark group-hover/more:text-secondary transition-colors">More</span>
                  <ChevronRightIcon class="h-4 w-4 text-primary group-hover/more:translate-x-1 transition-transform" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- About Category -->
          <div class="bg-white border border-neutral-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 group">
            <h3 class="text-2xl  text-primary-dark mb-6">About Flybeth TAAP</h3>
            <div class="space-y-4">
              <NuxtLink v-for="article in aboutArticles" :key="article.id" :to="`/help-center/article/${article.id}`" class="flex items-center justify-between group/link">
                <span class="text-sm font-bold text-primary group-hover/link:text-secondary transition-colors">{{ article.title }}</span>
                <ChevronRightIcon class="h-4 w-4 text-primary group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>
              
              <div class="pt-6 border-t border-neutral-50 mt-4">
                <NuxtLink to="/help-center/category/about" class="flex items-center space-x-2 group/more">
                  <ListBulletIcon class="h-4 w-4 text-primary" />
                  <span class="text-sm  text-primary-dark group-hover/more:text-secondary transition-colors">More</span>
                  <ChevronRightIcon class="h-4 w-4 text-primary group-hover/more:translate-x-1 transition-transform" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simple Footer for Help Center -->
    <footer class="bg-neutral-50 py-12 border-t border-neutral-100">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm text-neutral-500 font-medium tracking-wide">© 2026 Flybeth B2B Travel Technologies. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon, ChevronRightIcon, ListBulletIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const supportArticles = [
  { id: 'forgot-password', title: 'What can I do if I forgot my password?' },
  { id: 'contact-us', title: 'Contact us' }
]

const registrationArticles = [
  { id: 'approval-time', title: 'How long does it take for my agency to be approved?' },
  { id: 'registration-info', title: 'What information do you need during an agency registration?' },
  { id: 'how-to-register', title: 'How do I register my travel agency?' }
]

const aboutArticles = [
  { id: 'public-website', title: 'Can I also use the Flybeth public website to make reservations?' },
  { id: 'how-commissions-work', title: 'How does commission work?' },
  { id: 'competitive-rates', title: 'How are Flybeth TAAP rates competitive?' }
]

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  // Implement search logic or navigation to search results
  console.log('Searching for:', searchQuery.value)
}
</script>

<style scoped>
. { font-weight: 900; }
</style>
