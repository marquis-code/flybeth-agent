<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 lg:p-10 font-sans relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-secondary/5 to-transparent z-0"></div>
    <div class="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl z-0"></div>
    <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
    
    <div class="relative z-10 w-full max-w-xl">
      <!-- Logo -->
      <div class="flex justify-center mb-10 cursor-pointer animate-in fade-in slide-in-from-top-8 duration-700" @click="navigateTo('/')">
        <img src="@/assets/img/logo.png" class="h-12 w-auto" alt="Flybeth Logo" />
      </div>
      
      <!-- Main Content Card -->
      <div class="bg-white rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100 p-10 md:p-14 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 relative overflow-hidden group">
        <!-- Shine effect -->
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        
        <!-- Animated Icon Container -->
        <div class="relative mx-auto w-32 h-32 mb-10">
           <div class="absolute inset-0 bg-secondary/10 rounded-full animate-ping opacity-75 duration-1000"></div>
           <div class="relative bg-white w-full h-full rounded-full border-8 border-secondary/20 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105 duration-300">
             <span class="text-4xl">🎉</span>
           </div>
        </div>

        <h1 class="text-3xl md:text-4xl  text-primary-dark er mb-4">
          Welcome to the family!
        </h1>
        
        <p class="text-[15px] text-neutral-500 font-medium leading-relaxed mb-10 max-w-md mx-auto">
          We're thrilled to have you! Your application has been received successfully and is currently under review by our team.
        </p>

        <div class="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 text-left space-y-4 mb-10">
           <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                 <EnvelopeIcon class="w-5 h-5 text-orange-500" />
              </div>
              <div>
                 <h4 class="text-sm  text-primary-dark">Keep an eye on your inbox</h4>
                 <p class="text-[13px] text-neutral-400 mt-1 leading-relaxed">
                   Flybeth is currently in an exclusive preview phase. We will reach out personally via email the absolute moment we launch!
                 </p>
              </div>
           </div>
        </div>

        <div class="space-y-4">
          <BaseButton type="button" variant="primary" size="lg" class="w-full !rounded-2xl" @click="navigateTo('/')">
             Return to Homepage
          </BaseButton>
          <a href="mailto:support@flybeth.com" class="block text-xs font-bold text-neutral-400 hover:text-secondary transition-colors   mt-6">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import BaseButton from '~/components/ui/BaseButton.vue'

definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
