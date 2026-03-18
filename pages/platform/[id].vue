<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/auth/register" class="text-sm font-black text-primary hover:text-primary-dark transition-colors tracking-widest uppercase">Start booking</NuxtLink>
      </div>
    </nav>

    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-16">
        <div class="space-y-6">
          <h2 class="text-xs font-black text-secondary tracking-[0.4em] uppercase">Platform nodes</h2>
          <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
             {{ pageContent.title }}
          </h1>
          <p class="text-xl text-neutral-500 font-medium leading-relaxed">
             {{ pageContent.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div v-for="item in pageContent.features" :key="item.title" class="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 space-y-4">
            <h3 class="text-xl font-black text-primary-dark">{{ item.title }}</h3>
            <p class="text-neutral-500 text-sm font-medium leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <!-- Dynamic Visual Placeholder -->
        <div class="relative bg-neutral-900 rounded-[3rem] h-[400px] overflow-hidden group">
           <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
           <img :src="pageContent.image" class="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-1000" />
           <div class="absolute bottom-10 left-10 z-20 space-y-2">
              <p class="text-sm font-black text-secondary tracking-[0.4em] uppercase">Status: Node Active</p>
              <h3 class="text-3xl font-black text-white tracking-tight">{{ pageContent.ctaTitle }}</h3>
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
    title: 'Global Airlines Node',
    description: 'Flybeth connects you directly to full GDS pools and modern NDC feeds. Ticket thousands of carriers instantly with true wholesale pricing.',
    features: [
      { title: 'Full GDS Pool', description: 'Access Amadeus, Sabre, and Travelport in a single interface.' },
      { title: 'Direct NDC Feeds', description: 'Bypass GDS fees with direct-to-airline connectivity.' },
      { title: 'Instant Issuance', description: 'Automated ticketing nodes ensuring zero-delay fulfillment.' },
      { title: 'Ancillary Mapping', description: 'Sell seats, bags, and meals at wholesale rates.' }
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=1200',
    ctaTitle: 'Command the skies.'
  },
  properties: {
    title: 'Stay Distribution Node',
    description: 'Our property node aggregates inventory from HotelBeds, Expedia TAAP, and direct-contracted chains into one high-performance stay engine.',
    features: [
      { title: 'Million+ Properties', description: 'Global inventory covering every continent.' },
      { title: 'Last-minute Confirmation', description: 'Book even when inventory is critically low.' },
      { title: 'Wholesale Margins', description: 'Keep the retail markup for your agency.' },
      { title: 'Room Allocation', description: 'Manage groups and blocking through our dashboard.' }
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    ctaTitle: 'Premium lodging fulfillment.'
  },
  cars: {
     title: 'Mobility Node',
     description: 'Ground transportation at scale. From luxury rentals to functional fleets, our mobility node covers global destinations seamlessly.',
     features: [
        { title: 'Global Fleet Access', description: 'Connect with Hertz, Avis, and local niche providers.' },
        { title: 'All-inclusive Rates', description: 'Transparent pricing with insurance mappings included.' },
        { title: 'Premium Rentals', description: 'High-end vehicles for VIP traveler nodes.' }
     ],
     image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Global mobility, simplified.'
  },
  transfers: {
     title: 'Logic Logistics Node',
     description: 'Last-mile fulfillment for your travelers. Pre-booked transfers ensure a seamless transition from port to property.',
     features: [
        { title: 'Global Coverage', description: 'Pre-vetted drivers in 400+ cities worldwide.' },
        { title: 'Real-time Tracking', description: 'Status updates forwarded to your agency agents.' },
        { title: 'Competitive Sourcing', description: 'Wholesale rates for private and shared shuttles.' }
     ],
     image: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Seamless last-mile fulfillment.'
  },
  api: {
     title: 'B2B API Integration',
     description: 'Modern infrastructure for modern agencies. Connect your B2C storefront directly to our wholesale pool through our robust JSON API.',
     features: [
        { title: 'RESTful Architecture', description: 'Easily integrate into any tech stack.' },
        { title: 'Real-time Polling', description: 'Instant availability and price-locking mechanisms.' },
        { title: 'Sandbox Environment', description: 'Test your node integrations safely.' }
     ],
     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
     ctaTitle: 'Power your own storefront.'
  }
}

const pageContent = computed(() => content[path as keyof typeof content] || content.airlines)
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
