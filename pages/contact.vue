<template>
  <div class="bg-white">
    

    <section class="py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <!-- Left: Contact Details -->
        <div class="space-y-12">
          <div class="space-y-6">
            <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
              Let's build your <br />
              <span class="text-primary italic">travel empire.</span>
            </h1>
            <p class="text-xl text-neutral-500 font-medium leading-relaxed max-w-lg">
              Our expert support team and node managers are available 24/7 to assist with onboardings, API integrations, and complex bookings.
            </p>
          </div>

          <div class="space-y-8">
            <div class="flex items-start space-x-6 group">
              <div class="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary border border-neutral-100 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <EnvelopeIcon class="h-6 w-6" />
              </div>
              <div>
                <p class="text-sm font-black text-neutral-400 tracking-widest uppercase mb-1">Direct support</p>
                <a href="mailto:support@flybeth.com" class="text-xl font-bold text-primary-dark hover:text-primary transition-colors">support@flybeth.com</a>
              </div>
            </div>

            <div class="flex items-start space-x-6 group">
              <div class="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-secondary border border-neutral-100 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm">
                <MapPinIcon class="h-6 w-6" />
              </div>
              <div>
                <p class="text-sm font-black text-neutral-400 tracking-widest uppercase mb-1">Global headquarters</p>
                <p class="text-xl font-bold text-primary-dark">Lagos, Nigeria</p>
                <p class="text-neutral-500 font-medium mt-1">Serving the global agent community across all nodes.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="bg-neutral-50 rounded-[3rem] p-10 lg:p-14 border border-neutral-100 shadow-2xl shadow-neutral-200/50">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-neutral-400 tracking-widest uppercase px-1">First name</label>
                <input v-model="form.firstName" type="text" class="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold transition-all" placeholder="Jane" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black text-neutral-400 tracking-widest uppercase px-1">Last name</label>
                <input v-model="form.lastName" type="text" class="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold transition-all" placeholder="Doe" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-black text-neutral-400 tracking-widest uppercase px-1">Email address</label>
              <input v-model="form.email" type="email" class="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold transition-all" placeholder="jane@agency.com" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-black text-neutral-400 tracking-widest uppercase px-1">Agency name</label>
              <input v-model="form.agency" type="text" class="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold transition-all" placeholder="Travel Elite World" />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-black text-neutral-400 tracking-widest uppercase px-1">Message</label>
              <textarea v-model="form.message" rows="4" class="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold transition-all" placeholder="Tell us how we can support your growth..."></textarea>
            </div>

            <BaseButton type="submit" variant="primary" size="lg" block class="py-5 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" :loading="loading">
              Send transmission
            </BaseButton>
          </form>
        </div>
      </div>
    </section>

    <!-- Map/Secondary View -->
    <section class="pb-32 px-6">
      <div class="max-w-7xl mx-auto h-[400px] bg-neutral-100 rounded-[3rem] overflow-hidden grayscale relative border border-neutral-200 shadow-inner">
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex flex-col items-center">
               <GlobeAmericasIcon class="h-24 w-24 text-neutral-300 mb-4 animate-pulse" />
               <p class="text-lg font-black text-neutral-400 tracking-widest">Global distribution network active</p>
            </div>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { EnvelopeIcon, MapPinIcon, GlobeAmericasIcon } from '@heroicons/vue/24/outline'

const loading = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  agency: '',
  message: ''
})

const handleSubmit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Thank you! Your inquiry has been received. A node manager will contact you within 4 hours.')
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.agency = ''
    form.message = ''
  }, 1500)
}
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
