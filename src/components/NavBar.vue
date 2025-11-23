<template>
  <nav class="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link
        to="/"
        class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition"
      >
        SmartCatering AI
      </router-link>

      <div class="flex items-center gap-4">
        <div class="inline-flex bg-gray-800 p-1 rounded-full border border-white/10">
          <button
            @click="$emit('mode-change', 'user')"
            class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
            :class="currentMode === 'user'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-400 hover:text-white'"
          >
            用户模式
          </button>
          <button
            @click="$emit('mode-change', 'merchant')"
            class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
            :class="currentMode === 'merchant'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-400 hover:text-white'"
          >
            商家模式
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/* eslint-disable no-undef */
// 上面这行注释是为了防止 ESLint 报错 'defineProps is not defined'

defineProps({
  currentMode: {
    type: String,
    default: 'user',
  },
})

defineEmits(['mode-change'])
</script>