<template>
  <div class="min-h-screen bg-white flex flex-col sm:items-center sm:justify-center p-0 sm:p-6 lg:p-10 font-sans">
    <div class="max-w-7xl w-full flex-1 grid lg:grid-cols-2 sm:gap-12 bg-white rounded-none sm:rounded-[3rem] sm:border border-neutral-100 sm:shadow-2xl shadow-neutral-100 min-h-screen sm:min-h-[85vh]">
      <!-- Agency Advantage Section -->
      <div class="hidden lg:flex flex-col justify-between p-10 bg-neutral-50 relative group h-full">
        <div class="absolute inset-0 bg-white/20 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div class="relative z-10 flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
           <img src="@/assets/img/logo.png" class="w-auto h-12" alt="logo"  />
        </div>

        <div class="relative z-10 space-y-8">
          <h2 class="text-5xl font-black text-primary-dark leading-tight">
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
              <p class="text-xs font-black text-primary-dark">{{ perk.title }}</p>
              <p class="text-[12px] text-neutral-500 mt-1">{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form Section -->
      <div class="px-6 py-10 sm:p-8 lg:p-12 flex flex-col justify-center bg-white overflow-y-auto w-full">
        <div class="max-w-xl w-full mx-auto space-y-8">
          <div class="space-y-2">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[11px]    text-secondary">Step {{ currentStep }} of 7</span>
              <div class="flex space-x-1">
                <div v-for="s in 7" :key="s" :class="['h-1 w-6 rounded-full transition-all duration-500', s <= currentStep ? 'bg-secondary' : 'bg-neutral-100']"></div>
              </div>
            </div>
            <h1 class="text-3xl  text-primary-dark er">{{ stepTitles[currentStep-1] }}</h1>
            <p class="text-neutral-500 text-sm font-medium">{{ stepDescriptions[currentStep-1] }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Step 1: Account Creation -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="relative">
                <AnimatedInput v-model="form.email" label="Email Address" type="email" required :errorMessage="formErrors.email" :hasError="!!formErrors.email" />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="We'll use this for account security and to send your verification code." />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <AnimatedInput v-model="form.password" label="Password" type="password" required :errorMessage="formErrors.password" :hasError="!!formErrors.password" />
                <AnimatedInput v-model="form.confirmPassword" label="Confirm Password" type="password" required :errorMessage="formErrors.confirmPassword" :hasError="!!formErrors.confirmPassword" />
              </div>
            </div>

            <!-- Step 2: Business Information -->
            <div v-if="currentStep === 2" class="space-y-6">
              <div class="relative">
                <AnimatedInput v-model="form.agencyName" label="Business Name" required :errorMessage="formErrors.agencyName" :hasError="!!formErrors.agencyName" />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="The legal name of your travel agency as registered with corporate authorities." />
                </div>
              </div>
              <div class="relative">
                <AnimatedInput v-model="form.registrationNumber" label="Registration Number" required :errorMessage="formErrors.registrationNumber" :hasError="!!formErrors.registrationNumber" />
                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                  <InfoTooltip text="Enter your official business registration number (e.g., RC Number for Nigeria or EIN for US). This is used for verification." />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <SelectInput v-model="form.country" label="Country" :options="countries" required :errorMessage="formErrors.country" :hasError="!!formErrors.country" />
                <AnimatedInput v-model="form.website" label="Website / Social (Optional)" />
              </div>
              <GoogleAddressAutocomplete 
                v-model="form.businessAddress" 
                label="Business Address" 
                placeholder="Start typing your address..." 
                :api-key="(runtimeConfig.public.googleMapsApiKey as string)"
                @address-selected="handleAddressSelected"
               :errorMessage="formErrors.businessAddress" :hasError="!!formErrors.businessAddress" />
            </div>

            <!-- Step 3: Contact Information -->
            <div v-if="currentStep === 3" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <AnimatedInput v-model="form.firstName" label="Contact First Name" required :errorMessage="formErrors.firstName" :hasError="!!formErrors.firstName" />
                <AnimatedInput v-model="form.lastName" label="Contact Last Name" required :errorMessage="formErrors.lastName" :hasError="!!formErrors.lastName" />
              </div>
              <PhoneNumberInput v-model="form.phone" label="Phone Number" required :errorMessage="formErrors.phone" :hasError="!!formErrors.phone" />
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <input type="checkbox" v-model="sameAsPhone" class="rounded border-neutral-200 text-secondary focus:ring-secondary">
                  <span class="text-[13px] text-neutral-500 font-medium">WhatsApp same as phone</span>
                </div>
                <PhoneNumberInput v-if="!sameAsPhone" v-model="form.whatsappNumber" label="WhatsApp Number"  :errorMessage="formErrors.whatsappNumber" :hasError="!!formErrors.whatsappNumber" />
              </div>
            </div>

            <!-- Step 4: Identity Verification (KYC) -->
            <div v-if="currentStep === 4" class="space-y-6">
              <div class="p-4 border-2 border-dashed border-neutral-200 rounded-[2rem] text-center space-y-4 hover:border-secondary/20 transition-all bg-neutral-50/50">
                <template v-if="form.idCardUrl">
                  <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-neutral-900 flex items-center justify-center">
                    <embed v-if="isPdf(form.idCardUrl)" :src="form.idCardUrl + '#toolbar=0&navpanes=0&scrollbar=0'" class="w-full h-full pointer-events-none bg-white" />
                    <img v-else :src="form.idCardUrl" class="w-full h-full object-contain" />
                  </div>
                  <div class="flex justify-between items-center px-2">
                    <div class="text-left">
                      <h4 class="text-sm  text-primary-dark">Government ID</h4>
                      <p class="text-[10px] text-green-600 font-bold   flex items-center"><CheckCircleIcon class="w-3 h-3 mr-1" /> Uploaded</p>
                    </div>
                    <input type="file" @change="handleFileUpload($event, 'image', 'idCard')" class="hidden" id="idUpload" accept="image/*,application/pdf">
                    <BaseButton :loading="uploadingFields.idCard" type="button" variant="secondary" size="sm" @click="$el.querySelector('#idUpload').click()">
                      Replace
                    </BaseButton>
                  </div>
                </template>
                <template v-else>
                  <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-100 shadow-sm">
                    <DocumentIcon class="w-8 h-8 text-neutral-300" />
                  </div>
                  <h4 class="text-sm  text-primary-dark">Government ID Upload</h4>
                  <p class="text-xs text-neutral-500">Upload clear, valid document (JPG/PDF)</p>
                  <input type="file" @change="handleFileUpload($event, 'image', 'idCard')" class="hidden" id="idUpload" accept="image/*,application/pdf">
                  <BaseButton :loading="uploadingFields.idCard" type="button" variant="primary" size="sm" @click="$el.querySelector('#idUpload').click()" class="mt-4">
                    Choose File
                  </BaseButton>
                  <p v-if="formErrors.idCardUrl" class="text-xs text-red-500 font-bold mt-2">{{ formErrors.idCardUrl }}</p>
                </template>
              </div>

              <div class="p-4 border-2 border-dashed border-neutral-200 rounded-[2rem] text-center space-y-4 hover:border-secondary/20 transition-all bg-neutral-50/50">
                <template v-if="form.selfieUrl">
                  <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-neutral-900 flex items-center justify-center">
                    <embed v-if="isPdf(form.selfieUrl)" :src="form.selfieUrl + '#toolbar=0&navpanes=0&scrollbar=0'" class="w-full h-full pointer-events-none bg-white" />
                    <img v-else :src="form.selfieUrl" class="w-full h-full object-contain" />
                  </div>
                  <div class="flex justify-between items-center px-2">
                    <div class="text-left">
                      <h4 class="text-sm  text-primary-dark">Selfie Verification</h4>
                      <p class="text-[10px] text-green-600 font-bold   flex items-center"><CheckCircleIcon class="w-3 h-3 mr-1" /> Captured</p>
                    </div>
                    <input type="file" @change="handleFileUpload($event, 'image', 'selfie')" class="hidden" capture="user" id="selfieUpload" accept="image/*">
                    <BaseButton :loading="uploadingFields.selfie" type="button" variant="secondary" size="sm" @click="$el.querySelector('#selfieUpload').click()">
                      Retake
                    </BaseButton>
                  </div>
                </template>
                <template v-else>
                  <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neutral-100 shadow-sm">
                    <CameraIcon class="w-8 h-8 text-neutral-300" />
                  </div>
                  <h4 class="text-sm  text-primary-dark">Selfie Verification</h4>
                  <p class="text-xs text-neutral-500">Capture a clear photo of your face</p>
                  <input type="file" @change="handleFileUpload($event, 'image', 'selfie')" class="hidden" capture="user" id="selfieUpload" accept="image/*">
                  <BaseButton :loading="uploadingFields.selfie" type="button" variant="primary" size="sm" @click="$el.querySelector('#selfieUpload').click()" class="mt-4">
                    Capture Photo
                  </BaseButton>
                  <p v-if="formErrors.selfieUrl" class="text-xs text-red-500 font-bold mt-2">{{ formErrors.selfieUrl }}</p>
                </template>
              </div>
            </div>

            <!-- Step 5: Business Documents -->
            <div v-if="currentStep === 5" class="space-y-8">
              <div v-if="form.country === 'Nigeria'" class="space-y-6">
                <div class="flex items-center justify-between">
                   <h4 class="text-xs  text-secondary  ">Nigeria Compliance (CAC)</h4>
                   <InfoTooltip text="Corporate Affairs Commission certificate is required for all Nigerian businesses." />
                </div>
                <div class="p-6 border-2 border-dashed border-neutral-200 rounded-[2.5rem] text-center space-y-6 transition-all hover:border-secondary/20 bg-neutral-50/50">
                  <template v-if="form.cacCertificateUrl">
                    <div class="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-sm bg-neutral-900 flex items-center justify-center">
                      <embed v-if="isPdf(form.cacCertificateUrl)" :src="form.cacCertificateUrl + '#toolbar=0&navpanes=0&scrollbar=0'" class="w-full h-full bg-white" />
                      <img v-else :src="form.cacCertificateUrl" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-left">
                        <p class="text-sm  text-primary-dark ">CAC Certificate</p>
                        <p class="text-[11px]  text-green-600   flex items-center">
                          <CheckCircleIcon class="w-4 h-4 mr-1" /> Verified
                        </p>
                      </div>
                      <input type="file" @change="handleFileUpload($event, 'document', 'cacCertificate')" class="hidden" id="cacUpload" accept="application/pdf,image/*">
                      <BaseButton :loading="uploadingFields.cacCertificate" type="button" variant="secondary" size="sm" @click="$el.querySelector('#cacUpload').click()">
                        Replace
                      </BaseButton>
                    </div>
                  </template>
                  <template v-else>
                    <div class="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-neutral-100 shadow-sm">
                      <DocumentTextIcon class="w-10 h-10 text-neutral-300" />
                    </div>
                    <p class="text-sm  text-primary-dark ">CAC Registration Certificate</p>
                    <p class="text-xs text-neutral-500 max-w-[200px] mx-auto leading-relaxed">Ensure the document clearly shows the RC Number and Seal.</p>
                    <input type="file" @change="handleFileUpload($event, 'document', 'cacCertificate')" class="hidden" id="cacUpload" accept="application/pdf,image/*">
                    <BaseButton :loading="uploadingFields.cacCertificate" type="button" variant="primary" size="sm" @click="$el.querySelector('#cacUpload').click()" class="mt-4">
                      Choose Certificate
                    </BaseButton>
                    <p v-if="formErrors.cacCertificateUrl" class="text-xs text-red-500 font-bold mt-2">{{ formErrors.cacCertificateUrl }}</p>
                  </template>
                </div>
              </div>

              <div v-else-if="form.country === 'United States'" class="space-y-8">
                <div class="flex items-center justify-between">
                   <h4 class="text-xs  text-secondary  ">USA Compliance (LLC)</h4>
                   <InfoTooltip text="Provide your LLC formation documents and EIN for tax verification." />
                </div>
                
                <div class="grid gap-6">
                   <div class="relative">
                      <AnimatedInput v-model="form.ein" label="EIN Number (Tax ID)" required :errorMessage="formErrors.ein" :hasError="!!formErrors.ein" />
                      <div class="absolute right-4 top-1/2 -translate-y-1/2">
                        <InfoTooltip text="Employer Identification Number is required for tax compliance in the US." />
                      </div>
                   </div>

                   <div class="p-6 border-2 border-dashed border-neutral-200 rounded-[2.5rem] text-center space-y-6 transition-all hover:border-secondary/20 bg-neutral-50/50">
                    <template v-if="form.llcDocsUrl">
                      <div class="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-sm bg-neutral-900 flex items-center justify-center">
                        <embed v-if="isPdf(form.llcDocsUrl)" :src="form.llcDocsUrl + '#toolbar=0&navpanes=0&scrollbar=0'" class="w-full h-full bg-white" />
                        <img v-else :src="form.llcDocsUrl" class="w-full h-full object-contain" />
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="text-left">
                          <p class="text-sm  text-primary-dark ">LLC Documents</p>
                          <p class="text-[11px]  text-green-600   flex items-center">
                            <CheckCircleIcon class="w-4 h-4 mr-1" /> Verified
                          </p>
                        </div>
                        <input type="file" @change="handleFileUpload($event, 'document', 'llcDocs')" class="hidden" id="llcUpload" accept="application/pdf,image/*">
                        <BaseButton :loading="uploadingFields.llcDocs" type="button" variant="secondary" size="sm" @click="$el.querySelector('#llcUpload').click()">
                          Replace
                        </BaseButton>
                      </div>
                    </template>
                    <template v-else>
                      <div class="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-neutral-100 shadow-sm">
                        <DocumentTextIcon class="w-10 h-10 text-neutral-300" />
                      </div>
                      <p class="text-sm  text-primary-dark ">LLC Formation Documents</p>
                      <p class="text-xs text-neutral-500 max-w-[200px] mx-auto leading-relaxed">Upload your Articles of Organization or Certificate of Formation.</p>
                      <input type="file" @change="handleFileUpload($event, 'document', 'llcDocs')" class="hidden" id="llcUpload" accept="application/pdf,image/*">
                      <BaseButton :loading="uploadingFields.llcDocs" type="button" variant="primary" size="sm" @click="$el.querySelector('#llcUpload').click()" class="mt-4">
                        Choose Documents
                      </BaseButton>
                      <p v-if="formErrors.llcDocsUrl" class="text-xs text-red-500 font-bold mt-2">{{ formErrors.llcDocsUrl }}</p>
                    </template>
                  </div>
                </div>
              </div>

              <div v-else class="p-16 text-center bg-neutral-50 rounded-[3rem] space-y-4">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheckIcon class="w-8 h-8 text-neutral-200" />
                </div>
                <div>
                  <p class="text-sm font-bold text-primary-dark ">No regional documents required</p>
                  <p class="text-xs text-neutral-400 mt-1 max-w-[240px] mx-auto font-medium leading-relaxed">Based on your selection of {{ form.country || 'International' }}, no additional local compliance is needed.</p>
                </div>
              </div>
            </div>

            <!-- Step 6: Payment & Billing -->
            <div v-if="currentStep === 6" class="space-y-6">
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                   <h4 class="text-[11px]  text-secondary  ">Payout Account</h4>
                   <InfoTooltip text="We'll use this to send your wholesale commissions. Nigerian agents are paid via Paystack." />
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="relative">
                    <SelectInput 
                      v-model="form.bankCode" 
                      label="Select Bank" 
                      :options="bankOptions" 
                      required :errorMessage="formErrors.bankCode" :hasError="!!formErrors.bankCode" 
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
                      required :errorMessage="formErrors.accountNumber" :hasError="!!formErrors.accountNumber" 
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
                    required :errorMessage="formErrors.accountHolder" :hasError="!!formErrors.accountHolder" 
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
               :errorMessage="formErrors.billingAddress" :hasError="!!formErrors.billingAddress" />
            </div>

            <!-- Step 7: Terms & Submission -->
            <div v-if="currentStep === 7" class="space-y-4">
              <div v-for="term in submissionTerms" :key="term.id" class="p-5 bg-neutral-50 rounded-2xl border flex items-start space-x-4 group cursor-pointer relative" :class="[formErrors[term.id] ? 'border-red-500' : 'border-neutral-100']">
                <div class="relative flex items-center pt-1">
                  <input :id="term.id" type="checkbox" v-model="form.agreements[term.id]" required class="peer appearance-none w-5 h-5 border-2 border-neutral-200 rounded-lg checked:bg-secondary checked:border-secondary transition-all cursor-pointer">
                  <CheckIcon class="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <label :for="term.id" class="text-xs text-neutral-500 font-medium leading-relaxed group-hover:text-primary-dark transition-colors">
                  {{ term.label }}
                </label>
                <p v-if="formErrors[term.id]" class="text-[10px] text-red-500 absolute -bottom-4 left-9">{{ formErrors[term.id] }}</p>
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
              <NuxtLink to="/auth/login" class="px-8 py-3 bg-neutral-200 hover:bg-neutral-100 text-[11px] font-medium   text-neutral-500 hover:text-primary-dark rounded-xl transition-all">Save & Exit Registration</NuxtLink>
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
import PhoneNumberInput from '~/components/ui/PhoneNumberInput.vue'
import GoogleAddressAutocomplete from '~/components/ui/GoogleAddressAutocomplete.vue'
import InfoTooltip from '~/components/ui/InfoTooltip.vue'
import { useAuth } from '@/composables/modules/auth/useAuth'
import { useUpload } from '@/composables/core/useUpload'
import { useBank } from '@/composables/modules/payments/useBank'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useTracking } from '@/composables/core/useTracking'

const runtimeConfig = useRuntimeConfig()
const { register, loading } = useAuth()
const { uploadFile } = useUpload()
const { trackAction } = useTracking()
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
const formErrors = ref<Record<string, string>>({})

const validateStep = (step: number) => {
  formErrors.value = {}
  let isValid = true

  const setError = (field: string, msg: string) => {
    formErrors.value[field] = msg
    isValid = false
  }

  if (step === 1) {
    if (!form.value.email) setError('email', 'Email is required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) setError('email', 'Invalid email format')
    if (!form.value.password) setError('password', 'Password is required')
    else if (form.value.password.length < 8) setError('password', 'Password must be at least 8 characters')
    if (!form.value.confirmPassword) setError('confirmPassword', 'Please confirm your password')
    else if (form.value.password !== form.value.confirmPassword) setError('confirmPassword', 'Passwords do not match')
  } else if (step === 2) {
    if (!form.value.agencyName) setError('agencyName', 'Business Name is required')
    if (!form.value.registrationNumber) setError('registrationNumber', 'Registration Number is required')
    if (!form.value.country) setError('country', 'Country is required')
    if (!form.value.businessAddress) setError('businessAddress', 'Business Address is required')
  } else if (step === 3) {
    if (!form.value.firstName) setError('firstName', 'First Name is required')
    if (!form.value.lastName) setError('lastName', 'Last Name is required')
    if (!form.value.phone) setError('phone', 'Phone Number is required')
    if (!sameAsPhone.value && !form.value.whatsappNumber) setError('whatsappNumber', 'WhatsApp Number is required')
  } else if (step === 4) {
    if (!form.value.idCardUrl) setError('idCardUrl', 'Government ID is required')
    if (!form.value.selfieUrl) setError('selfieUrl', 'Selfie Verification is required')
  } else if (step === 5) {
    if (form.value.country === 'Nigeria' && !form.value.cacCertificateUrl) {
      setError('cacCertificateUrl', 'CAC Certificate is required')
    } else if (form.value.country === 'United States') {
      if (!form.value.ein) setError('ein', 'EIN is required')
      if (!form.value.llcDocsUrl) setError('llcDocsUrl', 'LLC Documents are required')
    }
  } else if (step === 6) {
    if (!form.value.bankCode) setError('bankCode', 'Bank selection is required')
    if (!form.value.accountNumber) setError('accountNumber', 'Account Number is required')
    if (!form.value.accountHolder) setError('accountHolder', 'Account Holder is required')
    if (!form.value.billingAddress) setError('billingAddress', 'Billing Address is required')
  }

  return isValid
}


const isPdf = (url: string | null) => url ? url.toLowerCase().includes('.pdf') : false



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

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

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
  const stepsMap: Record<number, string> = {
    1: 'onboarding_started',
    2: 'onboarding_business',
    3: 'onboarding_contact',
    4: 'onboarding_kyc',
    5: 'onboarding_compliance',
    6: 'onboarding_payout',
    7: 'onboarding_final'
  }
  trackAction(stepsMap[newStep] || `onboarding_step_${newStep}`, { 
    email: form.value.email,
    agency: form.value.agencyName
  })

  if (newStep === 6 && banks.value.length === 0) {
    fetchBanks()
  }
})

const nextStep = () => {
  if (currentStep.value === 7) return
  if (validateStep(currentStep.value)) {
    currentStep.value++
  }
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
      // showToast({ title: 'Success', message: 'Document uploaded and verified', toastType: 'success' })
    }
  } catch (error) {
    console.error('Upload failed', error)
  } finally {
    uploadingFields.value[field] = false
  }
}

const handleSubmit = async () => {
  formErrors.value = {}
  let hasAgreementsError = false
  for (const term of submissionTerms) {
    if (!form.value.agreements[term.id]) {
      formErrors.value[term.id] = 'Required'
      hasAgreementsError = true
    }
  }
  if (hasAgreementsError) {
    showToast({ title: 'Error', message: 'You must agree to all terms and conditions.', toastType: 'error' })
    return
  }

  try {
    const payload = {
      email: form.value.email,
      password: form.value.password,
      agencyName: form.value.agencyName,
      registrationNumber: form.value.registrationNumber,
      country: form.value.country,
      businessAddress: form.value.businessAddress,
      website: form.value.website,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
      whatsappNumber: sameAsPhone.value ? form.value.phone : form.value.whatsappNumber,
      idCardUrl: form.value.idCardUrl,
      selfieUrl: form.value.selfieUrl,
      cacCertificateUrl: form.value.cacCertificateUrl,
      llcDocsUrl: form.value.llcDocsUrl,
      ein: form.value.ein,
      billingAddress: form.value.billingAddress,
      bankAccountDetails: {
        bankName: form.value.bankName,
        bankCode: form.value.bankCode,
        accountNumber: form.value.accountNumber,
        accountHolder: form.value.accountHolder,
      },
      role: 'agent'
    }
    
    const res = await register(payload)
    if (res?.requiresOtp || !res?.tokens) {
      localStorage.setItem('verify_email', form.value.email)
      navigateTo({
        path: '/auth/verify',
        query: { email: form.value.email }
      })
      return
    }
    
    localStorage.setItem('verify_email', form.value.email)
    navigateTo({
      path: '/auth/success',
      query: { email: form.value.email }
    })
  } catch (error) {
    console.error('Registration failed')
  }
}

// handleSubmit etc...
</script>

<style scoped>
. { font-weight: 900; }
</style>
