<template>
  <div class="mb-2 relative" ref="containerRef">
    <div class="relative flex items-center bg-white border border-gray-200 focus-within:ring-4 focus-within:ring-secondary/10 focus-within:border-secondary transition-all duration-500 rounded-xl"
         :class="[disabled ? 'opacity-50 cursor-not-allowed' : '', errorClass]">
      
      <!-- Always show top floating label -->
      <label class="absolute transition-all duration-300 ease-in-out pointer-events-none z-10 text-[9px]  uppercase tracking-[0.15em] text-primary left-5 top-2.5">
        {{ label }}
      </label>

      <!-- Country Selector Dropdown -->
      <div class="relative h-full flex items-center border-r border-gray-100 mt-5 mb-1 pl-4 pr-2 cursor-pointer group hover:bg-neutral-50 transition-colors rounded-l-xl" @click="showDropdown = !showDropdown">
        <span class="text-sm font-bold text-gray-700 mr-2 flex items-center space-x-2">
            <span class="text-base">{{ selectedCountry?.flag || '🇳🇬' }}</span> 
            <span>{{ selectedCountry?.dialCode || '+234' }}</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Dropdown Menu -->
      <Transition name="fade">
        <div v-if="showDropdown" class="absolute top-[110%] left-0 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto outline-none">
          <div 
            v-for="country in countries" 
            :key="country.code"
            class="px-4 py-3 hover:bg-secondary/5 cursor-pointer flex items-center space-x-3 transition-colors select-none"
            :class="selectedCountry?.code === country.code ? 'bg-secondary/5 border-l-2 border-secondary' : 'border-l-2 border-transparent'"
            @click="selectCountry(country)"
          >
            <span class="text-xl shrink-0">{{ country.flag }}</span>
            <span class="text-sm font-bold text-primary-dark w-12">{{ country.dialCode }}</span>
            <span class="text-xs text-gray-500 font-medium truncate">{{ country.name }}</span>
          </div>
        </div>
      </Transition>

      <!-- Input Field -->
      <input
        v-model="internalValue"
        type="tel"
        class="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-primary-dark font-bold px-4 py-1 mt-4 text-sm w-full"
        placeholder="Phone number"
        :disabled="disabled"
        :required="required"
        @input="handleInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>
    
    <p v-if="hasError && errorMessage" class="text-xs text-red-500 mt-1 ml-3 font-bold">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  modelValue?: string | number
  label: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  hasError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  required: false,
  errorMessage: '',
  hasError: false
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const showDropdown = ref(false)
const internalValue = ref('')
const containerRef = ref<HTMLElement | null>(null)

const countries = [
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', maxLen: 10 },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', maxLen: 10 },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', maxLen: 10 },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', maxLen: 9 },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪', maxLen: 9 },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', maxLen: 9 },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', maxLen: 10 },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', maxLen: 9 },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', maxLen: 9 },
  { name: 'Tanzania', code: 'TZ', dialCode: '+255', flag: '🇹🇿', maxLen: 9 },
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬', maxLen: 9 },
  { name: 'Rwanda', code: 'RW', dialCode: '+250', flag: '🇷🇼', maxLen: 9 }
]

const selectedCountry = ref(countries[0]) // Default NG

// Process incoming modelValue if it has country code
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const strVal = String(newVal).trim()
    
    // Find matching country code if prefixed
    const match = countries.find(c => strVal.startsWith(c.dialCode))
    if (match) {
      selectedCountry.value = match
      const localPart = strVal.slice(match.dialCode.length).trim()
      formatLocalNumber(localNumStripped(localPart))
    } else {
      // Just set it bare if no match
      formatLocalNumber(localNumStripped(strVal))
    }
  }
}, { immediate: true })

function localNumStripped(num: string) {
  return num.replace(/\D/g, '')
}

function formatLocalNumber(rawNum: string) {
  let localNum = rawNum
  if (localNum.startsWith('0')) {
     localNum = localNum.substring(1)
  }
  
  // Enforce Max Length specific to the selected country
  const max = selectedCountry.value?.maxLen || 10
  localNum = localNum.slice(0, max)

  let formatted = localNum
  if (localNum.length > 3) {
    formatted = `${localNum.slice(0,3)} ${localNum.slice(3)}`
  }
  if (localNum.length > 6) {
    formatted = `${localNum.slice(0,3)} ${localNum.slice(3,6)} ${localNum.slice(6)}`
  }
  internalValue.value = formatted // the pretty format string
}

const emitUpdate = () => {
  const rawNum = internalValue.value.replace(/\D/g, '')
  if (!rawNum) {
    emit('update:modelValue', '')
    return
  }
  
  const dialCode = selectedCountry.value?.dialCode || '+234'
  
  // Format for payload (no spaces, e.g. +2349012345678)
  emit('update:modelValue', `${dialCode} ${rawNum.slice(0,3)} ${rawNum.slice(3,6)} ${rawNum.slice(6)}`.trim())
}

const handleInput = () => {
  const localNum = internalValue.value.replace(/\D/g, '')
  formatLocalNumber(localNum)
  emitUpdate()
}

const selectCountry = (c: typeof countries[0]) => {
  selectedCountry.value = c
  showDropdown.value = false
  emitUpdate()
}

const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const errorClass = computed(() => {
  return props.hasError || props.errorMessage ? '!border-red-500 !ring-red-500/20' : ''
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
