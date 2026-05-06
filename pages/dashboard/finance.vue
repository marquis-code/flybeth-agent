<template>
  <div class="space-y-10">
    <!-- Wallet Card & Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Digital Wallet Card -->
      <div class="lg:col-span-2 relative h-[280px] rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-2xl shadow-primary/20 group">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative h-full p-10 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Sparkles class="h-5 w-5 text-white" />
              </div>
              <span class="text-sm  text-white uppercase ">Flybeth Wallet</span>
            </div>
            <div class="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm  uppercase tracking-widest flex items-center">
              <span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Active
            </div>
          </div>

          <div>
             <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Available Balance</p>
             <div class="flex items-baseline space-x-4">
                <h3 class="text-5xl  text-white tracking-tighter">{{ formatPrice(walletBalance) }}</h3>
                <span class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ currentCurrency.code }}</span>
             </div>
          </div>

          <div class="flex items-center space-x-10">
            <div>
               <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Account Number</p>
               <p class="text-base  text-white tracking-widest">•••• •••• 4242</p>
            </div>
            <div class="h-10 w-px bg-white/10"></div>
            <div>
               <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Agency Tier</p>
               <p class="text-base  text-white uppercase tracking-widest">Premium Agent</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
        <h4 class="text-sm  text-gray-900 uppercase tracking-widest mb-6">Quick Actions</h4>
        <div class="space-y-4">
          <button @click="showTopUpModal = true" class="w-full h-16 bg-primary text-white rounded-2xl  uppercase tracking-widest flex items-center justify-center group hover:shadow-xl hover:shadow-primary/20 transition-all transition-all duration-300">
            <PlusIcon class="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform" />
            Top Up Wallet
          </button>
          <button class="w-full h-16 bg-gray-50 text-gray-800 rounded-2xl  uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all">
            Transfer Funds
          </button>
        </div>
        <p class="text-sm text-gray-400 font-bold uppercase tracking-widest text-center mt-6">Instant settlements via Stripe</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div v-for="stat in financeStatsList" :key="stat.label" class="bg-white p-8 rounded-[2rem] border border-gray-100 group hover:border-primary/20 transition-all">
          <div class="flex items-center justify-between mb-4">
             <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
             <div class="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <component :is="stat.icon" class="h-4 w-4 text-gray-400 group-hover:text-primary" />
             </div>
          </div>
          <div class="flex items-baseline space-x-2">
             <p class="text-2xl  text-gray-900 tracking-tight">{{ formatPrice(stat.value) }}</p>
             <span v-if="stat.trend" class="text-sm  text-emerald-500 uppercase tracking-tighter">{{ stat.trend }}</span>
          </div>
       </div>
    </div>

    <!-- Tabs Content -->
    <div class="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-gray-100/10">
       <div class="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center space-x-8">
             <button v-for="tab in ['Wallet History', 'Invoices', 'Payouts']" :key="tab" @click="activeTab = tab" class="text-sm  uppercase tracking-widest transition-all relative pb-2" :class="activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'">
               {{ tab }}
               <div v-if="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full animate-in zoom-in"></div>
             </button>
          </div>
          
          <div class="relative group max-w-md">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary" />
            <input placeholder="Filter transactions..." class="h-12 bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 text-sm font-bold outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all w-full md:w-64" />
          </div>
       </div>

       <!-- Table Content -->
       <div class="overflow-x-auto">
          <div v-if="activeTab === 'Wallet History'">
             <table class="w-full text-left">
                <thead>
                   <tr class="bg-gray-50/50">
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Transaction ID</th>
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Type</th>
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Description</th>
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Amount</th>
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Status</th>
                      <th class="px-8 py-5 text-sm font-bold uppercase tracking-widest text-gray-400">Date</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                   <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                      <td v-for="j in 6" :key="j" class="px-8 py-6"><div class="h-4 bg-gray-50 rounded w-full"></div></td>
                   </tr>
                   <tr v-else-if="transactions.length === 0" class="text-center py-20">
                      <td colspan="6" class="py-32 text-sm font-bold text-gray-500 uppercase tracking-widest opacity-40">No wallet activity recorded yet</td>
                   </tr>
                   <tr v-else v-for="tx in transactions" :key="tx._id" class="hover:bg-gray-50/50 transition-colors group">
                      <td class="px-8 py-6">
                         <span class="text-sm  text-gray-900 tracking-tight">{{ tx.reference }}</span>
                      </td>
                      <td class="px-8 py-6">
                         <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 rounded-full" :class="tx.type === 'debit' ? 'bg-rose-500' : 'bg-emerald-500'"></div>
                            <span class="text-sm font-bold text-gray-900 uppercase">{{ tx.type }}</span>
                         </div>
                      </td>
                      <td class="px-8 py-6 max-w-xs">
                         <p class="text-sm font-bold text-gray-800 line-clamp-1">{{ tx.description }}</p>
                      </td>
                      <td class="px-8 py-6">
                         <p class="text-sm  tracking-tight" :class="tx.type === 'debit' ? 'text-rose-600' : 'text-emerald-600'">
                           {{ tx.type === 'debit' ? '-' : '+' }}{{ formatPrice(tx.amount) }}
                         </p>
                      </td>
                      <td class="px-8 py-6">
                         <span class="text-sm  px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full uppercase tracking-tighter border border-emerald-100">{{ tx.status }}</span>
                      </td>
                      <td class="px-8 py-6">
                         <span class="text-sm font-bold text-gray-400 lowercase">{{ formatTime(tx.createdAt) }}</span>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>
          <!-- Other tabs omitted for brevity, same pattern as before -->
       </div>
    </div>

    <!-- Top Up Modal -->
    <BaseModal :show="showTopUpModal" title="Top Up Wallet" @close="showTopUpModal = false">
       <div class="p-6 space-y-8">
          <div class="space-y-4">
             <label class="text-sm  text-gray-900 uppercase tracking-widest">Amount to Fund</label>
             <div class="relative group">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg group-focus-within:text-primary">{{ currentCurrency.symbol }}</span>
                <input v-model="topUpAmount" type="number" class="w-full h-20 bg-gray-50 border-2 border-gray-100 rounded-[2rem] pl-12 pr-6 text-2xl  text-gray-900 focus:bg-white focus:border-primary transition-all outline-none" />
             </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
             <button v-for="amt in [500, 1000, 2500]" :key="amt" @click="topUpAmount = amt" class="h-14 border border-gray-100 rounded-2xl text-sm  text-gray-800 hover:border-primary hover:text-primary transition-all">
                +{{ amt }}
             </button>
          </div>

          <div class="bg-gray-900 rounded-3xl p-6 flex items-center justify-between">
             <div class="flex items-center gap-4 text-white">
                <ShieldCheckIcon class="h-6 w-6 text-primary" />
                <span class="text-sm font-bold">Encrypted Checkout</span>
             </div>
             <img src="/stripe-badge.png" class="h-6 opacity-60" />
          </div>

          <button @click="handleTopUp" :disabled="isTopUpProcessing" class="w-full h-16 bg-primary text-white rounded-2xl  uppercase tracking-widest flex items-center justify-center transition-all hover:shadow-xl hover:shadow-primary/20 disabled:grayscale">
            <template v-if="!isTopUpProcessing">Process Funding</template>
            <div v-else class="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </button>
       </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { 
  ArrowDownTrayIcon, 
  DocumentTextIcon, 
  PlusIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import { Search, Sparkles, Banknote, Receipt, ArrowUpRight, TrendingUp } from 'lucide-vue-next'
import { useFinance } from '@/composables/modules/finance/useFinance'
import { useUser } from '@/composables/modules/auth/user'
import { useSettings } from '@/composables/useSettings'
import BaseModal from '@/components/ui/BaseModal.vue'

definePageMeta({
  layout: 'dashboard'
})

const { user } = useUser()
const { formatPrice, currentCurrency } = useSettings()
const { invoices, stats, walletBalance, transactions, loading, fetchFinanceData, fetchWalletData, initializeTopUp } = useFinance()

const activeTab = ref('Wallet History')
const showTopUpModal = ref(false)
const topUpAmount = ref(1000)
const isTopUpProcessing = ref(false)

onMounted(() => {
  fetchFinanceData()
  fetchWalletData()
})

const financeStatsList = computed(() => [
  { label: 'Unpaid Receivables', value: stats.value.unpaidReceivables || 0, icon: Receipt },
  { label: 'Gross Commission', value: stats.value.grossCommission || 0, trend: 'UP', icon: TrendingUp },
  { label: 'Cleared Payouts', value: stats.value.clearedPayouts || 0, icon: Banknote },
  { label: 'Pending Bookings', value: stats.value.overdueSettlements || 0, icon: ArrowUpRight },
])

const handleTopUp = async () => {
   isTopUpProcessing.value = true
   try {
      await initializeTopUp(topUpAmount.value, currentCurrency.value.code)
   } catch (error) {
      console.error(error)
   } finally {
      isTopUpProcessing.value = false
   }
}

const formatTime = (date: string) => {
   return new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}
</script>
