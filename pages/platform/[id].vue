<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/auth/register" class="text-sm  text-primary hover:text-primary-dark transition-colors  ">Start booking</NuxtLink>
      </div>
    </nav> -->

    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-16">
        <div class="space-y-6">
          <span class="text-xs font-bold text-primary uppercase ">Our Platform</span>
          <h1 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
             {{ pageContent.title }}
          </h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
             {{ pageContent.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div v-for="item in pageContent.features" :key="item.title" class="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 space-y-4">
            <h3 class="text-xl  text-primary-dark">{{ item.title }}</h3>
            <p class="text-neutral-500 text-sm font-medium leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <!-- Dynamic Visual Placeholder -->
        <div class="relative bg-neutral-900 rounded-[3rem] h-[400px] overflow-hidden group">
           <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
           <img :src="pageContent.image" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
           <div class="absolute bottom-10 left-10 z-20 space-y-2">
              <span class="text-xs font-bold text-primary uppercase  bg-white/90 px-3 py-1 rounded-full">System Active</span>
              <h3 class="text-2xl font-bold text-white shadow-sm">{{ pageContent.ctaTitle }}</h3>
           </div>
        </div>
      </div>
    </section>

    <footer class="py-12 bg-neutral-50 border-t border-neutral-100 text-center">
        <p class="text-sm text-neutral-400 font-medium font-sans">© 2026 Flybeth B2B Platform.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = route.path.split('/').pop()

const content = {
  airlines: {
    title: 'Global Flights',
    description: 'Flybeth connects you directly to thousands of airlines worldwide. Book and issue tickets instantly with our straightforward pricing.',
    features: [
      { title: 'Global Airline Access', description: 'Access all major airlines in one simple search tool.' },
      { title: 'Direct Feeds', description: 'Get the best prices by connecting directly to airlines.' },
      { title: 'Instant Tickets', description: 'No waiting—tickets are issued as soon as you book.' },
      { title: 'Extra Services', description: 'Easily add seats, bags, and meals at special rates.' }
    ],
    image: 'https://images.unsplash.com/photo-1540339832862-47459980783f?auto=format&fit=crop&q=80&w=1600',
    ctaTitle: 'Take to the skies.'
  },
  properties: {
    title: 'Hotels & Stays',
    description: 'Find the perfect stay for your clients with our massive network of hotels, resorts, and apartments worldwide.',
    features: [
      { title: '1 Million+ Hotels', description: 'A huge selection of stays across every continent.' },
      { title: 'Real-time Booking', description: 'Confirm rooms instantly, even at the last minute.' },
      { title: 'Better Profits', description: 'Access direct prices and keep more of your earnings.' },
      { title: 'Easy Management', description: 'Manage all your hotel bookings in one clear dashboard.' }
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    ctaTitle: 'Premium hotel booking.'
  },
  cars: {
     title: 'Car Rentals',
     description: 'Rent vehicles anywhere in the world. From luxury cars to everyday rentals, our platform makes ground travel easy.',
     features: [
        { title: 'Global Rental Brands', description: 'Connect with Hertz, Avis, and top local providers.' },
        { title: 'Clear Pricing', description: 'Transparent rates with insurance details included.' },
        { title: 'Luxury Options', description: 'High-end vehicles available for your important clients.' }
     ],
     image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Car rentals made simple.'
  },
  transfers: {
     title: 'Airport Transfers',
     description: 'Get your travelers where they need to go with pre-booked transfers in hundreds of cities worldwide.',
     features: [
        { title: 'Global Coverage', description: 'Professional drivers in over 400 cities.' },
        { title: 'Live Tracking', description: 'Stay updated on driver status and arrivals.' },
        { title: 'Value for Money', description: 'Competitive rates for private cars and shuttles.' }
     ],
     image: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Easy airport pickups.'
  },
  api: {
     title: 'Connect via API',
     description: 'Modern tools for modern agencies. Connect your own website directly to our prices with our simple technical setup.',
     features: [
        { title: 'Modern Setup', description: 'Easily integrate our tools into your existing website.' },
        { title: 'Live Information', description: 'Get instant updates on availability and pricing.' },
        { title: 'Safe Testing', description: 'Test your setup safely in a private environment.' }
     ],
     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Power your own website.'
  }
}

const pageContent = computed(() => content[path as keyof typeof content] || content.airlines)
</script>

<style scoped>
. { font-weight: 900; }
</style>
