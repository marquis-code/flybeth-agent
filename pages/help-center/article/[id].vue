<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Basic Nav -->
    <nav class="bg-white border-b border-neutral-100 py-6">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        <NuxtLink to="/help-center" class="flex items-center space-x-2 group">
          <ChevronLeftIcon class="h-5 w-5 text-primary group-hover:-translate-x-1 transition-transform" />
          <span class="text-sm font-bold text-primary">Back to help center</span>
        </NuxtLink>
        <img src="@/assets/img/logo.png" class="w-auto h-8" alt="logo" />
      </div>
    </nav>

    <!-- Article Content -->
    <article class="max-w-3xl mx-auto px-6 py-20">
      <div v-if="article" class="space-y-10">
        <div class="space-y-4">
          <p class="text-sm  text-secondary tracking-widest">{{ article.category }}</p>
          <h1 class="text-4xl lg:text-5xl  text-primary-dark tracking-tight leading-tight">
            {{ article.title }}
          </h1>
        </div>

        <div class="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-6">
          <div v-html="article.content"></div>
        </div>

        <!-- Feedback Section -->
        <div class="pt-12 border-t border-neutral-100 mt-20">
          <div class="bg-neutral-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p class="font-bold text-primary-dark">Was this article helpful?</p>
            <div class="flex items-center space-x-4">
              <button @click="handleFeedback('yes')" class="px-6 py-2 bg-white border border-neutral-200 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all">Yes</button>
              <button @click="handleFeedback('no')" class="px-6 py-2 bg-white border border-neutral-200 rounded-xl font-bold text-sm hover:border-red-500 hover:text-red-500 transition-all">No</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20">
        <p class="text-xl font-bold text-neutral-400">Article not found.</p>
        <NuxtLink to="/help-center" class="text-primary font-bold hover:underline mt-4 inline-block">Return to help center</NuxtLink>
      </div>
    </article>

    <footer class="bg-neutral-50 py-12 border-t border-neutral-100 mt-20">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm text-neutral-500 font-medium font-sans">© 2026 Flybeth B2B Travel Technologies.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const articleId = route.params.id as string

const articles = {
  'forgot-password': {
    title: 'What can I do if I forgot my password?',
    category: 'Support',
    content: `
      <p>If you've forgotten your Flybeth Agent Portal password, don't worry. You can reset it in a few simple steps:</p>
      <ol>
        <li>Go to the <strong>Sign In</strong> page.</li>
        <li>Click on the <strong>Recover password</strong> link below the password field.</li>
        <li>Enter the email address associated with your agent account.</li>
        <li>Check your inbox for a password reset link.</li>
        <li>Follow the instructions in the email to create a new secure password.</li>
      </ol>
      <p>Providing valid identification might be required if multi-factor authentication is active on your node.</p>
    `
  },
  'approval-time': {
    title: 'How long does it take for my agency to be approved?',
    category: 'Registration',
    content: `
      <p>We aim to review and approve all agency applications within 24 to 48 business hours. During this period, our verification team validates your agency credentials and licensing.</p>
      <p>You will receive an automated email notification once your account has been activated. If additional information is required, a regional node manager will contact you directly.</p>
    `
  },
  'how-commissions-work': {
    title: 'How does commission work?',
    category: 'About Flybeth TAAP',
    content: `
      <p>Flybeth operates on a net-rate model, which means the prices you see are already wholesale. You can add your own markup or agency fee during the checkout process.</p>
      <p>For specific airline or hotel property partners, a direct commission back-end may be available. These commissions are typically settled on a monthly cycle via your registered payment method.</p>
    `
  }
}

const article = computed(() => articles[articleId as keyof typeof articles])

const handleFeedback = (type: 'yes' | 'no') => {
  alert(type === 'yes' ? 'Thank you for your feedback!' : 'We are sorry to hear that. Please contact support for more help.')
}
</script>

<style scoped>
. { font-weight: 900; }
</style>
