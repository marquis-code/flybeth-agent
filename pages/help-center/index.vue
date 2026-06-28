<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    
    <!-- Hero -->
    <section class="pt-10 pb-20 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-20">
          <div class="lg:w-1/2 space-y-8">
             <span class="text-xs font-bold text-primary uppercase ">Help Center</span>
             <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                How can we <br />
                <span class="text-primary">help you today?</span>
             </h1>
             <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-lg">
                Whether you need help with bookings, commissions, or technical support — our team is here for you around the clock.
             </p>
             
             <!-- Search -->
             <div class="relative max-w-md">
               <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
               <input 
                 v-model="searchQuery"
                 type="text" 
                 placeholder="Search for answers..." 
                 class="w-full pl-14 pr-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-neutral-300"
               />
             </div>
          </div>

          <!-- Support Visual -->
          <div class="lg:w-1/2 hidden lg:block">
             <div class="rounded-3xl overflow-hidden shadow-2xl h-[450px]">
                <img src="/images/redesign/help_support.png" class="w-full h-full object-cover" alt="Support Team" />
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Options -->
    <section class="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink v-for="node in supportNodes" :key="node.title" :to="node.path" 
                  class="bg-neutral-50 p-10 rounded-3xl border border-neutral-100 hover:bg-white hover:shadow-xl hover:border-primary/20 group transition-all duration-500 hover:-translate-y-2">
           <div class="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
              <component :is="node.icon" class="h-7 w-7 text-primary" />
           </div>
           <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">{{ node.title }}</h3>
           <p class="text-neutral-400 font-medium leading-relaxed text-sm">{{ node.desc }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Popular Articles -->
    <section class="py-24 bg-[#FAF9F6]">
       <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <div class="flex flex-col lg:flex-row gap-20">
             <div class="lg:w-1/3 space-y-6">
                <h2 class="text-3xl font-bold text-neutral-900">Popular Articles</h2>
                <p class="text-neutral-500 font-medium leading-relaxed">Quick answers to the most common questions from our travel partners.</p>
             </div>
             <div class="lg:w-2/3 grid md:grid-cols-2 gap-8">
                <div v-for="article in popularArticles" :key="article.id" class="group cursor-pointer p-6 bg-white rounded-2xl border border-neutral-100 hover:shadow-lg hover:border-primary/20 transition-all">
                   <h4 class="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors mb-2">{{ article.title }}</h4>
                   <p class="text-sm text-neutral-400 font-medium line-clamp-2">{{ article.excerpt }}</p>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Still Need Help -->
    <section class="py-24 text-center bg-white">
       <div class="max-w-2xl mx-auto px-6 space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900">Still need help?</h2>
          <p class="text-neutral-500 font-medium text-lg">Our support team is available 24/7 and typically responds within minutes.</p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
             <BaseButton @click="openChat" size="md" variant="primary" class="px-10 py-3 font-bold text-sm shadow-lg shadow-primary/20">Start Live Chat</BaseButton>
             <NuxtLink to="/contact" class="text-sm font-bold text-neutral-400 hover:text-primary transition-colors">Contact Us →</NuxtLink>
          </div>
       </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon, BookOpenIcon, TicketIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const supportNodes = [
  { icon: BookOpenIcon, title: 'Knowledge Base', desc: 'Browse our guides and tutorials to find answers to common questions.', path: '/help-center/knowledgebase' },
  { icon: TicketIcon, title: 'Submit a Ticket', desc: 'Need personalized help? Our support team will get back to you quickly.', path: '/help-center/tickets' },
  { icon: ChatBubbleOvalLeftEllipsisIcon, title: 'Share Feedback', desc: 'Help us improve Flybeth by sharing your experience and suggestions.', path: 'mailto:feedback@flybeth.com' }
]

const popularArticles = [
  { id: '1', title: 'How do commissions work?', excerpt: 'Learn how commission rates are set and when you get paid for your bookings.' },
  { id: '2', title: 'Getting started as a new agent', excerpt: 'A step-by-step guide to setting up your account and making your first booking.' },
  { id: '3', title: 'How to handle cancellations', excerpt: 'Everything you need to know about refund policies and rebooking options.' },
  { id: '4', title: 'Keeping your account secure', excerpt: 'Best practices for protecting your agency account and client data.' }
]

const openChat = () => {
   if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-chat-bot'))
   }
}
</script>
