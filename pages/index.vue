<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden selection:bg-primary selection:text-white">
    
    <!-- ========== HERO SECTION ========== -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Column -->
          <div class="space-y-8">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-neutral-200 bg-white text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
              <span>✨ POWERED BY AI</span>
              <span class="text-neutral-300">•</span>
              <span class="text-neutral-600">TRAVEL TECH INNOVATOR</span>
            </span>
            
            <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
              The Smartest Way to <span class="text-primary">Book</span> <br />
              <span class="text-primary">in the World</span>
            </h1>
            
            <p class="text-base text-neutral-500 font-medium leading-relaxed max-w-md">
              Tell our AI about your client, and we'll curate the perfect itinerary from our finest wholesale inventory. Corporate, leisure, groups — we've got you covered.
            </p>
            
            <div class="flex flex-col sm:flex-row items-start gap-4">
              <NuxtLink to="/auth/register" class="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all rounded-xl shadow-lg shadow-primary/30">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Start AI Booking
              </NuxtLink>
              <NuxtLink to="/pricing" class="inline-flex items-center px-6 py-3 text-sm font-bold text-primary bg-white border border-primary/20 hover:bg-primary/5 transition-all rounded-xl">
                Explore Inventory
              </NuxtLink>
            </div>

            <div class="pt-8 border-t border-neutral-100 flex items-center gap-8 sm:gap-12">
              <div>
                <p class="text-xl lg:text-2xl font-extrabold text-neutral-900">65,000+</p>
                <p class="text-[10px] sm:text-xs font-bold text-neutral-400 mt-1 uppercase">Global Partners</p>
              </div>
              <div>
                <p class="text-xl lg:text-2xl font-extrabold text-neutral-900">180+</p>
                <p class="text-[10px] sm:text-xs font-bold text-neutral-400 mt-1 uppercase">Countries</p>
              </div>
              <div>
                <p class="text-xl lg:text-2xl font-extrabold text-neutral-900">98%</p>
                <p class="text-[10px] sm:text-xs font-bold text-neutral-400 mt-1 uppercase">Happy Agents</p>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="relative hidden lg:block h-[550px] w-full">
             <!-- Background Shapes (Dynamic based on slide) -->
             <div 
               class="absolute inset-0 rounded-[3rem] translate-x-8 -translate-y-4 -z-10 transform rotate-3 transition-colors duration-1000"
               :style="{ backgroundColor: carouselSlides[currentSlideIndex].bg1 + '99' }"
             ></div>
             <div 
               class="absolute inset-0 rounded-[3rem] -translate-x-4 translate-y-8 -z-10 transform -rotate-2 transition-colors duration-1000"
               :style="{ backgroundColor: carouselSlides[currentSlideIndex].bg2 + '99' }"
             ></div>
             
             <!-- Image Container -->
             <div class="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white bg-neutral-900 group">
               <transition-group name="fade" tag="div" class="absolute inset-0 w-full h-full">
                 <img 
                   v-for="(slide, index) in carouselSlides" 
                   :key="slide.step"
                   v-show="currentSlideIndex === index"
                   :src="slide.image" 
                   class="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[10000ms] group-hover:scale-105" 
                   :alt="slide.title" 
                 />
               </transition-group>
               
               <!-- Gradient Overlay -->
               <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
               
               <!-- Top Content (Progress Bar + Text) -->
               <div class="absolute top-6 left-6 right-6">
                 <div class="flex gap-2 mb-6">
                   <div 
                     v-for="(slide, index) in carouselSlides" 
                     :key="'progress-'+index"
                     class="h-1 flex-1 rounded-full transition-colors duration-500 cursor-pointer"
                     :class="index === currentSlideIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'"
                     @click="currentSlideIndex = index"
                   ></div>
                 </div>
                 
                 <div class="overflow-hidden h-24 relative">
                   <transition-group name="fade" tag="div" class="absolute inset-0">
                     <div 
                       v-for="(slide, index) in carouselSlides" 
                       :key="slide.title"
                       v-show="currentSlideIndex === index"
                       class="absolute top-0 left-0 right-0"
                     >
                       <h3 class="text-3xl font-bold text-white mb-2">{{ slide.title }}</h3>
                       <p class="text-white/80 font-medium text-sm">{{ slide.description }}</p>
                     </div>
                   </transition-group>
                 </div>
               </div>
             </div>
          </div>
          
        </div>
      </div>
    </section>

    <!-- ========== PARTNER LOGOS ========== -->
    <section class="py-14 bg-white border-b border-neutral-100 overflow-hidden relative">
      <p class="text-center text-xs font-bold text-neutral-400 uppercase tracking-wider mb-8">Trusted by leading travel brands worldwide</p>
      <div class="flex items-center space-x-16 animate-scroll-logos">
        <div v-for="n in 2" :key="n" class="flex items-center space-x-16 flex-shrink-0">
          <img v-for="(p, idx) in partners" :key="idx" :src="p.logo" class="h-10 lg:h-12 object-contain opacity-80 hover:opacity-100 transition-all cursor-pointer" :alt="p.name" />
        </div>
      </div>
    </section>

    <!-- ========== WHY FLYBETH ========== -->
    <section class="py-16 lg:py-24 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex flex-col lg:flex-row items-center gap-16">
           <div class="lg:w-1/2 relative">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group max-w-md mx-auto">
                 <img src="/images/redesign/booking_human.png" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Flybeth Agent" />
              </div>
           </div>
           <div class="lg:w-1/2 space-y-6">
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
              Why 65,000+ Agents <br />
              <span class="text-primary">Choose Flybeth.</span>
            </h2>
            <p class="text-base text-neutral-500 font-medium leading-relaxed">
               Because running a travel agency should feel exciting, not exhausting. We handle the tech, the partnerships, and the inventory — so you can spend your time doing what you love: creating unforgettable trips for real people.
            </p>
            <div class="grid grid-cols-2 gap-8 py-4">
                <div v-for="stat in stats" :key="stat.label">
                    <p class="text-3xl font-extrabold text-primary">{{ stat.value }}</p>
                    <p class="text-xs font-bold text-neutral-400 uppercase tracking-wider mt-1">{{ stat.label }}</p>
                </div>
            </div>
            <div class="pt-2 flex items-center gap-4">
               <BaseButton size="md" variant="primary" to="/auth/register" class="px-10 font-bold text-sm">Start Free Today</BaseButton>
               <NuxtLink to="/careers" class="text-sm font-bold text-neutral-400 hover:text-primary transition-colors">We're hiring →</NuxtLink>
            </div>
         </div>
        </div>
      </div>
    </section>

    <!-- ========== FEATURES ========== -->
    <section class="py-16 lg:py-24 bg-[#FAF9F6] relative">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-4">
            Everything You Need, <br /> Nothing You Don&rsquo;t
          </h2>
          <p class="text-neutral-500 font-medium text-base leading-relaxed">
            We built Flybeth by listening to real travel agents. No bloated dashboards, no confusing menus — just the tools that actually help you earn more and work less.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div v-for="(advantage, idx) in advantages" :key="idx"
                class="bg-white p-8 rounded-3xl shadow-lg shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-500 group">
              <div class="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                 <component :is="advantage.icon" class="h-6 w-6" />
              </div>
              <h4 class="text-xl font-bold mb-3 text-neutral-900">{{ advantage.title }}</h4>
              <p class="text-sm text-neutral-500 leading-relaxed font-medium">{{ advantage.desc }}</p>
            </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="py-16 text-center bg-white border-t border-neutral-100">
      <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-neutral-900">
        Your next chapter starts here.
      </h2>
      <p class="text-neutral-500 font-medium text-base mb-8 max-w-xl mx-auto">
        Join thousands of agents who are already building their dream agencies with Flybeth. It takes less than 2 minutes to get started.
      </p>
      <BaseButton to="/auth/register" size="md" variant="primary" class="px-8 py-3 font-bold text-sm">
        Create Your Free Account
      </BaseButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BanknotesIcon, CpuChipIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const currentSlideIndex = ref(0)
const carouselSlides = [
  {
    title: 'The AI Match',
    description: 'Flybeth analyzes the client persona and trip occasion.',
    image: '/images/redesign/hero_agent_desk.png',
    bg1: '#FFF9C4', // yellow
    bg2: '#F3E8FF'  // purple
  },
  {
    title: 'Global Inventory',
    description: 'Instant access to net rates across flights and luxury stays.',
    image: '/images/redesign/carousel_1.png',
    bg1: '#E0F2FE', // blue
    bg2: '#DCFCE7'  // green
  },
  {
    title: 'Intelligent Analytics',
    description: 'Real-time booking management and automated reporting.',
    image: '/images/redesign/carousel_2.png',
    bg1: '#FCE7F3', // pink
    bg2: '#FFEDD5'  // orange
  }
]

let slideInterval: ReturnType<typeof setInterval>

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % carouselSlides.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const partners = [
  { name: 'Aegean Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/AegeanLogo-1.png' },
  { name: 'Air Canada', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_2_air_canada_large.png' },
  { name: 'American Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_4_american_airline_larges.png' },
  { name: 'Etihad', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_6_etihad_large.png' },
  { name: 'Lufthansa', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_7_lufthansa_large.png' },
  { name: 'Qatar Airways', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_8_qatar_large.png' },
  { name: 'Singapore Airlines', logo: 'https://www.mondee.com/app/uploads/2024/02/Singapore-Airlines-3-1.png' },
  { name: 'United Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_9_united_large.png' },
  { name: 'Hilton', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_24_hilton_large.png' },
  { name: 'Marriott Bonvoy', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_27_marriott_bonvoy_large.png' },
  { name: 'Four Seasons', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_1_four_season_large.png' }
]

const stats = [
  { value: '65K+', label: 'Global Partners' },
  { value: '180+', label: 'Countries' },
  { value: '24/7', label: 'Priority Support' },
  { value: '0.1s', label: 'Search Latency' }
]

const advantages = [
  { icon: BanknotesIcon, title: 'Better Margins, Instantly', desc: 'Why share your hard-earned commissions? Access wholesale rates that the big agencies use — so every booking puts more money in your pocket.' },
  { icon: CpuChipIcon, title: 'Book in Seconds, Not Hours', desc: 'Our smart search finds the best flights and hotels across 650+ airlines instantly. What used to take hours now takes a single click.' },
  { icon: UserGroupIcon, title: 'You\'re Never Alone', desc: 'Join a community of 65,000+ agents worldwide. Share tips, ask questions, and grow together. Plus, our 24/7 support team has your back.' }
]
</script>

<style scoped>
/* ===== Logo scroll ===== */
.animate-scroll-logos {
  display: flex;
  width: max-content;
  animation: scroll-logos 40s linear infinite;
}
@keyframes scroll-logos {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: white; }
::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }

/* ===== Carousel Transitions ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
