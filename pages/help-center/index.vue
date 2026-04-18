<template>
  <div class="min-h-screen bg-[#FDFDFE] font-sans text-neutral-900 selection:bg-primary/10">
    <!-- Help Center Nav -->
    <nav class="bg-white border-b border-neutral-100 py-6">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <img src="@/assets/img/logo.png" class="w-auto h-10 transition-transform group-hover:scale-105" alt="logo" />
        </NuxtLink>
        <div class="flex items-center space-x-8">
           <NuxtLink to="/help-center/knowledgebase" class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors">Knowledgebase</NuxtLink>
           <NuxtLink to="/help-center/tickets" class="text-sm font-semibold text-neutral-600 hover:text-primary transition-colors">Submit Ticket</NuxtLink>
           <NuxtLink to="/auth/login" class="px-5 py-2.5 bg-primary/5 text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300">Sign in</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Support Hero Section -->
    <section class="relative bg-[#EBEEF5] pt-16 pb-32 overflow-hidden">
      <!-- Decorative Bubbles -->
      <div class="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div class="absolute top-1/4 left-1/4 w-32 h-12 bg-white/60 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute top-1/2 right-1/4 w-48 h-16 bg-primary/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-1/4 left-1/3 w-64 h-20 bg-white/40 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-16">
          <div class="max-w-xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
             <div class="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur rounded-2xl border border-white/50 shadow-sm">
                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-ping mr-3"></div>
                <span class="text-xs font-bold text-neutral-600  ">Live Support Available 24/7</span>
             </div>
             <h1 class="text-6xl font-black text-neutral-900  leading-[1.1]">
                Hello there!<br/>
                <span class="text-primary">How can we help?</span>
             </h1>
             <p class="text-lg text-neutral-600 font-medium max-w-md leading-relaxed">
                Whether you're looking for answers about bookings, commissions, or technical support, our team is here for you.
             </p>
             <div class="relative max-w-md group group-focus-within:scale-[1.02] transition-all duration-300">
               <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400 group-focus-within:text-primary transition-colors" />
               <input 
                 v-model="searchQuery"
                 type="text" 
                 placeholder="Search our knowledgebase..." 
                 class="w-full pl-14 pr-6 py-5 bg-white border-0 rounded-2xl shadow-xl shadow-neutral-200/50 focus:ring-4 focus:ring-primary/10 outline-none text-base font-bold transition-all placeholder:text-neutral-300"
               />
             </div>
          </div>

          <!-- Hero Illustration Content -->
          <div class="hidden md:block w-full max-w-lg lg:max-w-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
             <div class="relative p-10 bg-white/30 backdrop-blur-md rounded-[40px] border border-white/40 shadow-2xl">
                <img src="@/assets/img/logo.png" class="absolute -top-12 -right-8 w-24 h-24 bg-white p-4 rounded-3xl shadow-xl rotate-12" alt="Flybeth" />
                <div class="aspect-video bg-neutral-900 rounded-[32px] overflow-hidden flex items-center justify-center p-8 group overflow-hidden">
                   <div class="text-center space-y-6">
                      <div class="flex justify-center -space-x-4">
                        <div v-for="i in 3" :key="i" class="h-14 w-14 rounded-full border-4 border-neutral-900 bg-neutral-800 flex items-center justify-center ring-4 ring-primary/20">
                           <UserIcon class="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <p class="text-white text-3xl font-black">Live Chat</p>
                      <button @click="openChat" class="px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">Start messaging</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Hub Grid -->
    <section class="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Knowledgebase -->
        <NuxtLink to="/help-center/knowledgebase" class="bg-white p-8 rounded-[32px] shadow-xl shadow-neutral-200/50 border border-neutral-100 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-2">
           <div class="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-primary/5 transition-colors">
              <BookOpenIcon class="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors" />
           </div>
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-black text-neutral-900 group-hover:text-primary transition-colors">Knowledgebase</h3>
              <ArrowLongRightIcon class="h-6 w-6 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </div>
           <p class="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors leading-relaxed">Explore questions and answers regarding the Flybeth travel agency.</p>
        </NuxtLink>

        <!-- Submit support ticket -->
        <NuxtLink to="/help-center/tickets" class="bg-white p-8 rounded-[32px] shadow-xl shadow-neutral-200/50 border border-neutral-100 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-2">
           <div class="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-primary/5 transition-colors">
              <TicketIcon class="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors" />
           </div>
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-black text-neutral-900 group-hover:text-primary transition-colors">Support ticket</h3>
              <ArrowLongRightIcon class="h-6 w-6 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </div>
           <p class="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors leading-relaxed">Need help? We're ready to answer your questions 24/7.</p>
        </NuxtLink>

        <!-- Leave feedback -->
        <a href="mailto:support@flybeth.com" class="bg-white p-8 rounded-[32px] shadow-xl shadow-neutral-200/50 border border-neutral-100 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-2">
           <div class="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-primary/5 transition-colors">
              <ChatBubbleOvalLeftEllipsisIcon class="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors" />
           </div>
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-black text-neutral-900 group-hover:text-primary transition-colors">Leave feedback</h3>
              <ArrowLongRightIcon class="h-6 w-6 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </div>
           <p class="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors leading-relaxed">Help us make your experience better — we love hearing from you.</p>
        </a>

        <!-- Reporting abuse -->
        <a href="mailto:abuse@flybeth.com" class="bg-white p-8 rounded-[32px] shadow-xl shadow-neutral-200/50 border border-neutral-100 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-2">
           <div class="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-primary/5 transition-colors">
              <ExclamationTriangleIcon class="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors" />
           </div>
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-black text-neutral-900 group-hover:text-primary transition-colors">Reporting abuse</h3>
              <ArrowLongRightIcon class="h-6 w-6 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </div>
           <p class="text-sm font-semibold text-neutral-400 group-hover:text-neutral-500 transition-colors leading-relaxed">Find out how to report illegal activity or online platform abuse.</p>
        </a>
      </div>
    </section>

    <!-- Popular Articles Section -->
    <section class="max-w-7xl mx-auto px-6 py-20 bg-white">
       <div class="flex flex-col md:flex-row gap-20">
          <div class="w-full md:w-1/3">
             <h2 class="text-3xl font-black text-neutral-900 mb-6">Popular Articles</h2>
             <p class="text-neutral-500 font-medium leading-relaxed">Get quick answers to the most common questions from our travel partners.</p>
             <button class="mt-8 flex items-center space-x-3 text-primary font-bold hover:translate-x-2 transition-transform">
                <span>View all articles</span>
                <ArrowLongRightIcon class="h-5 w-5" />
             </button>
          </div>
          <div class="w-full grid md:grid-cols-2 gap-12">
             <div v-for="article in popularArticles" :key="article.id" class="group cursor-pointer">
                <h4 class="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors mb-2">{{ article.title }}</h4>
                <p class="text-sm text-neutral-400 font-medium line-clamp-2">{{ article.excerpt }}</p>
             </div>
          </div>
       </div>
    </section>

    <!-- Ukraine / Peace Banner -->
    <footer class="pt-20 pb-12 border-t border-neutral-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center space-x-4 mb-10 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
           <span class="text-2xl">🌍</span>
           <p class="text-sm font-semibold text-neutral-500">We stand for global connection. Flybeth is a travel technology provider supporting agencies worldwide in bridging cultures and horizons.</p>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center text-xs font-bold text-neutral-300 gap-4  ">
           <p>© 2026 Flybeth Travel Technologies. All rights reserved.</p>
           <div class="flex items-center space-x-8">
              <a href="#" class="hover:text-neutral-500 transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-neutral-500 transition-colors">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  MagnifyingGlassIcon, 
  ArrowLongRightIcon, 
  BookOpenIcon, 
  TicketIcon, 
  ChatBubbleOvalLeftEllipsisIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const popularArticles = [
  { id: '1', title: 'Managing your commission structure', excerpt: 'Learn how to set and adjust commission rates for different travel products and services.' },
  { id: '2', title: 'Agent registration process', excerpt: 'Step-by-step guide to onboarding your agency and getting started with Flybeth TAAP.' },
  { id: '3', title: 'Handling flight cancellations', excerpt: 'Everything you need to know about refund status and rebooking flights for your clients.' },
  { id: '4', title: 'Platform security best practices', excerpt: 'How to keep your agency account and client data safe using our security features.' }
]

const openChat = () => {
   // Event or logic to open the chat bot widget
   window.dispatchEvent(new CustomEvent('open-chat-bot'))
}

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  console.log('Searching knowledgebase for:', searchQuery.value)
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-in-from-left {
  from { transform: translateX(-40px); }
  to { transform: translateX(0); }
}
@keyframes slide-in-from-right {
  from { transform: translateX(40px); }
  to { transform: translateX(0); }
}
.animate-in {
  animation-fill-mode: both;
}
.fade-in {
  animation-name: fade-in;
}
.slide-in-from-left-8 {
  animation-name: slide-in-from-left;
}
.slide-in-from-right-8 {
  animation-name: slide-in-from-right;
}
</style>
