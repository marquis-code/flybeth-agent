<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Payments & Earnings</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Track your commissions, payouts and pending invoices</p>
      </div>
      <div class="flex items-center space-x-3">
        <button class="px-4 py-2 border border-gray-100 bg-white text-gray-600 text-[11px] font-bold rounded-lg hover:bg-gray-50 transition-all flex items-center">
          <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
          Download List
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div v-for="stat in financeStatsList" :key="stat.label" class="bg-white p-5 rounded-2xl border border-gray-100">
          <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
          <div class="flex items-baseline space-x-2">
             <p class="text-xl font-bold text-gray-900">${{ stat.value.toLocaleString() }}</p>
             <span v-if="stat.trend" class="text-[8px] font-black text-emerald-500">{{ stat.trend }}</span>
          </div>
       </div>
    </div>

    <div class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm shadow-gray-100/10">
       <div class="p-6 border-b border-gray-50 flex items-center justify-between">
          <div class="flex items-center space-x-4">
             <button v-for="tab in ['Invoices', 'Payouts', 'Commissions']" :key="tab" @click="activeTab = tab" class="text-[10px] font-bold uppercase tracking-widest transition-all" :class="activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">{{ tab }}</button>
          </div>
       </div>

       <div class="overflow-x-auto">
          <table class="w-full text-left">
             <thead>
                <tr class="bg-gray-50/50">
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Bill Number</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Due Date</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Total Amount</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
             </thead>
             <tbody class="divide-y divide-gray-50">
                <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                   <td v-for="j in 5" :key="j" class="px-6 py-4"><div class="h-4 bg-gray-50 rounded w-full"></div></td>
                </tr>
                <tr v-else-if="invoices.length === 0" class="text-center py-20">
                   <td colspan="5" class="py-20 text-[10px] font-bold text-gray-300 uppercase italic">No payment history found yet</td>
                </tr>
                <tr v-else v-for="inv in invoices" :key="inv._id" class="hover:bg-gray-50/50 transition-colors group">
                   <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                         <div class="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                            <DocumentTextIcon class="h-4 w-4 text-gray-400" />
                         </div>
                         <div>
                            <p class="text-xs font-black text-gray-900">{{ inv.invoiceNumber }}</p>
                            <span class="text-[9px] text-gray-400 font-bold uppercase">Booking: {{ inv.booking?.reference || 'Direct' }}</span>
                         </div>
                      </div>
                   </td>
                   <td class="px-6 py-4">
                      <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border" :class="statusClass(inv.status)">
                         {{ inv.status }}
                      </span>
                   </td>
                   <td class="px-6 py-4">
                      <span class="text-[10px] font-bold text-gray-500 uppercase">{{ formatDate(inv.dueDate) }}</span>
                   </td>
                   <td class="px-6 py-4">
                      <p class="text-xs font-black text-gray-900">{{ inv.currency || 'USD' }} {{ inv.amount.toLocaleString() }}</p>
                   </td>
                   <td class="px-6 py-4 text-right">
                      <button class="p-2 text-gray-400 hover:text-primary transition-all">
                         <ArrowTopRightOnSquareIcon class="h-4 w-4" />
                      </button>
                   </td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { 
  ArrowDownTrayIcon, 
  DocumentTextIcon, 
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import { useFinance } from '@/composables/modules/finance/useFinance'
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()
const { invoices, stats, loading, fetchFinanceData } = useFinance()
const activeTab = ref('Invoices')

watch(user, (newUser) => {
  if (newUser) {
    fetchFinanceData()
  }
}, { immediate: true })

const financeStatsList = computed(() => [
  { label: 'Money Waiting', value: stats.value.unpaidReceivables || 0, trend: '+4% this week' },
  { label: 'Total Commission', value: stats.value.grossCommission || 0, trend: '+12% this month' },
  { label: 'Cleared Payouts', value: stats.value.clearedPayouts || 0 },
  { label: 'Late Payments', value: stats.value.overdueSettlements || 0 },
])

const statusClass = (status: string) => {
   const s = status?.toLowerCase() || ''
   if (s === 'paid') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
   if (s === 'unpaid') return 'bg-amber-50 text-amber-600 border-amber-100'
   if (s === 'overdue') return 'bg-rose-50 text-rose-600 border-rose-100'
   return 'bg-gray-50 text-gray-500 border-gray-100'
}

const formatDate = (date: string) => {
   if (!date) return 'N/A'
   return new Date(date).toLocaleDateString()
}
</script>
