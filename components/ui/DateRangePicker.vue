<template>
  <div class="relative w-full" ref="pickerRef">
    <!-- Trigger Input -->
    <div 
      @click="isOpen = !isOpen"
      class="flex items-center space-x-4 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-primary transition-all cursor-pointer group"
      :class="isOpen ? 'ring-4 ring-primary/10 border-primary' : ''"
    >
      <div class="flex items-center space-x-3 flex-1">
        <CalendarIcon class="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
        <div class="flex flex-col">
          <span class="text-[9px] font-black uppercase tracking-widest text-primary/60">Check-in — Check-out</span>
          <span class="text-sm font-bold text-gray-900">
            {{ displayRange || 'Select dates' }}
          </span>
        </div>
      </div>
      <ChevronDownIcon class="h-4 w-4 text-gray-400 transition-transform duration-300" :class="isOpen ? 'rotate-180' : ''" />
    </div>

    <Transition name="picker">
      <div 
        v-if="isOpen"
        class="absolute top-full left-0 mt-4 bg-white border border-gray-200 shadow-2xl rounded-[2.5rem] z-[9999] min-w-[700px] overflow-hidden animate-in fade-in slide-in-from-top-4"
      >
        <!-- Header (Tabs Removed as requested) -->
        <div class="px-8 pt-8 flex items-center justify-between border-b border-gray-100 pb-4">
          <div class="flex items-center space-x-2">
            <CalendarIcon class="h-5 w-5 text-primary" />
            <span class="text-xs font-black tracking-widest uppercase text-gray-900">Select Travel Dates</span>
          </div>
          <button @click="isOpen = false" class="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-gray-900">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="p-8 lg:p-10 space-y-10">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between px-4">
            <h3 class="text-lg font-black text-gray-900 tracking-tight">{{ formatMonthYear(currentLeftMonth) }}</h3>
            <h3 class="text-lg font-black text-gray-900 tracking-tight">{{ formatMonthYear(currentRightMonth) }}</h3>
            <div class="flex items-center space-x-2">
              <button @click="prevMonth" class="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronLeftIcon class="h-5 w-5 text-gray-600" /></button>
              <button @click="nextMonth" class="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronRightIcon class="h-5 w-5 text-gray-600" /></button>
            </div>
          </div>

          <!-- Dual Calendar Grid -->
          <div class="grid grid-cols-2 gap-16">
            <!-- Left Month -->
            <div class="space-y-4">
              <div class="grid grid-cols-7 text-center">
                <span v-for="d in days" :key="d" class="text-[10px] font-black text-gray-400 uppercase">{{ d }}</span>
              </div>
              <div class="grid grid-cols-7 gap-y-1">
                <div v-for="empty in leftMonthData.padding" :key="'empty-'+empty" class="h-12"></div>
                <button 
                  v-for="day in leftMonthData.days" :key="day.id"
                  @click="selectDate(day.date)"
                  @mouseenter="hoverDate = day.date"
                  @mouseleave="hoverDate = null"
                  :class="getDayClasses(day.date)"
                  class="h-12 w-full flex items-center justify-center text-sm font-bold relative transition-all"
                >
                  <span class="relative z-10">{{ day.dayNum }}</span>
                </button>
              </div>
            </div>

            <!-- Right Month -->
            <div class="space-y-4">
              <div class="grid grid-cols-7 text-center">
                <span v-for="d in days" :key="d" class="text-[10px] font-black text-gray-400 uppercase">{{ d }}</span>
              </div>
              <div class="grid grid-cols-7 gap-y-1">
                <div v-for="empty in rightMonthData.padding" :key="'empty-r-'+empty" class="h-12"></div>
                <button 
                  v-for="day in rightMonthData.days" :key="day.id"
                  @click="selectDate(day.date)"
                  @mouseenter="hoverDate = day.date"
                  @mouseleave="hoverDate = null"
                  :class="getDayClasses(day.date)"
                  class="h-12 w-full flex items-center justify-center text-sm font-bold relative transition-all"
                >
                  <span class="relative z-10">{{ day.dayNum }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Select Chips -->
          <div class="pt-8 border-t border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button 
                v-for="opt in dateOptions" :key="opt.label"
                class="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-black tracking-widest uppercase transition-all hover:border-primary hover:text-primary"
                :class="opt.active ? 'bg-primary/5 border-primary text-primary' : 'text-gray-500'"
              >
                {{ opt.label }}
              </button>
            </div>
            
            <div class="flex items-center space-x-4">
              <button @click="clearRange" class="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Clear</button>
              <BaseButton variant="primary" size="sm" class="rounded-xl px-8" @click="isOpen = false">Apply Dates</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { 
  CalendarIcon, 
  ChevronDownIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue?: { start: string, end: string }
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const pickerRef = ref(null)
const activeTab = ref('Calendar')
const hoverDate = ref<Date | null>(null)
const currentLeftMonth = ref(new Date())

const startDate = ref<Date | null>(props.modelValue?.start ? new Date(props.modelValue.start) : null)
const endDate = ref<Date | null>(props.modelValue?.end ? new Date(props.modelValue.end) : null)

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const dateOptions = [
  { label: 'Exact dates', active: true },
  { label: '+ 1 day', active: false },
  { label: '+ 2 days', active: false },
  { label: '+ 3 days', active: false },
  { label: '+ 7 days', active: false }
]

onClickOutside(pickerRef, () => isOpen.value = false)

const currentRightMonth = computed(() => {
  const date = new Date(currentLeftMonth.value)
  date.setMonth(date.getMonth() + 1)
  return date
})

const displayRange = computed(() => {
  if (!startDate.value) return ''
  const startStr = formatDate(startDate.value)
  if (!endDate.value) return `${startStr} — ...`
  return `${startStr} — ${formatDate(endDate.value)}`
})

const leftMonthData = computed(() => generateMonthData(currentLeftMonth.value))
const rightMonthData = computed(() => generateMonthData(currentRightMonth.value))

function generateMonthData(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Adjusted for Monday start
  let startDay = firstDay.getDay()
  startDay = startDay === 0 ? 6 : startDay - 1
  
  const daysInMonth = []
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push({
      id: `${year}-${month}-${i}`,
      dayNum: i,
      date: new Date(year, month, i)
    })
  }
  
  return { padding: startDay, days: daysInMonth }
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatMonthYear(date: Date) {
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

function selectDate(date: Date) {
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date
    endDate.value = null
  } else if (startDate.value && !endDate.value) {
    if (date < startDate.value) {
      startDate.value = date
    } else {
      endDate.value = date
      emit('update:modelValue', {
        start: startDate.value.toISOString().split('T')[0],
        end: endDate.value.toISOString().split('T')[0]
      })
    }
  }
}

function getDayClasses(date: Date) {
  const isStart = startDate.value && date.getTime() === startDate.value.getTime()
  const isEnd = endDate.value && date.getTime() === endDate.value.getTime()
  const isBetween = startDate.value && endDate.value && date > startDate.value && date < endDate.value
  const isHover = startDate.value && !endDate.value && hoverDate.value && date > startDate.value && date <= hoverDate.value
  const isToday = new Date().toDateString() === date.toDateString()

  return [
    isStart ? 'bg-primary text-white rounded-l-2xl' : '',
    isEnd ? 'bg-primary text-white rounded-r-2xl' : '',
    isBetween ? 'bg-primary/5 text-primary' : '',
    isHover ? 'bg-primary/5 text-primary' : '',
    !isStart && !isEnd && isToday ? 'text-primary' : 'text-gray-900',
    'hover:bg-gray-100 hover:rounded-2xl z-10'
  ]
}

function prevMonth() {
  const date = new Date(currentLeftMonth.value)
  date.setMonth(date.getMonth() - 1)
  currentLeftMonth.value = date
}

function nextMonth() {
  const date = new Date(currentLeftMonth.value)
  date.setMonth(date.getMonth() + 1)
  currentLeftMonth.value = date
}

function clearRange() {
  startDate.value = null
  endDate.value = null
  emit('update:modelValue', null)
}
</script>

<style scoped>
.picker-enter-active, .picker-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.picker-enter-from, .picker-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
