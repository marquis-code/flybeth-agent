<template>
  <div class="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 overflow-x-hidden selection:bg-primary selection:text-white">

    <!-- Immersive Hero Section -->
    <section class="relative pt-24 pb-20 md:pt-32 lg:pt-36 lg:pb-32 overflow-hidden bg-white">
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div class="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8 reveal-1">
          <span class="inline-flex items-center space-x-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
            <SparklesIcon class="h-4 w-4" />
            <span>The Operating System for Travel Agencies</span>
          </span>
          <h1 class="text-6xl md:text-7xl lg:text-[5.5rem] font-black text-primary-dark leading-[1.02]">
            Book globally.<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-secondary">Scale effortlessly.</span>
          </h1>

          <p class="text-xl text-neutral-500 max-w-2xl font-medium leading-relaxed">
            The ultimate B2B platform for elite travel agents. Access robust wholesale inventory and manage your client itineraries dynamically.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 pt-4">
            <BaseButton size="lg" variant="primary" to="/auth/register" class="shadow-xl shadow-primary/20 px-10 py-4 hover:-translate-y-1 transition-transform font-bold">
              Join Flybeth Network
            </BaseButton>
            <BaseButton size="lg" variant="outline" class="px-10 py-4 border-gray-200 text-gray-700 hover:text-primary-dark hover:border-gray-300 font-bold">
              View Capabilities
            </BaseButton>
          </div>
        </div>

        <!-- Dashboard Hero Showcase -->
        <div class="mt-28 relative mx-auto w-full max-w-6xl reveal-2 perspective-1000">
          <div class="relative bg-white rounded-[2.5rem] p-4 lg:p-6 border border-neutral-100 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.15)] transform translate-y-4 hover:translate-y-0 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 pointer-events-none rounded-[2.5rem]"></div>
            <img src="/images/flybeth_abstract_dashboard.png" alt="Advanced Agency Dashboard" class="w-full h-auto object-cover rounded-[1.5rem] lg:rounded-[2rem] border border-gray-50" />
            
            <div class="absolute -left-8 top-32 lg:-left-16 lg:top-40 bg-white p-6 rounded-2xl shadow-xl shadow-black/5 border border-neutral-100 flex items-center space-x-4 animate-float">
              <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <GlobeAltIcon class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p class="text-sm font-bold text-neutral-400">Live Inventory</p>
                <p class="text-lg font-black text-gray-900">7G Global Sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted Partners Banner -->
    <section class="py-16 bg-neutral-50 border-y border-neutral-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <p class="text-center text-sm font-bold text-neutral-400 uppercase tracking-widest mb-10">Powering Elite Agents Through Industry Leaders</p>
        <div class="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <span class="text-3xl font-black">Amadeus</span>
          <span class="text-3xl font-black">Sabre</span>
          <span class="text-3xl font-black">Travelport</span>
          <span class="text-3xl font-black">Duffel</span>
          <span class="text-3xl font-black">HotelBeds</span>
          <span class="text-3xl font-black italic">Expedia TAAP</span>
        </div>
      </div>
    </section>

    <!-- Detailed Features Highlight -->
    <section id="capabilities" class="py-32 bg-white relative">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-40">
        
        <!-- Feature 1: The Itinerary Builder -->
        <div class="flex flex-col lg:flex-row items-center gap-16 observe-me">
           <div class="lg:w-1/2 space-y-6">
              <div class="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                 <MapPinIcon class="h-7 w-7" />
              </div>
              <h3 class="text-4xl md:text-5xl font-black text-primary-dark leading-tight">
                 Smart Itinerary Construction.
              </h3>
              <p class="text-lg text-neutral-500 font-medium leading-relaxed">
                 Say goodbye to manual dates and rigid templates. Our custom Itinerary Builder features intelligent time-selectors, native Google Maps Autocomplete integration, and dynamic Day-by-Day blocks to craft compelling stories for your travelers instantly.
              </p>
              <ul class="space-y-4 pt-4">
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>Intelligent Day-by-Day routing</span>
                 </li>
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>Google Places API Autocomplete</span>
                 </li>
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>Bespoke custom time selectors</span>
                 </li>
              </ul>
           </div>
           <div class="lg:w-1/2 w-full perspective-1000">
              <div class="rounded-3xl p-3 bg-gray-50 border border-gray-100 shadow-2xl transform rotate-y-[-5deg] hover:rotate-y-0 transition-all duration-700">
                 <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000" alt="Itinerary Builder Destination" class="rounded-2xl w-full border border-gray-200/50 object-cover h-[450px]" />
              </div>
           </div>
        </div>

        <!-- Feature 2: WhatsApp Communications Terminal -->
        <div class="flex flex-col lg:flex-row-reverse items-center gap-16 observe-me delay-100">
           <div class="lg:w-1/2 space-y-6">
              <div class="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                 <ChatBubbleBottomCenterTextIcon class="h-7 w-7" />
              </div>
              <h3 class="text-4xl md:text-5xl font-black text-primary-dark leading-tight">
                 Agency-Level Operations Terminal.
              </h3>
              <p class="text-lg text-neutral-500 font-medium leading-relaxed">
                 Manage hundreds of travelers without missing a beat. Our wildly robust Communications Terminal brings WhatsApp-styled messaging directly into your workflow. Handle secure chats, active calls, and cross-team routing instantly.
              </p>
              <ul class="space-y-4 pt-4">
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>End-to-End Encrypted Support Line</span>
                 </li>
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>Familiar, aggressive WhatsApp-style UI</span>
                 </li>
                 <li class="flex items-center space-x-3 text-gray-900 font-bold">
                    <CheckCircleIcon class="h-6 w-6 text-green-500" /> <span>100% Mobile Responsive operations</span>
                 </li>
              </ul>
           </div>
           <div class="lg:w-1/2 w-full perspective-1000">
              <div class="rounded-3xl p-3 bg-gray-50 border border-gray-100 shadow-2xl transform rotate-y-[5deg] hover:rotate-y-0 transition-all duration-700">
                 <img src="/images/flybeth_abstract_chat.png" alt="Communications Terminal" class="rounded-2xl w-full border border-gray-200/50" />
              </div>
           </div>
        </div>

      </div>
    </section>

    <!-- Why Flybeth (Agency Value Prop) -->
    <section class="py-32 bg-primary-dark text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-[#000e24]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-90"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 observe-me">
          <h2 class="text-sm font-bold text-primary mb-4 uppercase tracking-widest">The Core Advantage</h2>
          <h3 class="text-4xl lg:text-5xl font-black text-white leading-tight">
            Why leading agents switch to Flybeth
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div class="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors">
              <BanknotesIcon class="h-10 w-10 text-primary mb-6" />
              <h4 class="text-2xl font-bold mb-4">Uncapped Margins</h4>
              <p class="text-white/60 leading-relaxed font-medium">Bypass retail platforms. We provide true B2B wholesale access across flights, stays, cruises, and custom packages—allowing you to set custom markups securely.</p>
           </div>
           <div class="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors">
              <CpuChipIcon class="h-10 w-10 text-primary mb-6" />
              <h4 class="text-2xl font-bold mb-4">Aggressive Custom Tech</h4>
              <p class="text-white/60 leading-relaxed font-medium">No laggy dropdowns or janky iFrames. Flybeth utilizes deeply custom-engineered frameworks, providing instantaneous search mapping and data retrieval natively.</p>
           </div>
           <div class="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-colors">
              <UserGroupIcon class="h-10 w-10 text-primary mb-6" />
              <h4 class="text-2xl font-bold mb-4">Unrivaled Client Optics</h4>
              <p class="text-white/60 leading-relaxed font-medium">Publish breathtaking consumer-facing itineraries that link directly with their Flybeth consumer app, giving your clients extreme confidence in your agency.</p>
           </div>
        </div>
      </div>
    </section>

    <!-- High-Impact CTA Section -->
    <section class="py-32 lg:py-48 relative overflow-hidden bg-white">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center observe-me">
        <span class="inline-block py-2.5 px-6 mb-8 rounded-full bg-primary/5 border border-primary/10 text-sm font-bold text-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          Ready to scale?
        </span>
        <h2 class="text-5xl lg:text-7xl font-black leading-tight mb-8 text-primary-dark">
          Power your agency.<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Without the overhead.</span>
        </h2>
        <p class="text-xl text-neutral-500 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
          The top tier of travel operations awaits. Start building robust itineraries, offering wholesale prices, and supporting your clients via the most advanced portal on the market.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <BaseButton to="/auth/register" size="lg" variant="primary" class="px-14 py-5 shadow-2xl shadow-primary/20 hover:scale-105 hover:-translate-y-1 transition-all duration-500 font-bold text-lg">
            Create Agent Profile
          </BaseButton>
          <a href="#" class="text-sm font-bold text-neutral-500 hover:text-primary transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-primary">Contact Partnership Team</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '@/composables/modules/auth/user'
import { 
  SparklesIcon, 
  MapPinIcon, 
  ChatBubbleBottomCenterTextIcon, 
  CheckCircleIcon, 
  BanknotesIcon, 
  CpuChipIcon, 
  UserGroupIcon, 
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const { isLoggedIn } = useUser()

const setupObserver = () => {
  if (typeof window === 'undefined') return
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
  if (isLoggedIn.value) {
    navigateTo('/dashboard')
    return
  }
  setTimeout(() => setupObserver(), 100)
})
</script>

<style scoped>
/* Base Typography Extensions */
.font-black { font-weight: 900; }

/* Reveal Animations */
.reveal-1 { opacity: 0; animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
.reveal-2 { opacity: 0; animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; }

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
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

/* Floating Elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 3s; }

/* 3D Perspective Utils */
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-\\[-5deg\\] {
  transform: rotateY(-6deg) rotateX(4deg);
}
.rotate-y-\\[5deg\\] {
  transform: rotateY(6deg) rotateX(4deg);
}
.hover\\:rotate-y-0:hover {
  transform: rotateY(0deg) rotateX(0deg);
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #FDFDFD; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
</style>
