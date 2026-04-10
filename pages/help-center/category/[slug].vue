<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
    <!-- Basic Nav -->
    <nav class="bg-white border-b border-neutral-100 py-6">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        <NuxtLink to="/help-center" class="flex items-center space-x-3 group">
          <img src="@/assets/img/logo.png" class="w-auto h-10" alt="logo" />
        </NuxtLink>
        <NuxtLink to="/help-center" class="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center space-x-2">
          <ChevronLeftIcon class="h-4 w-4" />
          <span>Back to Help Center</span>
        </NuxtLink>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <div v-if="category" class="space-y-12">
        <div class="space-y-4">
          <span class="text-xs  text-primary-dark uppercase tracking-[0.2em]">Category</span>
          <h1 class="text-4xl lg:text-5xl  text-primary-dark tracking-tighter">{{ category.name }}</h1>
          <p class="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
            {{ category.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <NuxtLink 
            v-for="article in categoryArticles" 
            :key="article.id" 
            :to="`/help-center/article/${article.id}`"
            class="group p-8 bg-white border border-neutral-100 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex justify-between items-center"
          >
            <div class="space-y-2">
              <h3 class="text-xl  text-primary-dark group-hover:text-primary transition-colors">{{ article.title }}</h3>
              <p class="text-sm text-neutral-400 font-medium">Read more about this topic</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
              <ArrowRightIcon class="h-5 w-5 text-primary group-hover:text-white transition-colors" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl  text-primary-dark mb-4">Category not found</h2>
        <BaseButton to="/help-center" variant="outline">Return to Help Center</BaseButton>
      </div>
    </div>

    <!-- Simple Footer -->
    <footer class="bg-neutral-50 py-12 border-t border-neutral-100 mt-20">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm text-neutral-500 font-medium tracking-wide">© 2026 Flybeth B2B Travel Technologies. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const slug = route.params.slug as string

const categories = {
  support: {
    name: 'Support',
    description: 'Find answers to common issues and contact our dedicated support team.',
    articleIds: ['forgot-password', 'contact-us']
  },
  registration: {
    name: 'Registration',
    description: 'Learn about the agency registration process, documentation, and approval timelines.',
    articleIds: ['approval-time', 'registration-info', 'how-to-register']
  },
  about: {
    name: 'About Flybeth TAAP',
    description: 'Discover how Flybeth TAAP works, commission structures, and our competitive advantages.',
    articleIds: ['public-website', 'how-commissions-work', 'competitive-rates']
  }
}

const allArticles = {
  'forgot-password': 'What can I do if I forgot my password?',
  'contact-us': 'Contact us',
  'approval-time': 'How long does it take for my agency to be approved?',
  'registration-info': 'What information do you need during an agency registration?',
  'how-to-register': 'How do I register my travel agency?',
  'public-website': 'Can I also use the Flybeth public website to make reservations?',
  'how-commissions-work': 'How does commission work?',
  'competitive-rates': 'How are Flybeth TAAP rates competitive?'
}

const category = computed(() => categories[slug as keyof typeof categories])

const categoryArticles = computed(() => {
  if (!category.value) return []
  return category.value.articleIds.map(id => ({
    id,
    title: allArticles[id as keyof typeof allArticles]
  }))
})

// Set page meta for SEO/Prerendering
useHead({
  title: category.value ? `${category.value.name} | Help Center` : 'Category Not Found'
})
</script>

<style scoped>
. { font-weight: 900; }
</style>
