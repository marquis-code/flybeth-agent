<template>
  <div class="h-screen w-screen bg-[#f0f2f5] flex overflow-hidden font-body">
    
    <!-- LEFT SIDEBAR (Chat List) -->
    <!-- On mobile, hidden if activeRoom is selected -->
    <aside 
      :class="[
        'w-full md:w-[350px] lg:w-[400px] border-r border-[#d1d7db] bg-white flex flex-col shrink-0 transition-all z-20',
        activeRoom ? 'hidden md:flex' : 'flex'
      ]"
    >
      <!-- Sidebar Header -->
      <header class="h-[60px] bg-[#f0f2f5] px-4 flex items-center justify-between shrink-0">
        <div class="flex items-center space-x-3">
          <button @click="goBack" class="md:hidden p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeftIcon class="h-5 w-5" />
          </button>
          <div class="h-10 w-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
             <!-- Agency User Profile placeholder -->
             <UserIcon class="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div class="flex items-center space-x-2 text-[#54656f]">
          <button class="p-2 hover:bg-black/5 rounded-full outline-none"><UsersIcon class="h-5 w-5"/></button>
          <button class="p-2 hover:bg-black/5 rounded-full outline-none"><ChatBubbleOvalLeftIcon class="h-5 w-5"/></button>
          <button class="p-2 hover:bg-black/5 rounded-full outline-none"><EllipsisVerticalIcon class="h-5 w-5"/></button>
        </div>
      </header>

      <!-- Sidebar Search -->
      <div class="p-2 bg-white flex items-center border-b border-gray-100">
        <div class="flex-1 bg-[#f0f2f5] rounded-lg flex items-center px-4 h-9">
          <MagnifyingGlassIcon class="h-4 w-4 text-[#54656f] mr-3" />
          <input 
            placeholder="Search or start new chat" 
            class="bg-transparent border-0 outline-none text-[15px] w-full placeholder:text-[#54656f]" 
          />
        </div>
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto bg-white">
        <div v-if="loading" v-for="i in 6" :key="i" class="flex items-center px-3 py-3 border-b border-gray-100 animate-pulse">
           <div class="h-12 w-12 rounded-full bg-gray-200 shrink-0"></div>
           <div class="flex-1 ml-3 space-y-2">
              <div class="h-4 bg-gray-200 w-1/2 rounded"></div>
              <div class="h-3 bg-gray-200 w-3/4 rounded"></div>
           </div>
        </div>
        <template v-else>
          <div 
            v-for="room in rooms" :key="room._id" 
            @click="selectRoom(room)" 
            class="flex items-center px-3 py-2.5 cursor-pointer hover:bg-[#f5f6f6] transition-colors"
            :class="activeRoom?._id === room._id ? 'bg-[#f0f2f5]' : ''"
          >
            <!-- Avatar -->
            <div class="h-[49px] w-[49px] rounded-full bg-[#dfe5e7] flex items-center justify-center text-xl font-bold text-gray-500 shrink-0 mr-3 border border-gray-200">
               {{ (room.name || 'C').charAt(0).toUpperCase() }}
            </div>
            <!-- Details -->
            <div class="flex-1 border-b border-[#f2f2f2] pb-3 pt-1">
               <div class="flex justify-between items-center mb-0.5">
                 <h3 class="text-[17px] font-normal text-[#111b21] truncate">{{ room.name || 'Client' }}</h3>
                 <span class="text-[12px] text-[#667781] whitespace-nowrap">{{ formatRoomTime(room.updatedAt || room.createdAt) }}</span>
               </div>
               <div class="flex justify-between items-center">
                 <p class="text-[14px] text-[#667781] truncate pr-4 max-w-[200px]">{{ parseLastMessage(room.lastMessage) }}</p>
                 <!-- Unread indicator example -->
                 <div v-if="room.unread" class="h-5 min-w-[20px] rounded-full bg-[#25d366] flex items-center justify-center text-white text-[11px] font-bold px-1.5">
                   {{ room.unread }}
                 </div>
               </div>
            </div>
          </div>
        </template>
      </div>
    </aside>

    <!-- RIGHT MAIN CHAT AREA -->
    <!-- On mobile, hidden if activeRoom is NOT selected -->
    <main 
      :class="[
        'flex-1 flex flex-col relative min-w-0 bg-[#efeae2]',
        !activeRoom ? 'hidden md:flex' : 'flex'
      ]"
    >
      <template v-if="activeRoom">
        <!-- Chat Header -->
        <header class="h-[60px] bg-[#f0f2f5] px-4 flex items-center justify-between shrink-0 z-10">
          <div class="flex items-center cursor-pointer">
            <button @click="activeRoom = null" class="md:hidden p-2 -ml-2 mr-1 text-[#54656f] hover:bg-black/5 rounded-full transition-colors">
              <ArrowLeftIcon class="h-5 w-5" />
            </button>
            <div class="h-10 w-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-lg font-bold text-gray-500 mr-3">
              {{ (activeRoom.name || 'C').charAt(0).toUpperCase() }}
            </div>
            <div>
              <h2 class="text-[16px] text-[#111b21] mb-0.5">{{ activeRoom.name || 'Client' }}</h2>
              <p class="text-[13px] text-[#667781] leading-none">online</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-[#54656f]">
             <button @click="startCall('video')" class="p-2 hover:bg-black/5 rounded-full outline-none"><VideoCameraIcon class="h-5 w-5"/></button>
             <button @click="startCall('audio')" class="p-2 hover:bg-black/5 rounded-full outline-none"><PhoneIcon class="h-5 w-5"/></button>
             <div class="w-[1px] h-6 bg-gray-300 mx-1"></div>
             <button class="p-2 hover:bg-black/5 rounded-full outline-none"><MagnifyingGlassIcon class="h-5 w-5"/></button>
             <button class="p-2 hover:bg-black/5 rounded-full outline-none"><EllipsisVerticalIcon class="h-5 w-5"/></button>
          </div>
        </header>

        <!-- Messages Area (with exact WhatsApp styling) -->
        <div class="flex-1 overflow-y-auto px-[5%] md:px-[9%] py-8 relative" ref="scrollBox">
           <!-- WhatsApp standard doodle background pattern -->
           <div class="absolute inset-0 opacity-[0.06] pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); background-size: 200px;"></div>
           
           <div class="flex flex-col space-y-2 relative z-10">
             <!-- Date Badge -->
             <div class="flex justify-center mb-4">
                <span class="bg-[#d2d9df] text-[#54656f] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm">TODAY</span>
             </div>

             <div 
               v-for="(msg, index) in messages" 
               :key="msg._id" 
               class="flex w-full"
               :class="isMyMessage(msg) ? 'justify-end' : 'justify-start'"
             >
               <div 
                 class="relative max-w-[85%] md:max-w-[70%] rounded-lg px-2.5 py-1.5 text-[15px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] break-words"
                 :class="isMyMessage(msg) ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none' : 'bg-white text-[#111b21] rounded-tl-none'"
               >
                 <span class="block pr-12">{{ msg.content }}</span>
                 <div class="absolute bottom-1 right-1.5 flex items-center space-x-1">
                   <span class="text-[11px] text-[#667781]">{{ formatTime(msg.createdAt || msg.time) }}</span>
                   <CheckIcon v-if="isMyMessage(msg)" class="h-3.5 w-3.5 text-[#53bdeb]" stroke-width="3" />
                 </div>
               </div>
             </div>
           </div>
        </div>

        <!-- Chat Input Footer -->
        <footer class="min-h-[62px] bg-[#f0f2f5] px-4 py-2.5 flex items-center space-x-2 shrink-0 z-10 relative">
          <button class="p-2 text-[#54656f] hover:bg-black/5 rounded-full transition-colors hidden sm:block"><FaceSmileIcon class="h-6 w-6" /></button>
          <button class="p-2 text-[#54656f] hover:bg-black/5 rounded-full transition-colors"><PlusIcon class="h-6 w-6" /></button>
          
          <div class="flex-1 bg-white rounded-lg flex items-center px-4 py-2 min-h-[42px] max-h-[120px] shadow-sm">
            <textarea 
              v-model="messageText" 
              @keydown.enter.prevent="handleSend"
              placeholder="Type a message" 
              class="w-full bg-transparent border-0 outline-none text-[15px] resize-none overflow-y-auto max-h-[100px] leading-relaxed"
              rows="1"
            ></textarea>
          </div>
          
          <button v-if="messageText.trim()" @click="handleSend" class="p-2 text-[#54656f] hover:bg-black/5 rounded-full transition-colors">
             <PaperAirplaneIcon class="h-6 w-6" />
          </button>
          <button v-else class="p-2 text-[#54656f] hover:bg-black/5 rounded-full transition-colors">
             <MicrophoneIcon class="h-6 w-6" />
          </button>
        </footer>
      </template>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center border-b-[6px] border-[#25d366] bg-[#f0f2f5] relative overflow-hidden px-6 text-center">
         <div class="mb-8 p-6 bg-white rounded-full shadow-sm">
            <ComputerDesktopIcon class="h-24 w-24 text-[#8b98a0]" />
         </div>
         <h1 class="text-[32px] font-light text-[#41525d] mb-4">Flybeth for Agencies</h1>
         <p class="text-[14px] text-[#667781] max-w-md leading-relaxed">
           Send and receive messages without keeping your phone online.<br/>
           Use this terminal on multiple devices to support travelers effortlessly.
         </p>
         <div class="mt-8 flex items-center justify-center text-[12px] text-[#8696a0] space-x-1">
            <LockClosedIcon class="h-3 w-3" />
            <span>End-to-end encrypted support line</span>
         </div>
      </div>
    </main>
    
    <!-- Active Call Overlay Mapping from original script -->
    <div v-if="activeCall" class="fixed inset-0 bg-[#111b21]/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center text-white">
       <div class="h-32 w-32 bg-white/5 rounded-full flex items-center justify-center animate-pulse mb-8 border border-white/10">
          <UserIcon class="h-16 w-16 text-gray-400" />
       </div>
       <h2 class="text-3xl font-normal mb-2">{{ activeRoom?.name || 'Client' }}</h2>
       <p class="text-sm text-gray-400 mb-16">{{ activeCall === 'video' ? 'Calling...' : 'Ringing...' }}</p>
       <div class="flex items-center space-x-6">
          <button @click="activeCall = null" class="h-14 w-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-all rotate-[135deg]">
             <PhoneIcon class="h-7 w-7" />
          </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  PhoneIcon, 
  VideoCameraIcon, 
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  ArrowLeftIcon,
  FaceSmileIcon,
  PlusIcon,
  CheckIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  MicrophoneIcon
} from '@heroicons/vue/24/solid'
import { useChat } from '@/composables/modules/chat/useChat'
import { useRealtime } from '@/composables/core/useRealtime'
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({
  layout: false
})

const { user, isLoggedIn } = useUser()
const { rooms, messages, loading, fetchRooms, fetchMessages } = useChat()
const { socket, connect, isConnected } = useRealtime()

const activeRoom = ref<any>(null)
const messageText = ref('')
const scrollBox = ref<HTMLElement | null>(null)
const activeCall = ref<string | null>(null)

const currentUserId = computed(() => {
  return user.value?._id || user.value?.id || ''
})

const goBack = () => navigateTo('/dashboard')

const parseLastMessage = (msg: any) => {
   if (!msg) return 'Awaiting response...'
   if (typeof msg === 'string') {
      try {
         const parsed = JSON.parse(msg)
         return parsed.content || 'Awaiting response...'
      } catch (e) {
         return msg
      }
   }
   return msg.content || 'Awaiting response...'
}

const formatRoomTime = (dateStr: any) => {
   if (!dateStr) return '12:45'
   return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatTime = (dateStr: any) => {
   if (!dateStr) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
   try {
     return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
   } catch {
     return dateStr
   }
}

const isMyMessage = (msg: any) => {
  if (msg.sender === 'me') return true
  const senderId = String(msg.sender?._id || msg.sender)
  if (senderId && currentUserId.value && senderId === String(currentUserId.value)) {
    return true
  }
  return false
}

const selectRoom = async (room: any) => {
   activeRoom.value = room
   await fetchMessages(room._id)
   if (socket.value) {
      socket.value.emit('joinRoom', room._id)
   }
   scrollToBottom()
}

const startCall = (type: string) => {
   activeCall.value = type
}

const handleSend = () => {
   if (!messageText.value.trim() || !socket.value || !activeRoom.value) return
   
   const payload = {
      roomId: activeRoom.value._id,
      content: messageText.value,
      type: 'text'
   }
   
   socket.value.emit('sendMessage', payload)
   
   // Optimistic UI push
   messages.value.push({
      _id: `temp-${Date.now()}`,
      sender: { _id: currentUserId.value },
      content: messageText.value,
      createdAt: new Date().toISOString()
   })
   
   messageText.value = ''
   scrollToBottom()
}

const scrollToBottom = () => {
   nextTick(() => {
      if (scrollBox.value) {
         scrollBox.value.scrollTop = scrollBox.value.scrollHeight
      }
   })
}

const handleNewMessage = (e: any) => {
     const msg = e.detail
     if (activeRoom.value && (msg.room === activeRoom.value._id || msg.room?._id === activeRoom.value._id)) {
        // Prevent dupes
        const tempIdx = messages.value.findIndex(m => 
          m._id.startsWith('temp-') && m.content === msg.content
        )
        if (tempIdx !== -1) {
           messages.value[tempIdx] = msg
        } else if (!messages.value.find(m => m._id === msg._id)) {
           messages.value.push(msg)
           scrollToBottom()
        }
     }
}

onMounted(async () => {
   if (!isConnected.value) connect()
   await fetchRooms()
   
   window.addEventListener('new-chat-message', handleNewMessage)
})

onUnmounted(() => {
   window.removeEventListener('new-chat-message', handleNewMessage)
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
}
</style>
