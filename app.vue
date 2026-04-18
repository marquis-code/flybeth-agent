<template>
  <main class="body">
    <GlobalLoader />
    <!-- Position the toast fixed to ensure it's always on top and aligned to the right -->
    <CoreToast class="fixed top-4 right-4 z-[9999999]" />

    <NuxtLayout class="z-10">
      <NuxtPage class="z-10" />
    </NuxtLayout>
    <ChatWidget />
  </main>
</template>

<style>
body {
    font-family: 'Onest', sans-serif;
}
</style>