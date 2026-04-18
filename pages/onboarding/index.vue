<template>
  <div class="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
      
      <!-- Stepper Header -->
      <div class="mb-16">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div class="space-y-2">
             <h4 class="text-[11px]  text-secondary  ">Step {{ currentStep }} of 7</h4>
             <h1 class="text-4xl lg:text-5xl  text-primary-dark er">
               {{ steps[currentStep - 1]?.title }}
             </h1>
             <p class="text-neutral-500 font-medium max-w-xl">{{ steps[currentStep - 1]?.description }}</p>
           </div>
           
           <div class="flex items-center space-x-2">
              <div v-for="n in 7" :key="n" class="h-1.5 transition-all duration-500 rounded-full" 
                :class="[
                  n <= currentStep ? 'bg-secondary' : 'bg-neutral-100',
                  n === currentStep ? 'w-12' : 'w-6'
                ]">
              </div>
           </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-16">
        <!-- Form Section -->
        <div class="lg:col-span-8 space-y-12">
          
          <!-- Step 1: Account Creation -->
          <div v-if="currentStep === 1" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-8">
                <div class="flex items-center space-x-6 pb-8 border-b border-neutral-50">
                   <div class="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                      <CheckBadgeIcon class="w-8 h-8" />
                   </div>
                   <div>
                      <h3 class="text-xl  text-primary-dark">Account confirmed</h3>
                      <p class="text-sm font-medium text-neutral-400">Your email has been verified successfully.</p>
                   </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                   <AnimatedInput v-model="user.email" label="Email Address" disabled />
                   <AnimatedInput v-model="user.name" label="Full Name" disabled />
                </div>
                
                <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start space-x-4">
                   <InformationCircleIcon class="w-5 h-5 text-blue-500 mt-0.5" />
                   <p class="text-xs font-medium text-blue-700 leading-relaxed">
                     Your account is now ready for onboarding. Please provide the remaining details to gain full booking access.
                   </p>
                </div>
             </div>
          </div>

          <!-- Step 2: Business Information -->
          <div v-if="currentStep === 2" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-10">
               <div class="grid md:grid-cols-2 gap-8">
                  <AnimatedInput v-model="form.agencyName" label="Business Name" required />
                  <AnimatedInput v-model="form.businessRegistrationNumber" label="Registration Number" placeholder="e.g. RC 123456" required />
               </div>
               <div class="grid md:grid-cols-2 gap-8">
                  <SelectInput v-model="form.country" label="Country" :options="['Nigeria', 'USA', 'UK', 'Ghana', 'Kenya', 'South Africa', 'Canada', 'Australia', 'UAE', 'Tanzania', 'Uganda', 'Rwanda']" required />
                  <AnimatedInput v-model="form.website" label="Website / Social Media (Optional)" placeholder="https://" />
               </div>
               <div class="space-y-6">
                 <h4 class="text-[9px]  text-secondary  ">Business Address</h4>
                 <AnimatedInput v-model="form.billingAddress" label="Physical Address" required />
               </div>
            </div>
          </div>

          <!-- Step 3: Contact Information -->
          <div v-if="currentStep === 3" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-10">
               <div class="grid md:grid-cols-2 gap-8">
                  <PhoneNumberInput v-model="form.phone" label="Phone Number" required />
                  <PhoneNumberInput v-model="form.whatsappNumber" label="WhatsApp Number" />
               </div>
               <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center space-x-4 cursor-pointer" @click="matchWhatsapp">
                  <div class="w-5 h-5 rounded-md border-2 border-neutral-200 flex items-center justify-center transition-colors" :class="form.whatsappNumber === form.phone ? 'bg-secondary border-secondary' : ''">
                     <CheckIcon v-if="form.whatsappNumber === form.phone" class="w-3 h-3 text-white" />
                  </div>
                  <span class="text-xs font-bold text-neutral-500">My WhatsApp number is the same as my phone number</span>
               </div>
            </div>
          </div>

          <!-- Step 4: Identity Verification (KYC) -->
          <div v-if="currentStep === 4" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-10">
               <div class="grid md:grid-cols-2 gap-10">
                  <FileUpload 
                    v-model="form.kycDocuments.idCard" 
                    label="Government Issued ID" 
                    help-text="NIN, Voter's Card, or Passport (Image or PDF)"
                    accept="image/*,application/pdf"
                    :loading="uploadingId"
                    @change="handleIdUpload"
                  />
                  <FileUpload 
                    v-model="form.kycDocuments.selfie" 
                    label="Live Selfie" 
                    help-text="Front-facing clear photo"
                    accept="image/*,application/pdf"
                    :loading="uploadingSelfie"
                    @change="handleSelfieUpload"
                  />
               </div>
               
               <div class="flex items-start space-x-4 p-6 bg-yellow-50 rounded-2xl border border-yellow-100 text-yellow-800">
                  <ShieldCheckIcon class="w-6 h-6 text-yellow-600 shrink-0" />
                  <p class="text-sm font-medium leading-relaxed">
                    Flybeth takes security seriously. Your identity documents are encrypted and only used for verification. Ensure your ID is valid and the photo is clear.
                  </p>
               </div>
            </div>
          </div>

          <!-- Step 5: Business Documents -->
          <div v-if="currentStep === 5" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-10">
               <div v-if="form.country === 'Nigeria'" class="space-y-8">
                  <FileUpload 
                    v-model="form.businessDocuments.documentUrl" 
                    label="CAC Certificate" 
                    help-text="Certified true copy of CAC (PDF)"
                    accept="application/pdf"
                    :loading="uploadingDoc"
                    @change="handleDocUpload"
                  />
                  <AnimatedInput v-model="form.businessDocuments.ein" label="TIN / EIN (Optional)" />
               </div>
               <div v-else class="space-y-8">
                  <FileUpload 
                    v-model="form.businessDocuments.documentUrl" 
                    label="Registration Documents" 
                    help-text="LLC, Incorporation or Business License"
                    accept="application/pdf"
                    :loading="uploadingDoc"
                    @change="handleDocUpload"
                  />
                  <AnimatedInput v-model="form.businessDocuments.ein" label="EIN / Tax ID (Required)" />
               </div>
            </div>
          </div>

          <!-- Step 6: Payment & Billing -->
          <div v-if="currentStep === 6" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-10">
               <div class="grid md:grid-cols-2 gap-8">
                  <SelectInput 
                    v-model="form.bankDetails.bankName" 
                    label="Payout Bank" 
                    :options="['Access Bank', 'GTBank', 'Zenith Bank', 'UBA', 'Chase', 'Wells Fargo']" 
                    required 
                  />
                  <AnimatedInput v-model="form.bankDetails.accountNumber" label="Account Number" required />
               </div>
               <AnimatedInput v-model="form.bankDetails.accountName" label="Account Holder Name" required />
               
               <div class="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start space-x-4">
                  <BanknotesIcon class="w-6 h-6 text-neutral-400 mt-1" />
                  <div>
                    <h5 class="text-xs  text-primary-dark   mb-1">Payout Policy</h5>
                    <p class="text-[10px] text-neutral-500 font-medium leading-relaxed">
                      All agency commissions and refunds are processed to this account. Payouts are reconciled every Tuesday and Thursday.
                    </p>
                  </div>
               </div>
            </div>
          </div>

          <!-- Step 7: Terms & Submission -->
          <div v-if="currentStep === 7" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div class="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-8">
               <div class="space-y-6">
                 <div class="flex items-start space-x-4 p-4 hover:bg-neutral-50 rounded-2xl transition-colors cursor-pointer group" @click="form.termsAgreed = !form.termsAgreed">
                    <div class="w-6 h-6 rounded-lg border-2 border-neutral-200 mt-0.5 flex items-center justify-center transition-all" :class="form.termsAgreed ? 'bg-secondary border-secondary rotate-0' : 'rotate-45'">
                       <CheckIcon v-if="form.termsAgreed" class="w-4 h-4 text-white" />
                    </div>
                    <div>
                       <p class="text-sm  text-primary-dark">Accept Platform Policies</p>
                       <p class="text-xs text-neutral-400 font-medium leading-relaxed pr-4">
                         I agree to Flybeth's Terms & Conditions, Service Fees, Refund Policy, and Fraud Prevention Policy. I confirm that all provided information is accurate.
                       </p>
                    </div>
                 </div>
               </div>

               <div class="p-10 bg-primary-dark rounded-[2.5rem] relative overflow-hidden group">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>
                  <div class="relative z-10 text-center space-y-6">
                     <SparklesIcon class="w-12 h-12 text-secondary mx-auto mb-4 animate-pulse" />
                     <h3 class="text-2xl  text-white">Ready to join the network?</h3>
                     <p class="text-white/60 text-sm max-w-sm mx-auto font-medium">After submission, our team will review your application within 24-48 hours.</p>
                  </div>
               </div>
            </div>
          </div>

          <!-- Navigation Controls -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-100">
             <button 
               v-if="currentStep > 1" 
               class="text-sm  text-neutral-400 hover:text-primary-dark  transition-colors flex items-center "
               @click="prevStep"
             >
               <ArrowLeftIcon class="w-4 h-4 mr-3" />
               Go Back
             </button>
             <div v-else></div>

             <BaseButton 
               size="lg" 
               variant="primary" 
               class="px-14 py-4 w-full sm:w-auto shadow-xl shadow-primary/20"
               :loading="loading"
               @click="handleNext"
             >
               {{ currentStep === 7 ? 'Submit Application' : 'Continue' }}
               <ArrowRightIcon v-if="currentStep < 7" class="w-4 h-4 ml-3" />
             </BaseButton>
          </div>
        </div>

        <!-- Sidebar / Context -->
        <div class="lg:col-span-4 space-y-10">
          <div class="p-10 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
             
             <h4 class="text-[9px]  text-secondary   mb-8">Agent Assistant</h4>
             <div class="space-y-8">
                <div class="flex items-start space-x-4">
                   <div class="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <QuestionMarkCircleIcon class="w-5 h-5" />
                   </div>
                   <div>
                      <h5 class="text-sm  text-primary-dark mb-1">Need help?</h5>
                      <p class="text-xs text-neutral-500 font-medium leading-relaxed">{{ assistantTip }}</p>
                   </div>
                </div>
                
                <div class="pt-8 border-t border-neutral-50">
                   <p class="text-[10px]  text-neutral-300   mb-4">Your Progress</p>
                   <div class="space-y-4">
                      <div v-for="(s, idx) in steps" :key="idx" class="flex items-center space-x-3">
                         <div class="w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-500"
                           :class="[
                             idx + 1 < currentStep ? 'bg-green-500 border-green-500' : 
                             idx + 1 === currentStep ? 'border-secondary' : 'border-neutral-100'
                           ]">
                            <CheckIcon v-if="idx + 1 < currentStep" class="w-3 h-3 text-white" />
                         </div>
                         <span class="text-[11px] font-bold transition-colors"
                           :class="idx + 1 === currentStep ? 'text-primary-dark' : 'text-neutral-300'">
                           {{ s.title }}
                         </span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div class="p-8 bg-neutral-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-neutral-200">
             <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <LockClosedIcon class="w-6 h-6 text-secondary" />
             </div>
             <h4 class="text-xl  ">Trusted & Secure.</h4>
             <p class="text-white/50 text-xs font-medium leading-relaxed">
               Flybeth uses advanced encryption to protect your agency's data. We are PCI-DSS compliant and adhere to GDPR standards.
             </p>
             <button class="text-[11px]  text-secondary   hover:underline">View security whitepaper</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  CheckBadgeIcon, 
  CheckIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  PhoneIcon,
  DocumentIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/vue/24/solid'
import AnimatedInput from '~/components/ui/AnimatedInput.vue'
import SelectInput from '~/components/ui/SelectInput.vue'
import PhoneNumberInput from '~/components/ui/PhoneNumberInput.vue'
import FileUpload from '~/components/ui/FileUpload.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useUser } from '@/composables/modules/auth/user'
import { useTenants } from '@/composables/modules/tenants/useTenants'
import { useUpload } from '@/composables/core/useUpload'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { user } = useUser()
const { updateOnboarding, loading, getTenant } = useTenants()
const { uploadImage, uploadDocument } = useUpload()
const { showToast } = useCustomToast()

const currentStep = ref(1)
const uploadingId = ref(false)
const uploadingSelfie = ref(false)
const uploadingDoc = ref(false)

const form = ref({
  agencyName: '',
  businessRegistrationNumber: '',
  country: 'Nigeria',
  website: '',
  billingAddress: '',
  phone: '',
  whatsappNumber: '',
  kycDocuments: {
    idCard: '',
    selfie: ''
  },
  businessDocuments: {
    documentUrl: '',
    ein: '',
    type: 'CAC'
  },
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: '',
    routingNumber: ''
  },
  termsAgreed: false
})

onMounted(async () => {
  if (user.value?.tenant) {
    const data = await getTenant(user.value.tenant)
    if (data) {
      currentStep.value = data.onboardingStep || 1
      form.value = { ...form.value, ...data }
      form.value.agencyName = data.name || ''
    }
  }
})

const steps = [
  { title: 'Account Creation', description: 'Confirm your credentials and email verification.' },
  { title: 'Business Information', description: 'Tell us about your travel agency and its registration.' },
  { title: 'Contact Information', description: 'How can we reach you and send critical search alerts?' },
  { title: 'Identity Verification', description: 'Securely verify the agency owner or director.' },
  { title: 'Business Documents', description: 'Upload legal documents to activate global booking feeds.' },
  { title: 'Payment & Billing', description: 'Secure bank details for your commission payouts.' },
  { title: 'Terms & Submission', description: 'Finalize your application for admin review.' }
]

const assistantTip = computed(() => {
  switch (currentStep.value) {
    case 2: return "For Nigeria, use your CAC Registration Number. For USA, use your LLC/Inc number."
    case 4: return "Ensure the ID is well-lit and all text is readable. High-quality images speed up approval."
    case 5: return form.value.country === 'Nigeria' ? "Upload your CAC Certificate (Part A). PDF format is preferred." : "An EIN is required for all agencies based outside of Africa."
    case 6: return "Commissions are paid in your selected business currency. Ensure the account name matches the business or owner name."
    default: return "Complete all required fields to proceed. You can save and return at any time."
  }
})

const matchWhatsapp = () => {
    form.value.whatsappNumber = form.value.phone
}

const handleIdUpload = async (file: File) => {
    uploadingId.value = true
    try {
        const res = await uploadImage(file)
        form.value.kycDocuments.idCard = res.url
    } finally {
        uploadingId.value = false
    }
}

const handleSelfieUpload = async (file: File) => {
    uploadingSelfie.value = true
    try {
        const res = await uploadImage(file)
        form.value.kycDocuments.selfie = res.url
    } finally {
        uploadingSelfie.value = false
    }
}

const handleDocUpload = async (file: File) => {
    uploadingDoc.value = true
    try {
        const res = await uploadDocument(file)
        form.value.businessDocuments.documentUrl = res.url
    } finally {
        uploadingDoc.value = false
    }
}

const handleNext = async () => {
  if (currentStep.value < 7) {
    await saveProgress()
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    // Submit
    if (!form.value.termsAgreed) {
        showToast({
            title: 'Terms Required',
            message: 'You must accept the platform policies before submitting your application.',
            toastType: 'error',
        })
        return
    }
    await saveProgress()
    navigateTo('/dashboard')
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const saveProgress = async () => {
    if (user.value?.tenant) {
        await updateOnboarding(user.value.tenant, {
            ...form.value,
            step: currentStep.value,
            name: form.value.agencyName
        })
    }
}
</script>

<style scoped>
. { font-weight: 900; }

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 10px;
}
</style>
