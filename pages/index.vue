<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden selection:bg-primary selection:text-white">
    
    <!-- ========== HERO SECTION (Foxico-Style) ========== -->
    <section class="relative h-screen w-full overflow-hidden bg-black">
      
      <!-- Background Images (crossfade) -->
      <div v-for="(slide, index) in slides" :key="'bg-' + index"
           class="absolute inset-0 transition-all duration-[1200ms] ease-in-out"
           :class="activeSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'">
        <img :src="slide.image" class="w-full h-full object-cover" :alt="slide.name" />
      </div>
      
      <!-- Dark overlay for text readability -->
      <div class="absolute inset-0 bg-black/70 z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>

      <!-- ===== Content Layer ===== -->
      <div class="absolute inset-0 z-20 flex items-end lg:items-center">
        <div class="max-w-[1440px] w-full mx-auto px-6 lg:px-12 pb-28 lg:pb-0">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            
            <!-- LEFT: Title + Description + Button (Animated per slide) -->
            <div class="lg:w-1/2 space-y-6">
              <transition name="slide-text" mode="out-in">
                <div :key="activeSlide" class="space-y-6">
                  <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight">
                    {{ slides[activeSlide].name }}
                  </h1>
                  <p class="text-white/80 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
                    {{ slides[activeSlide].description }}
                  </p>
                  <NuxtLink to="/auth/register" class="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 group mt-2">
                    <span>Get Started</span>
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </NuxtLink>
                </div>
              </transition>
            </div>

            <!-- RIGHT: Destination Preview Cards (Foxico-style stacked) -->
            <div class="hidden lg:flex items-end gap-5 pb-4">
              <div v-for="(card, ci) in visibleCards" :key="card.name"
                   class="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl group"
                   :class="ci === 0 ? 'w-[220px] h-[300px]' : ci === 1 ? 'w-[200px] h-[270px]' : 'w-[180px] h-[240px] opacity-80'"
                   @click="goToSlide(card.index)">
                <img :src="card.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" :alt="card.name" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <!-- Card Label -->
                <!-- <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span class="text-white text-xs font-bold tracking-wide">{{ card.name }}</span>
                  <span class="flex gap-0.5">
                    <span v-for="n in 5" :key="n" class="w-1 h-1 rounded-full bg-white/60"></span>
                  </span>
                </div> -->
                
                <!-- Bookmark Icon -->
                <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ===== Bottom Bar: Arrows + Dots + Counter ===== -->
      <div class="absolute bottom-8 left-0 right-0 z-30 px-6 lg:px-12">
        <div class="max-w-[1440px] mx-auto flex items-center justify-between">
          
          <!-- Left: Vertical text -->
          <div class="hidden lg:block">
            <span class="text-white/30 text-xs font-bold  uppercase vertical-text">Flybeth</span>
          </div>
          
          <!-- Center: Prev/Next Arrows + Dots -->
          <div class="flex items-center gap-6">
            <button @click="prevSlide" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="nextSlide" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <!-- Dots -->
            <div class="flex items-center gap-2 ml-4">
              <button v-for="(_, i) in slides" :key="i" 
                      @click="goToSlide(i)"
                      class="transition-all duration-300 rounded-full"
                      :class="activeSlide === i ? 'w-3 h-3 bg-primary' : 'w-2 h-2 bg-white/30 hover:bg-white/50'"></button>
            </div>
          </div>

          <!-- Right: Slide Counter -->
          <div class="flex items-center gap-2">
            <span class="text-white/30 text-xs font-mono tracking-widest">
              <span class="text-white font-bold">0{{ activeSlide + 1 }}</span> / 0{{ slides.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-white/10">
        <div class="h-full bg-primary transition-all duration-300 ease-linear" 
             :style="{ width: progressWidth + '%' }"></div>
      </div>
    </section>

    <!-- ========== PARTNER LOGOS ========== -->
    <section class="py-14 bg-white border-b border-neutral-100 overflow-hidden relative">
      <p class="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">Trusted by leading travel brands worldwide</p>
      <div class="flex items-center space-x-16 animate-scroll-logos">
        <div v-for="n in 2" :key="n" class="flex items-center space-x-16 flex-shrink-0">
          <img v-for="(p, idx) in partners" :key="idx" :src="p.logo" class="h-10 lg:h-12 object-contain opacity-80 hover:opacity-100 transition-all cursor-pointer" :alt="p.name" />
        </div>
      </div>
    </section>

    <!-- ========== WHY FLYBETH ========== -->
    <section class="py-24 lg:py-32 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex flex-col lg:flex-row items-center gap-20">
           <div class="lg:w-1/2 relative">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                 <img src="/images/redesign/booking_human.png" class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Flybeth Agent" />
              </div>
           </div>
           <div class="lg:w-1/2 space-y-8">
            <h2 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              Why 65,000+ Agents <br />
              <span class="text-primary">Choose Flybeth.</span>
            </h2>
            <p class="text-lg text-neutral-500 font-medium leading-relaxed">
               Because running a travel agency should feel exciting, not exhausting. We handle the tech, the partnerships, and the inventory — so you can spend your time doing what you love: creating unforgettable trips for real people.
            </p>
            <div class="grid grid-cols-2 gap-8 py-4">
                <div v-for="stat in stats" :key="stat.label">
                    <p class="text-3xl  text-primary">{{ stat.value }}</p>
                    <p class="text-xs font-bold text-neutral-400 uppercase tracking-widest">{{ stat.label }}</p>
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
    <section class="py-24 lg:py-32 bg-[#FAF9F6] relative">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <h2 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
            Everything You Need, <br /> Nothing You Don&rsquo;t
          </h2>
          <p class="text-neutral-500 font-medium text-lg leading-relaxed">
            We built Flybeth by listening to real travel agents. No bloated dashboards, no confusing menus — just the tools that actually help you earn more and work less.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div v-for="(advantage, idx) in advantages" :key="idx"
                class="bg-white p-12 rounded-3xl shadow-xl shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-500 group">
              <div class="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                 <component :is="advantage.icon" class="h-7 w-7" />
              </div>
              <h4 class="text-2xl font-bold mb-4 text-neutral-900">{{ advantage.title }}</h4>
              <p class="text-neutral-500 leading-relaxed font-medium">{{ advantage.desc }}</p>
            </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="py-24 text-center bg-white border-t border-neutral-100">
      <h2 class="text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
        Your next chapter starts here.
      </h2>
      <p class="text-neutral-500 font-medium text-lg mb-10 max-w-xl mx-auto">
        Join thousands of agents who are already building their dream agencies with Flybeth. It takes less than 2 minutes to get started.
      </p>
      <BaseButton to="/auth/register" size="md" variant="primary" class="px-12 py-4 font-bold text-sm">
        Create Your Free Account
      </BaseButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BanknotesIcon, CpuChipIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const activeSlide = ref(0)
const progressWidth = ref(0)
let carouselInterval: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

const SLIDE_DURATION = 6000 // 6 seconds per slide

interface Slide {
  name: string
  description: string
  image: string
}

const slides: Slide[] = [
  {
    name: 'Your Clients, Your Way',
    description: 'Flybeth puts you at the center of every journey. With real-time access to 650+ airlines and thousands of hotels, you can craft dream vacations for your clients — not just book them. This is travel done differently.',
    image: '/images/redesign/hero_agent_desk.png'
  },
  {
    name: 'Built for Agents, Not Middlemen',
    description: 'Stop paying retail. Flybeth gives you direct wholesale access to the same inventory that powers the world\'s largest agencies. Better margins, faster bookings, and tools designed by agents, for agents.',
    image: '/images/redesign/hero_team_collab.png'
  },
  {
    name: 'Grow Without Limits',
    description: 'From your first booking to your millionth — Flybeth scales with you. Our AI-powered platform handles the complexity so you can focus on what matters most: building lasting relationships with your travelers.',
    image: '/images/redesign/agent_consultation.png'
  },
  {
    name: 'The Future of Travel Starts Here',
    description: 'Join 65,000+ agents who have already made the switch. Flybeth is not just another booking tool — it\'s the complete operating system for modern travel entrepreneurs who refuse to settle for less.',
    image: '/images/redesign/travel_experience.png'
  }
]

// Show the next 3 slides as preview cards (excluding the active one)
const visibleCards = computed(() => {
  const cards = []
  for (let i = 1; i <= 3; i++) {
    const idx = (activeSlide.value + i) % slides.length
    cards.push({ ...slides[idx], index: idx })
  }
  return cards
})

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length
  resetProgress()
}

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
  resetProgress()
}

const goToSlide = (index: number) => {
  activeSlide.value = index
  resetProgress()
}

const resetProgress = () => {
  progressWidth.value = 0
}

const startAutoPlay = () => {
  // Progress bar ticker (updates every 30ms for smooth animation)
  progressInterval = setInterval(() => {
    progressWidth.value += (30 / SLIDE_DURATION) * 100
    if (progressWidth.value >= 100) {
      progressWidth.value = 0
      activeSlide.value = (activeSlide.value + 1) % slides.length
    }
  }, 30)
}

const stopAutoPlay = () => {
  if (progressInterval) clearInterval(progressInterval)
  if (carouselInterval) clearInterval(carouselInterval)
}

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

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* ===== Text transition (slide + fade) ===== */
.slide-text-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-text-leave-active {
  transition: all 0.4s cubic-bezier(0.5, 0, 0.75, 0);
}
.slide-text-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.slide-text-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ===== Vertical text ===== */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

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
</style>
