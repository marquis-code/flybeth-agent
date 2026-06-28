<template>
  <main class="body">
    <GlobalLoader />
    <NuxtLayout class="z-10">
      <NuxtPage class="z-10" />
    </NuxtLayout>
    <ChatWidget />
  </main>
</template>

<script setup>
</script>

<style>
body {
    font-family: 'Onest', sans-serif;
}
</style>