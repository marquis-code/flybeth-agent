<template>
  <div class="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 overflow-x-hidden selection:bg-primary selection:text-white">
    <!-- Premium Navigation -->
    <nav 
      class="fixed top-0 w-full z-50 transition-all duration-700 border-b"
      :class="scrolled ? 'bg-white/90 backdrop-blur-xl border-neutral-100 py-4 shadow-sm' : 'bg-transparent border-transparent py-8'"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        <div class="flex items-center space-x-3 group cursor-pointer" @click="scrollToTop">
           <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>  

        <div class="hidden md:flex items-center space-x-10">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.href" 
            class="text-sm font-black text-neutral-400 hover:text-primary-dark transition-colors tracking-[0.2em]"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-6">
          <NuxtLink to="/auth/login" class="text-sm font-black tracking-[0.2em] text-neutral-400 hover:text-primary-dark transition-colors">Sign in</NuxtLink>
          <BaseButton to="/auth/register" variant="primary" size="md" class="px-7 py-3 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
            Join platform
          </BaseButton>
        </div>
      </div>
    </nav>

    <!-- Immersive Hero Section -->
    <section class="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div class="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10 reveal-1">
          <div class="inline-flex items-center space-x-3 px-5 py-2 bg-white rounded-full border border-neutral-100 shadow-sm">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span class="text-sm font-black text-primary-dark tracking-[0.2em]">Secure node verification active</span>
          </div>

          <h1 class="text-6xl lg:text-8xl font-black text-primary-dark leading-[1.05] tracking-tighter">
            Scale your agency.<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-secondary">Without limits.</span>
          </h1>

          <p class="text-lg lg:text-xl text-neutral-500 max-w-2xl font-medium leading-relaxed">
            Gain exclusive access to true wholesale rates, instant global fulfillment, and powerful analytics. Built specifically for elite travel advisors.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 pt-4">
            <BaseButton size="lg" variant="primary" to="/auth/register" class="shadow-xl shadow-primary/20 px-10 py-4 hover:-translate-y-1 transition-transform">
              Start free trial
            </BaseButton>
            <BaseButton size="lg" variant="outline" class="px-10 py-4 border-gray-200 text-gray-700 hover:text-primary-dark hover:border-gray-300">
              Explore inventory
            </BaseButton>
          </div>
        </div>

        <!-- Dashboard Preview / Bento Hero Image -->
        <div class="mt-24 relative mx-auto w-full max-w-6xl reveal-2">
          <div class="relative bg-white rounded-[2.5rem] p-4 lg:p-6 border border-neutral-100 shadow-2xl shadow-neutral-200/50">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 pointer-events-none rounded-[2.5rem]"></div>
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000" alt="Platform Dashboard Overview" class="w-full h-[400px] lg:h-[600px] object-cover rounded-[1.5rem] lg:rounded-[2rem] shadow-inner" />
            
            <!-- Floating UI Elements -->
            <div class="absolute -left-6 top-32 lg:-left-12 lg:top-40 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-neutral-100 flex items-center space-x-4 animate-float">
              <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <CheckIcon class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p class="text-sm font-black tracking-wider text-neutral-400">Instant booking</p>
                <p class="text-lg font-bold text-gray-900">Confirmed</p>
              </div>
            </div>

            <div class="absolute -right-6 bottom-32 lg:-right-12 lg:bottom-40 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-neutral-100 flex items-center space-x-4 animate-float-delayed">
              <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <BanknotesIcon class="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p class="text-sm font-black tracking-wider text-neutral-400">Wholesale margin</p>
                <p class="text-lg font-bold text-gray-900">+34.5% profit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted Partners Banner -->
    <section class="py-16 bg-neutral-50 border-y border-neutral-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <p class="text-center text-sm font-black text-neutral-400 tracking-[0.3em] mb-10">Integrating seamlessly with industry leaders</p>
        <div class="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <span class="text-2xl font-black tracking-tighter">Amadeus</span>
          <span class="text-2xl font-black tracking-tighter">Sabre</span>
          <span class="text-2xl font-black tracking-tighter">Travelport</span>
          <span class="text-2xl font-black tracking-tighter">HotelBeds</span>
          <span class="text-2xl font-black tracking-tighter">Expedia TAAP</span>
        </div>
      </div>
    </section>

    <!-- Bento Box Features Section -->
    <section id="features" class="py-32 bg-white relative">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="mb-20 text-center max-w-3xl mx-auto observe-me">
          <h2 class="text-sm font-black text-secondary tracking-[0.4em] mb-4 uppercase">Advanced infrastructure</h2>
          <h3 class="text-5xl lg:text-6xl font-black text-primary-dark tracking-tighter leading-tight">
            Everything you need to <span class="block text-primary">operate at scale.</span>
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <!-- Feature 1: Large Wide -->
          <div class="md:col-span-2 md:row-span-2 bg-neutral-50 rounded-[2.5rem] p-10 lg:p-14 border border-neutral-100 relative overflow-hidden group hover:shadow-xl transition-all duration-700 observe-me delay-100">
            <div class="relative z-10 max-w-md">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary mb-8 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
                <GlobeAltIcon class="h-7 w-7" />
              </div>
              <h4 class="text-3xl font-black text-primary-dark mb-4 tracking-tight">Global wholesale inventory</h4>
              <p class="text-neutral-500 leading-relaxed font-medium">Access millions of properties and full airline NDC feeds. Completely bypass retail markups to secure the absolute lowest industry rates and maximize your agency's margins.</p>
            </div>
            <!-- Decorative Visual -->
            <div class="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 translate-x-12 translate-y-12">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover rounded-tl-[3rem] shadow-2xl" />
            </div>
          </div>

          <!-- Feature 2: Small Square -->
          <div class="bg-primary-dark rounded-[2.5rem] p-10 border border-primary-dark relative overflow-hidden group hover:shadow-xl hover:shadow-primary-dark/20 transition-all duration-700 observe-me delay-200">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent opacity-50"></div>
            <div class="relative z-10 text-white h-full flex flex-col justify-between">
              <div>
                <SparklesIcon class="h-8 w-8 text-secondary mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <h4 class="text-2xl font-black mb-3 tracking-tight">Instant ticketing</h4>
                <p class="text-white/70 text-sm leading-relaxed font-medium">Fully automated GDS ticket issuance ensuring your clients receive their itineraries immediately.</p>
              </div>
            </div>
          </div>

          <!-- Feature 3: Small Square -->
          <div class="bg-white rounded-[2.5rem] p-10 border border-neutral-200 shadow-sm relative overflow-hidden group hover:border-secondary/30 transition-all duration-700 observe-me delay-300">
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div>
                <ShieldCheckIcon class="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h4 class="text-2xl font-black text-gray-900 mb-3 tracking-tight">Bank-grade security</h4>
                <p class="text-neutral-500 text-sm leading-relaxed font-medium">Multi-tiered encryption validating every transaction, protecting your agency and your clients.</p>
              </div>
            </div>
          </div>

          <!-- Feature 4: Wide Bottom -->
          <div class="md:col-span-3 bg-neutral-50 rounded-[2.5rem] p-10 lg:p-14 border border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-12 group hover:shadow-xl transition-all duration-700 observe-me delay-400 overflow-hidden relative">
            <div class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/60 to-transparent pointer-events-none"></div>
            <div class="relative z-10 max-w-2xl">
              <h4 class="text-3xl font-black text-primary-dark mb-4 tracking-tight">Advanced agency analytics</h4>
              <p class="text-neutral-500 leading-relaxed font-medium">Monitor your booking volume, calculate live profit margins, and analyze regional segment trends with our dedicated agent reporting dashboard.</p>
            </div>
            <div class="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                <p class="text-sm font-black uppercase text-neutral-400 mb-2 tracking-wider">Revenue YTD</p>
                <p class="text-2xl font-bold text-gray-900">$2.4M</p>
              </div>
              <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm group-hover:-translate-y-2 transition-transform duration-700 delay-100">
                <p class="text-sm font-black uppercase text-neutral-400 mb-2 tracking-wider">Bookings</p>
                <p class="text-2xl font-bold text-gray-900">1,204</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- High-Impact CTA Section -->
    <section class="py-32 lg:py-48 relative overflow-hidden bg-primary-dark">
      <!-- Moody Background -->
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" alt="Luxury Travel" class="w-full h-full object-cover mix-blend-overlay" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/95 to-transparent"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white observe-me">
        <span class="inline-block py-2 px-5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-black tracking-[0.3em] text-secondary">
          Join the elite network
        </span>
        <h2 class="text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-8">
          Ready to elevate your <br />
          <span class="italic text-white/50">travel business?</span>
        </h2>
        <p class="text-xl text-white/60 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
          The industry's most powerful B2B travel fulfillment engine is ready. Standardize your operations and maximize your margins today.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <BaseButton to="/auth/register" size="lg" variant="primary" class="px-14 py-5 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-500">
            Create agent account
          </BaseButton>
          <a href="#" class="text-sm font-bold text-white hover:text-secondary transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-secondary">Contact enterprise sales</a>
        </div>
      </div>
    </section>

    <!-- Professional Footer -->
    <footer class="bg-[#111] py-20 border-t border-neutral-800 text-neutral-400">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div class="col-span-1 md:col-span-2 space-y-8">
            <div class="flex items-center space-x-3">
               <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
            </div>
            <p class="font-medium max-w-sm leading-relaxed text-sm">
              Empowering global travel advisors with intelligent B2B infrastructure, direct API connectivity, and wholesale inventory frameworks.
            </p>
          </div>
          <div v-for="col in footerLinks" :key="col.title">
            <h4 class="text-xs font-black text-white tracking-[0.4em] mb-8 uppercase">{{ col.title }}</h4>
            <ul class="space-y-4">
              <li v-for="link in col.links" :key="link.name">
                <NuxtLink :to="link.href" class="text-sm font-medium hover:text-white transition-colors">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-neutral-800">
          <p class="font-bold text-sm tracking-widest text-neutral-500">© 2026 Flybeth B2B travel technologies.</p>
          <div class="flex space-x-8 mt-8 md:mt-0">
            <NuxtLink to="/privacy" class="text-sm font-black tracking-[0.2em] hover:text-white transition-colors">Privacy</NuxtLink>
            <NuxtLink to="/terms" class="text-sm font-black tracking-[0.2em] hover:text-white transition-colors">Terms</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  GlobeAltIcon, 
  BanknotesIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Simple Intersection Observer to trigger entrance animations
const setupObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })

  document.querySelectorAll('.observe-me').forEach((el) => {
    observer.observe(el)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Staggered reveal for hero elements is handled via simple CSS animation classes
  // Wait a tick for DOM to setup, then trigger observer
  setTimeout(() => setupObserver(), 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Resources', href: '/help-center' },
  { name: 'Pricing', href: '/pricing' },
]

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Airlines', href: '/platform/airlines' },
      { name: 'Properties', href: '/platform/properties' },
      { name: 'Car rentals', href: '/platform/cars' },
      { name: 'Transfers', href: '/platform/transfers' },
      { name: 'API integration', href: '/platform/api' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Security matrix', href: '/security' },
      { name: 'Status', href: '/status' },
      { name: 'Contact', href: '/contact' }
    ]
  }
]
</script>

<style scoped>
/* Base Typography Extensions */
.font-black { font-weight: 900; }

/* Reveal Animations */
.reveal-1 {
  opacity: 0;
  animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
}
.reveal-2 {
  opacity: 0;
  animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}
.reveal-3 {
  opacity: 0;
  animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Intersection Observer Animations */
.observe-me {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.observe-me.visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
.delay-400 { transition-delay: 400ms; }

/* Floating Elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 3s;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #FDFDFD;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
