<template>
  <div class="bg-white p-8 lg:p-20">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <div class="space-y-4">
        <h1 class="text-5xl lg:text-7xl font-black text-primary-dark tracking-tighter leading-tight">
          Privacy statement.
        </h1>
        <p class="text-lg text-neutral-500 font-medium">Last updated: March 2026</p>
      </div>

      <!-- Content -->
      <div class="prose prose-neutral max-w-none space-y-10">
        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">1. Introduction</h2>
          <p class="text-neutral-600 leading-relaxed">
            At Flybeth, we value the trust you place in us as an agent partner. This privacy statement explains how we collect, use, and protect your information and the data of your clients when you use the Flybeth Agent Portal. Our goal is to provide a secure and transparent experience that empowers your travel business.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">2. Information collection</h2>
          <p class="text-neutral-600 leading-relaxed">
            We collect information necessary to maintain your agency profile and facilitate bookings. This includes:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-neutral-600">
            <li><strong>Agency details</strong>: Name, registration numbers, and classification.</li>
            <li><strong>Contact information</strong>: Names, email addresses, and phone numbers of agents.</li>
            <li><strong>Transactional data</strong>: Booking records, payment history, and commission data.</li>
            <li><strong>Client information</strong>: Names and travel preferences strictly for fulfillment purposes.</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">3. Data usage</h2>
          <p class="text-neutral-600 leading-relaxed">
            Your data is used to optimize our service delivery:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-neutral-600">
            <li>Fulfilling global flight and hotel bookings.</li>
            <li>Providing real-time analytics and reporting in your dashboard.</li>
            <li>Improving platform security and preventing fraudulent activity.</li>
            <li>Communicating essential network updates and regional alerts.</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">4. Data security</h2>
          <p class="text-neutral-600 leading-relaxed">
            We employ bank-grade encryption and multi-tiered security protocols to safeguard all information transmitted through our network. Access to sensitive data is strictly controlled and audited to ensure compliance with global data protection standards (such as GDPR and NDPR).
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">5. Third-party sharing</h2>
          <p class="text-neutral-600 leading-relaxed">
            Flybeth only shares data with verified third-party providers (such as airlines, hotel systems, and GDS networks) to the extent necessary to complete a requested booking or transaction. We do not sell your data to marketers.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-2xl font-black text-primary-dark tracking-tight">6. Contact us</h2>
          <p class="text-neutral-600 leading-relaxed">
            If you have any questions regarding this privacy statement, please reach out to your regional node manager or contact our compliance team at <a href="mailto:privacy@flybeth.com" class="text-secondary font-bold hover:underline">privacy@flybeth.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
