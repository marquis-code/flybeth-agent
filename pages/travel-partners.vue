<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden pb-32">
    <!-- Hero -->
    <section class=" pb-20 bg-[#fafaf9] relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
        <span class="inline-block text-xs font-bold text-primary uppercase tracking-widest">Our Network</span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
          We work with the <br />
          <span class="text-primary">world's best brands.</span>
        </h1>
        <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Our partnerships with 65,000+ airlines, hotels, and travel brands give our agents access to inventory and pricing that others can only dream of.
        </p>
        <BaseButton to="/auth/register" size="md" variant="primary" class="px-10 py-3 font-bold text-sm shadow-lg shadow-primary/20">Become a Partner</BaseButton>
      </div>
    </section>

    <!-- Partner Carousel (3 rows, no grayscale) -->
    <section class="py-24 bg-white overflow-hidden relative border-y border-neutral-100">
      <!-- Row 1 -->
      <div class="flex space-x-16 animate-scroll-left mb-12 px-10">
        <div v-for="n in 2" :key="'r1-'+n" class="flex items-center space-x-16 flex-shrink-0">
          <div v-for="p in partners.slice(0, 9)" :key="p.name" class="flex flex-col items-center space-y-3 group">
             <div class="h-20 w-44 bg-neutral-50 rounded-2xl flex items-center justify-center p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-white border border-neutral-100">
                <img :src="p.logo" class="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500" :alt="p.name" />
             </div>
             <span class="text-xs font-bold text-neutral-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{{ p.name }}</span>
          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex space-x-16 animate-scroll-right mb-12 px-10">
        <div v-for="n in 2" :key="'r2-'+n" class="flex items-center space-x-16 flex-shrink-0">
          <div v-for="p in partners.slice(9, 18)" :key="p.name" class="flex flex-col items-center space-y-3 group">
             <div class="h-20 w-44 bg-neutral-50 rounded-2xl flex items-center justify-center p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-white border border-neutral-100">
                <img :src="p.logo" class="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500" :alt="p.name" />
             </div>
             <span class="text-xs font-bold text-neutral-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{{ p.name }}</span>
          </div>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="flex space-x-16 animate-scroll-left px-10">
        <div v-for="n in 2" :key="'r3-'+n" class="flex items-center space-x-16 flex-shrink-0">
          <div v-for="p in partners.slice(18)" :key="p.name" class="flex flex-col items-center space-y-3 group">
             <div class="h-20 w-44 bg-neutral-50 rounded-2xl flex items-center justify-center p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-white border border-neutral-100">
                <img :src="p.logo" class="h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500" :alt="p.name" />
             </div>
             <span class="text-xs font-bold text-neutral-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{{ p.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Partner with Us -->
    <section class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex flex-col lg:flex-row items-center gap-20">
           <div class="lg:w-1/2">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] group">
                 <img src="/images/redesign/hero_team_collab.png" alt="Partnership" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
           </div>
           <div class="lg:w-1/2 space-y-8 order-first lg:order-none">
              <span class="text-xs font-bold text-primary uppercase tracking-widest">Why Partner With Flybeth</span>
              <h2 class="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                Reach agents who are <br />
                <span class="text-primary">ready to sell.</span>
              </h2>
              <p class="text-lg text-neutral-500 font-medium leading-relaxed">
                Our marketplace connects your brand to a global network of active travel professionals. More visibility, more bookings, zero complexity.
              </p>
              <div class="grid grid-cols-2 gap-8 pt-4">
                 <div v-for="s in stats" :key="s.label" class="space-y-1">
                    <p class="text-3xl  text-primary">{{ s.value }}</p>
                    <p class="text-xs font-bold text-neutral-400 uppercase tracking-widest">{{ s.label }}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-neutral-900 text-white text-center relative overflow-hidden">
       <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
       <div class="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <h2 class="text-4xl lg:text-5xl font-bold">Want to partner with us?</h2>
          <p class="text-white/60 text-lg font-medium">Get your brand in front of 65,000+ active travel agents worldwide.</p>
          <BaseButton to="/contact" size="md" variant="primary" class="px-12 py-4 font-bold text-sm shadow-2xl shadow-primary/40">Start the Conversation</BaseButton>
       </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const partners = [
  { name: 'Aegean Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/AegeanLogo-1.png' },
  { name: 'Air Canada', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_2_air_canada_large.png' },
  { name: 'Air India', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_3_air_india_large.png' },
  { name: 'American Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_4_american_airline_larges.png' },
  { name: 'Avis', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_11_avis_large.png' },
  { name: 'Budget', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_14_budget_large.png' },
  { name: 'Carnival', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_17_carnival_large.png' },
  { name: 'Dollar Car Rental', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_10_dollar_car_rental_large.png' },
  { name: 'Emerald Cruises', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_13_emerald_cruises_large.png' },
  { name: 'Etihad', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_6_etihad_large.png' },
  { name: 'Hertz', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_15_hertz_large.png' },
  { name: 'Hilton', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_24_hilton_large.png' },
  { name: 'Hyatt', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_26_hyatt_large.png' },
  { name: 'Lufthansa', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_7_lufthansa_large.png' },
  { name: 'Four Seasons', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_1_four_season_large.png' },
  { name: 'Princess Cruises', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_29_Princess_large.png' },
  { name: 'Marriott Bonvoy', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_27_marriott_bonvoy_large.png' },
  { name: 'National', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_12_national_large.png' },
  { name: 'Norwegian Cruise Line', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_18_norwegian_cruise_line_large.png' },
  { name: 'Qatar Airways', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_8_qatar_large.png' },
  { name: 'Radisson Hotels', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_22_radisson_hotels_large.png' },
  { name: 'Royal Caribbean', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_20_royal_caribbean_large.png' },
  { name: 'Singapore Airlines', logo: 'https://www.mondee.com/app/uploads/2024/02/Singapore-Airlines-3-1.png' },
  { name: 'The Ritz-Carlton', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_28_the_ritz_carlton_large.png' },
  { name: 'United Airlines', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_9_united_large.png' },
  { name: 'Voyages', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_21_voyages_large.png' },
  { name: 'Wyndham Hotels & Resorts', logo: 'https://www.mondee.com/app/uploads/2023/11/c_partner_icon_23_wyndham_hotels_resorts_large.png' },
]

const stats = [
  { value: '65K+', label: 'Active Agents' },
  { value: '180+', label: 'Countries' },
  { value: '$2.5B', label: 'Booking Volume' },
  { value: '99.9%', label: 'Uptime' }
]
</script>

<style scoped>
.animate-scroll-left {
  display: flex;
  width: max-content;
  animation: scroll-left 50s linear infinite;
}

.animate-scroll-right {
  display: flex;
  width: max-content;
  animation: scroll-right 50s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>
