<template>
  <div v-if="editor" class="border border-gray-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm ring-1 ring-gray-50 flex flex-col">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-1.5 p-4 bg-gray-50/50 border-b border-gray-100 sticky top-0 z-10">
      <!-- Formatting Group -->
      <div class="flex items-center space-x-1 pr-3 border-r border-gray-200">
        <button v-for="h in [1, 2, 3]" :key="h" @click="editor.chain().focus().toggleHeading({ level: h }).run()" 
          class="px-2.5 py-1.5 rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-400 font-black text-[10px] uppercase"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('heading', { level: h }) }">
          H{{ h }}
        </button>
      </div>

      <div class="flex items-center space-x-1 px-3 border-r border-gray-200">
        <button @click="editor.chain().focus().toggleBold().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('bold') }" v-html="BoldIcon">
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('italic') }" v-html="ItalicIcon">
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('underline') }" v-html="UnderlineIcon">
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('strike') }">
          <s>S</s>
        </button>
      </div>

      <!-- Alignment Group -->
      <div class="flex items-center space-x-1 px-3 border-r border-gray-200">
        <button @click="editor.chain().focus().setTextAlign('left').run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive({ textAlign: 'left' }) }">
          <Bars3BottomLeftIcon class="h-4 w-4" />
        </button>
        <button @click="editor.chain().focus().setTextAlign('center').run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive({ textAlign: 'center' }) }">
          <Bars3Icon class="h-4 w-4" />
        </button>
        <button @click="editor.chain().focus().setTextAlign('right').run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive({ textAlign: 'right' }) }">
          <Bars3BottomRightIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- List Group -->
      <div class="flex items-center space-x-1 px-3 border-r border-gray-200">
        <button @click="editor.chain().focus().toggleBulletList().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('bulletList') }" v-html="ListIcon">
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('orderedList') }">
          <ListBulletIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- Embedding Group -->
      <div class="flex items-center space-x-1 px-3 border-r border-gray-200">
        <button @click="setLink" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400" :class="{ 'bg-white shadow-sm text-primary': editor.isActive('link') }">
          <LinkIcon class="h-4 w-4" />
        </button>
        <button @click="addImage" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400">
          <PhotoIcon class="h-4 w-4" />
        </button>
        <button @click="editor.chain().focus().toggleBlockquote().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400"
          :class="{ 'bg-white shadow-sm text-primary': editor.isActive('blockquote') }">
          <ChatBubbleLeftRightIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- Utility Group -->
      <div class="flex items-center space-x-1 pl-3">
        <button @click="editor.chain().focus().undo().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400">
          <ArrowUturnLeftIcon class="h-4 w-4" />
        </button>
        <button @click="editor.chain().focus().redo().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400">
          <ArrowUturnRightIcon class="h-4 w-4" />
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()" class="p-2.5 rounded-xl hover:bg-white transition-all text-gray-400">
           <NoSymbolIcon class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Editor Area -->
    <div class="flex-grow overflow-y-auto max-h-[700px] bg-white custom-scrollbar">
       <EditorContent :editor="editor" class="prose prose-sm max-w-none p-12 min-h-[500px] focus:outline-none" />
    </div>
    
    <!-- Status Footer -->
    <div class="px-8 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
       <div class="flex items-center space-x-6">
          <div class="flex items-center gap-2">
             <span class="text-primary">{{ editor.storage.characterCount.characters() }}</span>
             <span>Characters</span>
          </div>
          <div class="flex items-center gap-2">
             <span class="text-primary">{{ editor.storage.characterCount.words() }}</span>
             <span>Words</span>
          </div>
       </div>
       <div class="flex items-center space-x-2 text-emerald-500">
          <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>Branding Engine Synchronized</span>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { 
  PhotoIcon, 
  ArrowUturnLeftIcon, 
  ArrowUturnRightIcon,
  CheckBadgeIcon,
  LinkIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  NoSymbolIcon
} from '@heroicons/vue/24/outline'

const BoldIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H6v-8Z"/><path d="M6 4h8a4 4 0 0 1 0 8H6V4Z"/></svg>`
const ItalicIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4h-9"/><path d="M14 20H5"/><path d="M15 4L9 20"/></svg>`
const UnderlineIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline"><path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" x2="20" y1="21" y2="21"/></svg>`
const ListIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Image.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'rounded-3xl shadow-lg border border-gray-100 max-w-full'
      }
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary font-bold underline decoration-dotted'
      }
    }),
    Placeholder.configure({
      placeholder: 'Construct your narrative here...',
    }),
    CharacterCount,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'focus:outline-none min-h-[500px]',
    },
  },
})

const addImage = () => {
  const url = window.prompt('Image URL')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

const setLink = () => {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val)
  }
})
</script>

<style>
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
.ProseMirror:focus {
  outline: none;
}
.ProseMirror {
  outline: none !important;
}
.ProseMirror blockquote {
  padding-left: 1.5rem;
  border-left: 4px solid #F3F4F6;
  font-style: italic;
  color: #6B7280;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #F3F4F6;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #E5E7EB;
}
.ProseMirror em {
  font-style: italic !important;
}
.ProseMirror strong {
  font-weight: 700 !important;
}
.ProseMirror u {
  text-decoration: underline !important;
}
.ProseMirror s {
  text-decoration: line-through !important;
}
.ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
}
.ProseMirror h1 { font-size: 2em; font-weight: 800; margin: 0.5em 0; }
.ProseMirror h2 { font-size: 1.5em; font-weight: 700; margin: 0.5em 0; }
.ProseMirror h3 { font-size: 1.2em; font-weight: 700; margin: 0.5em 0; }
.ProseMirror img { max-width: 100%; height: auto; }
.ProseMirror a { color: #0D1DAD; text-decoration: underline; }
</style>
