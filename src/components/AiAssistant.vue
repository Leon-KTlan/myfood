<template>
  <div class="space-y-6">
    <div class="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/10">
      <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
        <span class="text-4xl">🤖</span>
        AI 智能助手
      </h2>

      <!-- 聊天区域 -->
      <div class="bg-[#0D121F] rounded-xl p-6 h-[500px] overflow-y-auto mb-4 space-y-4">
        <div
          v-for="(message, index) in aiMessages"
          :key="index"
          class="flex"
          :class="message.type === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] rounded-2xl p-4"
            :class="message.type === 'user'
              ? 'bg-blue-600/30 text-white'
              : 'bg-gray-800/50 text-gray-200'"
          >
            <div class="flex items-start gap-3">
              <span v-if="message.type === 'ai'" class="text-2xl">🤖</span>
              <div class="flex-1">
                <p class="text-sm mb-1 opacity-70">
                  {{ message.type === 'user' ? '你' : 'AI助手' }}
                </p>
                <p v-if="message.type !== 'loading'" class="whitespace-pre-wrap">
                  {{ message.content }}
                </p>
                <div v-else class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <div
                      class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style="animation-delay: 0s"
                    ></div>
                    <div
                      class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style="animation-delay: 0.2s"
                    ></div>
                    <div
                      class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style="animation-delay: 0.4s"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-400">AI 正在思考...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="flex gap-3">
        <input
          v-model="aiInput"
          @keyup.enter="!isLoading && sendAIMessage()"
          :disabled="isLoading"
          type="text"
          placeholder="问我任何关于美食的问题..."
          class="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          @click="sendAIMessage"
          :disabled="isLoading || !aiInput.trim()"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="!isLoading">发送</span>
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            发送中...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed, nextTick } from 'vue'
import { chatWithAI } from '../services/openai'

// 1. 接收父组件传来的历史订单
const props = defineProps({
  orderHistory: {
    type: Array,
    default: () => []
  }
})

const aiMessages = ref([
  {
    type: 'ai',
    content: '你好！我是你的AI美食顾问。我已经了解了你的口味偏好，有什么想吃的吗？',
  },
])

const aiInput = ref('')
const isLoading = ref(false)

// 2. 构建对话上下文，包含历史对话
const conversationHistory = computed(() => {
  return aiMessages.value
    .filter((msg) => msg.type !== 'loading')
    .map((msg) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }))
    .slice(1) // 去掉第一条默认欢迎语，避免干扰
})

const sendAIMessage = async () => {
  if (!aiInput.value.trim() || isLoading.value) return

  const userMessage = aiInput.value.trim()
  aiInput.value = ''

  // 添加用户消息到界面
  aiMessages.value.push({ type: 'user', content: userMessage })
  
  // 添加 Loading 状态
  const loadingMessageIndex = aiMessages.value.length
  aiMessages.value.push({ type: 'loading', content: '' })
  isLoading.value = true

  // 3. 核心逻辑：生成“系统提示词”，注入订单历史
  // 将订单数组转换为字符串，例如："麻婆豆腐, 柠檬茶"
  const historyText = props.orderHistory.length > 0 
    ? props.orderHistory.map(o => o.name).join('、') 
    : '暂无'
    
  const systemPrompt = {
    role: 'system',
    content: `你是一个专业的AI美食顾问。
    已知该用户的历史订单包含：${historyText}。
    请根据用户的历史口味偏好（例如是否吃辣、喜欢清淡等）来进行推荐。
    如果用户问推荐什么，优先结合历史记录进行联想推荐。`
  }

  // 组合最终发送给 API 的消息列表：[系统提示, ...历史对话, 用户当前问题]
  // 注意：这里我们假设 chatWithAI 函数支持传入完整的 messages 数组
  const fullMessages = [
    systemPrompt, 
    ...conversationHistory.value, 
    { role: 'user', content: userMessage }
  ]

  try {
    // 调用 API
    const response = await chatWithAI(userMessage, fullMessages)

    // 更新界面显示
    aiMessages.value.splice(loadingMessageIndex, 1, {
      type: 'ai',
      content: response,
    })
  } catch (error) {
    let errorMsg = '抱歉，连接出了点问题。'
    // 专门处理 Key 缺失的错误提示
    if (error.message && error.message.includes('API Key')) {
      errorMsg = '未检测到通义千问密钥，请在 .env.local 中配置 VUE_APP_QWEN_API_KEY。'
    }
    
    aiMessages.value.splice(loadingMessageIndex, 1, {
      type: 'ai',
      content: errorMsg,
    })
    console.error('AI Error:', error)
  } finally {
    isLoading.value = false
    // 滚动到底部
    nextTick(() => {
      const chatContainer = document.querySelector('.chat-box')
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
    })
  }
}
</script>

