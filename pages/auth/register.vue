<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 lg:p-10 font-sans">
    <div class="max-w-7xl w-full grid lg:grid-cols-2 gap-12 bg-white rounded-[3rem] border border-neutral-100 shadow-2xl shadow-neutral-100 min-h-[85vh]">
      <!-- Agency Advantage Section -->
      <div class="hidden lg:flex flex-col justify-between p-10 bg-neutral-50 relative group">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div class="relative z-10 flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
           <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>

        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl  font-black text-primary-dark leading-tight tracking-tighter">
            Scale Your <br />
            Agency Without <br />
            <span class="text-secondary">Limits.</span>
          </h2>
          <p class="text-lg text-neutral-400 font-medium max-w-md border-l-2 border-secondary/20 pl-6 leading-relaxed">
            Join the Flybeth Agent Network and unlock global wholesale rates across flights and luxury stays.
          </p>
        </div>

        <div class="relative z-10 space-y-6 pt-12 border-t border-neutral-200/50">
          <div v-for="perk in perks" :key="perk.title" class="flex items-start space-x-4">
            <div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <CheckIcon class="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p class="text-xs font-black text-primary-dark tracking-widest">{{ perk.title }}</p>
              <p class="text-[11px] text-neutral-400 mt-1">{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form Section -->
      <div class="p-8 lg:p-12 flex flex-col justify-center bg-white overflow-y-auto max-h-screen">
        <div class="max-w-xl w-full mx-auto space-y-8">
          <div class="space-y-2">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-black uppercase tracking-widest text-secondary">Step {{ currentStep }} of 7</span>
              <div class="flex space-x-1">
                <div v-for="s in 7" :key="s" :class="['h-1 w-6 rounded-full transition-all duration-500', s <= currentStep ? 'bg-secondary' : 'bg-neutral-100']"></div>
              </div>
            </div>
            <h1 class="text-3xl font-black text-primary-dark tracking-tighter">{{ stepTitles[currentStep-1] }}</h1>
            <p class="text-neutral-400 text-sm font-medium">{{ stepDescriptions[currentStep-1] }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Step 1: Account Creation -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="relative">
                <AnimatedInput v-model="form.email" label="Email Address" type="email" required />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="We'll use this for account security and to send your verification code." />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <AnimatedInput v-model="form.password" label="Password" type="password" required />
                <AnimatedInput v-model="form.confirmPassword" label="Confirm Password" type="password" required />
              </div>
            </div>

            <!-- Step 2: Business Information -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="relative">
                <AnimatedInput v-model="form.agencyName" label="Business Name" required />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="The legal name of your travel agency as registered with corporate authorities." />
                </div>
              </div>
              <div class="relative">
                <AnimatedInput v-model="form.registrationNumber" label="Registration Number" required />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="Enter your official business registration number (e.g., RC Number for Nigeria or EIN for US). This is used for verification." />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <SelectInput v-model="form.country" label="Country" :options="countries" required />
                <AnimatedInput v-model="form.website" label="Website / Social (Optional)" />
              </div>
              <GoogleAddressAutocomplete 
                v-model="form.businessAddress" 
                label="Business Address" 
                placeholder="Start typing your address..." 
                :api-key="(runtimeConfig.public.googleMapsApiKey as string)"
                @address-selected="handleAddressSelected"
              />
            </div>

            <!-- Step 3: Contact Information -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <AnimatedInput v-model="form.firstName" label="Contact First Name" required />
                <AnimatedInput v-model="form.lastName" label="Contact Last Name" required />
              </div>
              <AnimatedInput v-model="form.phone" label="Phone Number" type="tel" required />
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <input type="checkbox" v-model="sameAsPhone" class="rounded border-neutral-200 text-secondary focus:ring-secondary">
                  <span class="text-xs text-neutral-400 font-medium">WhatsApp same as phone</span>
                </div>
                <AnimatedInput v-if="!sameAsPhone" v-model="form.whatsappNumber" label="WhatsApp Number" type="tel" />
              </div>
            </div>

            <!-- Step 4: Identity Verification (KYC) -->
            <div v-if="currentStep === 4" class="space-y-6">
              <div class="p-8 border-2 border-dashed border-neutral-100 rounded-[2rem] text-center space-y-4 hover:border-secondary/20 transition-all group relative">
                <div v-if="form.idCardUrl" class="absolute inset-0 z-0">
                  <img :src="form.idCardUrl" class="w-full h-full object-cover opacity-20" />
                </div>
                <div class="relative z-10">
                  <div class="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <DocumentIcon class="w-8 h-8 text-secondary" />
                  </div>
                  <h4 class="text-sm font-black text-primary-dark">Government ID Upload</h4>
                  <p class="text-xs text-neutral-400">Upload clear, valid document (JPG/PDF)</p>
                  <input type="file" @change="handleFileUpload($event, 'image', 'idCard')" class="hidden" id="idUpload" accept="image/*,application/pdf">
                  <BaseButton :loading="uploadingFields.idCard" type="button" variant="secondary" size="sm" @click="$el.querySelector('#idUpload').click()" class="mt-4">
                    {{ form.idCardUrl ? 'Change File' : 'Choose File' }}
                  </BaseButton>
                  <p v-if="form.idCardUrl" class="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-widest">Document Uploaded ✓</p>
                </div>
              </div>

              <div class="p-8 border-2 border-dashed border-neutral-100 rounded-[2rem] text-center space-y-4 hover:border-secondary/20 transition-all group relative">
                <div v-if="form.selfieUrl" class="absolute inset-0 z-0">
                  <img :src="form.selfieUrl" class="w-full h-full object-cover opacity-20" />
                </div>
                <div class="relative z-10">
                  <div class="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CameraIcon class="w-8 h-8 text-secondary" />
                  </div>
                  <h4 class="text-sm font-black text-primary-dark">Selfie Verification</h4>
                  <p class="text-xs text-neutral-400">Capture a clear photo of your face</p>
                  <input type="file" @change="handleFileUpload($event, 'image', 'selfie')" class="hidden" capture="user" id="selfieUpload" accept="image/*">
                  <BaseButton :loading="uploadingFields.selfie" type="button" variant="secondary" size="sm" @click="$el.querySelector('#selfieUpload').click()" class="mt-4">
                    {{ form.selfieUrl ? 'Change Photo' : 'Capture Photo' }}
                  </BaseButton>
                  <p v-if="form.selfieUrl" class="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-widest">Selfie Captured ✓</p>
                </div>
              </div>
            </div>

            <!-- Step 5: Business Documents -->
            <div v-if="currentStep === 5" class="space-y-8">
              <div v-if="form.country === 'Nigeria'" class="space-y-6">
                <div class="flex items-center justify-between">
                   <h4 class="text-xs font-black text-secondary uppercase tracking-widest">Nigeria Compliance (CAC)</h4>
                   <InfoTooltip text="Corporate Affairs Commission certificate is required for all Nigerian businesses." />
                </div>
                <div class="p-10 border-2 border-dashed border-neutral-100 rounded-[2.5rem] text-center space-y-6 group relative transition-all hover:border-secondary/20">
                  <div v-if="form.cacCertificateUrl" class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-secondary/5 z-0"></div>
                  </div>
                  <div class="relative z-10">
                    <div class="w-20 h-20 bg-secondary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                      <DocumentTextIcon class="w-10 h-10 text-secondary" />
                    </div>
                    <p class="text-sm font-black text-primary-dark tracking-tight">CAC Registration Certificate</p>
                    <p class="text-xs text-neutral-400 max-w-[200px] mx-auto leading-relaxed">Ensure the document clearly shows the RC Number and Seal.</p>
                    <input type="file" @change="handleFileUpload($event, 'document', 'cacCertificate')" class="hidden" id="cacUpload" accept="application/pdf,image/*">
                    <BaseButton :loading="uploadingFields.cacCertificate" type="button" variant="secondary" size="sm" @click="$el.querySelector('#cacUpload').click()" class="mt-4">
                      {{ form.cacCertificateUrl ? 'Replace Certificate' : 'Choose Certificate' }}
                    </BaseButton>
                    <div v-if="form.cacCertificateUrl" class="mt-4 pt-4 border-t border-neutral-100">
                       <span class="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center justify-center">
                         <CheckCircleIcon class="w-3 h-3 mr-1" /> Document Verified locally
                       </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="form.country === 'United States'" class="space-y-8">
                <div class="flex items-center justify-between">
                   <h4 class="text-xs font-black text-secondary uppercase tracking-widest">USA Compliance (LLC)</h4>
                   <InfoTooltip text="Provide your LLC formation documents and EIN for tax verification." />
                </div>
                
                <div class="grid gap-6">
                   <div class="relative">
                      <AnimatedInput v-model="form.ein" label="EIN Number (Tax ID)" required />
                      <div class="absolute right-4 top-1/2 -translate-y-1/2">
                        <InfoTooltip text="Employer Identification Number is required for tax compliance in the US." />
                      </div>
                   </div>

                   <div class="p-10 border-2 border-dashed border-neutral-100 rounded-[2.5rem] text-center space-y-6 group relative transition-all hover:border-secondary/20">
                    <div v-if="form.llcDocsUrl" class="absolute inset-0 z-0">
                      <div class="absolute inset-0 bg-secondary/5 z-0"></div>
                    </div>
                    <div class="relative z-10">
                      <div class="w-20 h-20 bg-secondary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                        <DocumentTextIcon class="w-10 h-10 text-secondary" />
                      </div>
                      <p class="text-sm font-black text-primary-dark tracking-tight">LLC Formation Documents</p>
                      <p class="text-xs text-neutral-400 max-w-[200px] mx-auto leading-relaxed">Upload your Articles of Organization or Certificate of Formation.</p>
                      <input type="file" @change="handleFileUpload($event, 'document', 'llcDocs')" class="hidden" id="llcUpload" accept="application/pdf,image/*">
                      <BaseButton :loading="uploadingFields.llcDocs" type="button" variant="secondary" size="sm" @click="$el.querySelector('#llcUpload').click()" class="mt-4">
                        {{ form.llcDocsUrl ? 'Replace Documents' : 'Choose Documents' }}
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="p-16 text-center bg-neutral-50 rounded-[3rem] space-y-4">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheckIcon class="w-8 h-8 text-neutral-200" />
                </div>
                <div>
                  <p class="text-sm font-bold text-primary-dark tracking-tight">No regional documents required</p>
                  <p class="text-xs text-neutral-400 mt-1 max-w-[240px] mx-auto font-medium leading-relaxed">Based on your selection of {{ form.country || 'International' }}, no additional local compliance is needed.</p>
                </div>
              </div>
            </div>

            <!-- Step 6: Payment & Billing -->
            <div v-if="currentStep === 6" class="space-y-6">
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                   <h4 class="text-[10px] font-black text-secondary tracking-[0.2em] uppercase">Payout Account</h4>
                   <InfoTooltip text="We'll use this to send your wholesale commissions. Nigerian agents are paid via Paystack." />
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="relative">
                    <SelectInput 
                      v-model="form.bankCode" 
                      label="Select Bank" 
                      :options="bankOptions" 
                      required 
                      @update:modelValue="handleBankChange"
                    />
                    <div v-if="loadingBanks" class="absolute right-10 top-1/2 -translate-y-1/2">
                      <div class="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div class="relative">
                    <AnimatedInput 
                      v-model="form.accountNumber" 
                      label="Account Number" 
                      required 
                      type="text"
                      maxlength="10"
                      @update:modelValue="handleAccountNumberInput"
                    />
                    <div v-if="verifyingAccount" class="absolute right-4 top-1/2 -translate-y-1/2">
                      <div class="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
                <div class="relative group">
                  <AnimatedInput 
                    v-model="form.accountHolder" 
                    label="Account Holder Name" 
                    required 
                    readonly
                    class="bg-neutral-50/50 cursor-not-allowed"
                  />
                  <div v-if="form.accountHolder" class="absolute right-4 top-1/2 -translate-y-1/2">
                    <CheckCircleIcon class="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
              <GoogleAddressAutocomplete 
                v-model="form.billingAddress" 
                label="Billing Address" 
                placeholder="Enter your registered billing address..." 
                :api-key="(runtimeConfig.public.googleMapsApiKey as string)"
              />
            </div>

            <!-- Step 7: Terms & Submission -->
            <div v-if="currentStep === 7" class="space-y-4">
              <div v-for="term in submissionTerms" :key="term.id" class="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start space-x-4 group cursor-pointer">
                <div class="relative flex items-center pt-1">
                  <input :id="term.id" type="checkbox" v-model="form.agreements[term.id]" required class="peer appearance-none w-5 h-5 border-2 border-neutral-200 rounded-lg checked:bg-secondary checked:border-secondary transition-all cursor-pointer">
                  <CheckIcon class="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <label :for="term.id" class="text-[11px] text-neutral-400 font-medium leading-relaxed group-hover:text-primary-dark transition-colors">
                  {{ term.label }}
                </label>
              </div>
            </div>

            <div class="flex items-center justify-between pt-6">
              <BaseButton v-if="currentStep > 1" type="button" variant="secondary" @click="currentStep--">
                Back
              </BaseButton>
              <div v-else></div>
              
              <BaseButton v-if="currentStep < 7" type="button" variant="primary" @click="nextStep">
                Next Step
              </BaseButton>
              <BaseButton v-else type="submit" variant="primary" :loading="loading">
                Submit Application
              </BaseButton>
            </div>
            
            <div class="text-center pt-4">
              <NuxtLink to="/auth/login" class="px-8 py-3 bg-neutral-50 hover:bg-neutral-100 text-[10px] font-black tracking-[0.2em] text-neutral-400 hover:text-primary-dark rounded-xl transition-all uppercase">Save & Exit Registration</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  CheckIcon, 
  DocumentIcon, 
  CameraIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ShieldCheckIcon 
} from '@heroicons/vue/24/solid'
import SelectInput from '~/components/ui/SelectInput.vue'
import AnimatedInput from '~/components/ui/AnimatedInput.vue'
import GoogleAddressAutocomplete from '~/components/ui/GoogleAddressAutocomplete.vue'
import InfoTooltip from '~/components/ui/InfoTooltip.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useUpload } from '@/composables/core/useUpload'
import { useBank } from '@/composables/modules/payments/useBank'
import { useCustomToast } from '@/composables/core/useCustomToast'

const runtimeConfig = useRuntimeConfig()
const { register, loading } = useAuth()
const { uploadFile } = useUpload()
const uploadingFields = ref<Record<string, boolean>>({
  idCard: false,
  selfie: false,
  cacCertificate: false,
  llcDocs: false
})
const { banks, loadingBanks, verifyingAccount, fetchBanks, verifyAccount } = useBank()
const { showToast } = useCustomToast()
const currentStep = ref(1)
const sameAsPhone = ref(true)


definePageMeta({
  layout: 'auth'
})

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  agencyName: '',
  registrationNumber: '',
  country: '',
  businessAddress: '',
  website: '',
  firstName: '',
  lastName: '',
  phone: '',
  whatsappNumber: '',
  idCardUrl: '',
  selfieUrl: '',
  cacCertificateUrl: '',
  llcDocsUrl: '',
  ein: '',
  bankName: '',
  bankCode: '',
  accountNumber: '',
  accountHolder: '',
  billingAddress: '',
  agreements: {
    terms: false,
    serviceFees: false,
    refund: false,
    fraud: false
  } as Record<string, boolean>
})

const stepTitles = [
  'Account setup',
  'Business intelligence',
  'Partner contact',
  'Identity verification',
  'Compliance docs',
  'Payout configuration',
  'Final agreements'
]

const stepDescriptions = [
  'Let\'s build your secure gateway to the Flybeth network.',
  'Tell us about your organization and regional focus.',
  'Who will be the primary lead for this partner account?',
  'KYC is essential for maintaining our secure marketplace.',
  'Dynamic compliance based on your operating region.',
  'Where should we send your wholesale profit payouts?',
  'Carefully review and submit your partner application.'
]

const submissionTerms = [
  { id: 'terms', label: 'I agree to the overarching Terms and Conditions of the Flybeth Agent Network.' },
  { id: 'serviceFees', label: 'I acknowledge the service fee structure for flight and stay inventory.' },
  { id: 'refund', label: 'I accept the standard refund and rebooking policies for wholesale rates.' },
  { id: 'fraud', label: 'I agree to the Flybeth anti-fraud policy and document authenticity rules.' }
]

const countries = ['Nigeria', 'United States', 'United Kingdom', 'Ghana', 'Kenya', 'South Africa', 'Canada']

const perks = [
  { title: 'Global Flight Rates', desc: 'Secure net rates not available to the general public.' },
  { title: 'Analytics Dashboard', desc: 'Real-time booking management and automated reporting.' },
  { title: 'Priority Support', desc: 'Dedicated account manager for your agency.' }
]

const bankOptions = computed(() => {
  return banks.value.map(b => ({
    label: b.name,
    value: b.code
  }))
})

const handleBankChange = () => {
  form.value.accountHolder = ''
  form.value.bankName = banks.value.find(b => b.code === form.value.bankCode)?.name || ''
  if (form.value.accountNumber.length === 10) {
    handleAccountNumberInput()
  }
}

const handleAccountNumberInput = async () => {
  if (form.value.accountNumber.length === 10 && form.value.bankCode) {
    const res = await verifyAccount(form.value.accountNumber, form.value.bankCode)
    if (res && res.account_name) {
      form.value.accountHolder = res.account_name
      showToast({ title: 'Success', message: 'Bank account verified successfully', toastType: 'success' })
    } else {
      form.value.accountHolder = ''
    }
  } else {
    form.value.accountHolder = ''
  }
}

watch(currentStep, (newStep) => {
  if (newStep === 6 && banks.value.length === 0) {
    fetchBanks()
  }
})

const nextStep = () => {
  if (currentStep.value === 1 && form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  currentStep.value++
}

const handleAddressSelected = (data: any) => {
  form.value.businessAddress = data.address
  // You could also store coordinates if the schema supported it
  console.log('Location selected:', data.coordinates)
}

const handleFileUpload = async (event: any, type: 'image' | 'document', field: string) => {
  const file = event.target.files[0]
  if (!file) return
  
  uploadingFields.value[field] = true
  try {
    const res = await uploadFile(file, type)
    if (res && res.data && res.data.url) {
      (form.value as any)[field + 'Url'] = res.data.url
      showToast({ title: 'Success', message: 'Document uploaded and verified', toastType: 'success' })
    }
  } catch (error) {
    console.error('Upload failed', error)
  } finally {
    uploadingFields.value[field] = false
  }
}

const handleSubmit = async () => {
  try {
    const payload = {
      ...form.value,
      role: 'agent',
      whatsappNumber: sameAsPhone.value ? form.value.phone : form.value.whatsappNumber
    }
    
    await register(payload)
    localStorage.setItem('verify_email', form.value.email)
    navigateTo({
      path: '/auth/verify',
      query: { email: form.value.email }
    })
  } catch (error) {
    console.error('Registration failed')
  }
}

// handleSubmit etc...
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
