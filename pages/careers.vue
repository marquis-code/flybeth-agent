<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Header -->
    <nav class="bg-white border-b border-neutral-100 py-6 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/contact" class="text-sm font-black text-primary hover:text-primary-dark transition-colors tracking-widest uppercase truncate">Speak to an advisor</NuxtLink>
      </div>
    </nav>

    <section class="py-24 bg-white relative">
      <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-16">
        <div class="space-y-6">
          <h2 class="text-xs font-black text-secondary tracking-[0.4em] uppercase">Join the network</h2>
          <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
             Careers in <br />
             <span class="text-primary italic">travel tech.</span>
          </h1>
          <p class="text-xl text-neutral-500 font-medium leading-relaxed">
             We are building the world's most intelligent B2B travel infrastructure. Join a remote-first team of experts, engineers, and visionaries.
          </p>
        </div>

        <!-- Open Roles -->
        <div class="space-y-10 pt-10">
          <h3 class="text-2xl font-black text-primary-dark tracking-tight">Open roles</h3>
          <div class="space-y-4">
             <div v-for="role in roles" :key="role.title" class="group bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                <div class="space-y-1">
                   <h4 class="text-xl font-black text-primary-dark group-hover:text-primary transition-colors">{{ role.title }}</h4>
                   <p class="text-sm font-bold text-neutral-400 tracking-widest uppercase">{{ role.location }} • {{ role.type }}</p>
                </div>
                <div class="flex items-center space-x-2 text-primary">
                    <span class="text-sm font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Apply now</span>
                    <ChevronRightIcon class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </div>
        </div>

        <div class="bg-neutral-50 rounded-[3rem] p-10 lg:p-14 border border-neutral-100 text-center space-y-8">
           <h3 class="text-3xl font-black text-primary-dark tracking-tight">Don't see a fit?</h3>
           <p class="text-neutral-500 text-lg font-medium leading-relaxed max-w-xl mx-auto">
             We are always looking for exceptional talent in the GDS, NDC, and travel logistics space. Send your portfolio to our recruitment node.
           </p>
           <a href="mailto:careers@flybeth.com" class="inline-block px-10 py-4 bg-primary text-white font-black tracking-widest uppercase rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
             careers@flybeth.com
           </a>
        </div>
      </div>
    </section>

    <footer class="py-12 bg-white text-center text-sm font-medium text-neutral-400 border-t border-neutral-100">
        © 2026 Flybeth Careers. Remote-first since Day 1.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

const roles = [
  { title: 'Senior B2B Engineer', location: 'Remote', type: 'Full-time' },
  { title: 'Regional node manager (EMEA)', location: 'Lagos/Remote', type: 'Full-time' },
  { title: 'Global inventory analyst', status: 'online', location: 'Remote', type: 'Contract' },
  { title: 'NDC implementation specialist', location: 'Remote', type: 'Full-time' }
]
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
