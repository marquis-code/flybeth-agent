<template>
  <div class="relative w-full" ref="pickerRef">

    <div
      class="relative"
      @click="openCalendar"
    >
      <label 
        :class="[
          'absolute transition-all duration-300 ease-in-out pointer-events-none z-10',
          showCalendar || modelValue ? 'text-sm uppercase font-bold text-primary left-4 top-2 ' : 'text-sm font-bold text-gray-800 left-11 top-1/2 -translate-y-1/2'
        ]"
      >
        {{ placeholder }}
      </label>

      <div
        class="w-full cursor-pointer flex items-center gap-3 px-4 bg-gray-50 border border-gray-300 rounded-2xl hover:border-primary/40 transition-all group select-none min-h-[64px]"
      >
        <div class="flex items-center gap-3" :class="{ 'pt-4': showCalendar || modelValue }">
          <Calendar class="h-5 w-5 text-gray-800 group-hover:text-primary shrink-0 transition-colors" />
          <span v-if="modelValue" class="text-sm font-bold text-gray-900">
            {{ formatDisplay(modelValue) }}
          </span>
          <span v-else-if="showCalendar" class="text-sm font-bold text-gray-400">
            Select Date
          </span>
        </div>
      </div>
    </div>

    <!-- Calendar Modal -->
    <Teleport to="body">
      <Transition name="fade-overlay">
        <div v-if="showCalendar">

          <!-- Backdrop -->
          <div
            class="fixed inset-0 z-[10010] bg-black/50 backdrop-blur-[3px]"
            @click="closeCalendar"
          />

          <!-- Calendar Card -->
          <div
            class="fixed z-[10011] bg-white rounded-2xl overflow-hidden select-none shadow-2xl transition-all duration-300"
            :class="isMobile ? 'inset-x-4 top-1/2 -translate-y-1/2 w-auto' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px]'"
            @click.stop
          >
            <!-- Year / Month Quick Selectors -->
            <div class="px-5 pt-5 pb-3 space-y-3">
              <div class="flex items-center gap-2">
                <!-- Year Dropdown -->
                <select
                  v-model="currentYear"
                  class="flex-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-primary transition-all cursor-pointer appearance-none"
                >
                  <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                </select>

                <!-- Month Dropdown -->
                <select
                  v-model="currentMonth"
                  class="flex-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:border-primary transition-all cursor-pointer appearance-none"
                >
                  <option v-for="(m, idx) in monthNames" :key="idx" :value="idx">{{ m }}</option>
                </select>
              </div>

              <!-- Month nav arrows -->
              <div class="flex items-center justify-between">
                <button
                  @click="prevMonth"
                  class="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft class="h-4 w-4 text-gray-800" />
                </button>

                <p class="text-sm font-bold text-gray-900">{{ monthNames[currentMonth] }} {{ currentYear }}</p>

                <button
                  @click="nextMonth"
                  :disabled="isFutureMonth"
                  class="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center transition-colors"
                  :class="isFutureMonth ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'"
                >
                  <ChevronRight class="h-4 w-4 text-gray-800" />
                </button>
              </div>
            </div>

            <!-- Day Headers -->
            <div class="grid grid-cols-7 px-4">
              <div
                v-for="d in dayHeaders" :key="d"
                class="text-center text-sm font-medium text-gray-800 py-1.5 uppercase "
              >{{ d }}</div>
            </div>

            <!-- Day Grid -->
            <div class="grid grid-cols-7 px-4 pb-2">
              <template v-for="(cell, i) in cells" :key="i">
                <div v-if="cell === null" class="h-10" />
                <div
                  v-else
                  class="flex items-center justify-center h-10 cursor-pointer"
                  @click="selectDate(cell)"
                >
                  <span
                    class="h-9 w-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-100"
                    :class="dayClass(cell)"
                  >{{ cellDay(cell) }}</span>
                </div>
              </template>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/60">
              <span class="text-sm font-medium text-gray-800">
                {{ modelValue ? formatDisplay(modelValue) : 'Select a date' }}
              </span>
              <div class="flex items-center gap-2">
                <button
                  v-if="modelValue"
                  @click="clearDate"
                  class="text-sm font-medium text-gray-800 hover:text-gray-800 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >Clear</button>
                <button
                  @click="closeCalendar"
                  class="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors active:scale-95 shadow-sm"
                >Done</button>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Select date of birth' },
})

const emit = defineEmits<{
  'update:modelValue': [v: string]
}>()

const pickerRef = ref<HTMLElement | null>(null)
const showCalendar = ref(false)
const isMobile = ref(false)

const _today = new Date()
_today.setHours(0, 0, 0, 0)
const todayStr = toISO(_today)

// Start showing current month, or the month of the existing value
const currentMonth = ref(_today.getMonth())
const currentYear = ref(_today.getFullYear())

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Allow years from 1920 to current year
const yearOptions = computed(() => {
  const years: number[] = []
  for (let y = _today.getFullYear(); y >= 1920; y--) {
    years.push(y)
  }
  return years
})

const isFutureMonth = computed(() => {
  return currentYear.value === _today.getFullYear() && currentMonth.value >= _today.getMonth()
})

const cells = computed(() => buildCells(currentYear.value, currentMonth.value))

function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

function buildCells(year: number, month: number): (string | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysCount = new Date(year, month + 1, 0).getDate()
  const arr: (string | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysCount; d++) {
    arr.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }
  return arr
}

function cellDay(iso: string): string {
  return String(parseInt(iso.split('-')[2] || '0', 10))
}

function isFuture(iso: string): boolean {
  return iso > todayStr
}

function formatDisplay(iso: string): string {
  if (!iso) return ''
  const parts = iso.split('-').map(Number)
  if (parts.length !== 3) return ''
  const [y, m, d] = parts
  return new Date(y!, m! - 1, d!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function dayClass(iso: string): string {
  if (isFuture(iso)) return 'text-gray-500 cursor-not-allowed'
  if (iso === props.modelValue) return 'bg-primary text-white shadow-sm'
  if (iso === todayStr) return 'text-primary border-2 border-primary/20 hover:bg-primary hover:text-white'
  return 'text-gray-800 font-semibold hover:bg-gray-100'
}

function selectDate(iso: string) {
  if (isFuture(iso)) return
  emit('update:modelValue', iso)
}

function clearDate() {
  emit('update:modelValue', '')
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (isFutureMonth.value) return
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function openCalendar() {
  // If there's an existing value, navigate to that month
  if (props.modelValue) {
    const parts = props.modelValue.split('-').map(Number)
    if (parts.length === 3) {
      currentYear.value = parts[0]!
      currentMonth.value = parts[1]! - 1
    }
  }
  showCalendar.value = true
}

function closeCalendar() {
  showCalendar.value = false
}

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
