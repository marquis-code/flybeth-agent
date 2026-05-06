<template>
  <main class="body">
    <GlobalLoader />
    <!-- Position the toast fixed to ensure it's always on top and aligned to the right -->


    <NuxtLayout class="z-10">
      <NuxtPage class="z-10" />
    </NuxtLayout>
    <ChatWidget />

    <!-- Global Auth Modal — appears on 401 instead of redirecting -->
    <AuthModal :is-open="showAuthModal" @close="showAuthModal = false" @authenticated="onReAuthenticated" />
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AuthModal from '@/components/ui/AuthModal.vue'
import { authEventTarget } from '@/api_factory/axios.config'

const showAuthModal = ref(false)

const handleAuthRequired = () => {
  showAuthModal.value = true
}

const onReAuthenticated = () => {
  showAuthModal.value = false
  // Session restored — the agent can retry their action
}

onMounted(() => {
  authEventTarget.addEventListener('auth:required', handleAuthRequired)
})

onBeforeUnmount(() => {
  authEventTarget.removeEventListener('auth:required', handleAuthRequired)
})
</script>

<style>
body {
    font-family: 'Onest', sans-serif;
}
</style>