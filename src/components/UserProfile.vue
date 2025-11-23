<template>
  <div class="space-y-6">
    <div class="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 flex items-center gap-6">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
        👨‍💻
      </div>
      <div>
        <h2 class="text-2xl font-bold text-white">CyberGourmet</h2>
        <div class="flex items-center gap-4 mt-2 text-sm text-gray-400">
          <span class="bg-blue-900/30 px-2 py-1 rounded text-blue-300">🌶️ 重度嗜辣</span>
          <span>积分: {{ 2450 + orders.length * 10 }}</span>
          <span>总消费: ¥{{ totalSpent }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          制作进度监控
        </h3>
        
        <div v-if="orders.length > 0" class="space-y-6">
          <div class="relative pt-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-white font-medium">{{ orders[0].name }}</span>
              <span class="text-blue-400">预计 12 分钟</span>
            </div>
            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-green-400 w-[65%] rounded-full relative">
                <div class="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-ping"></div>
              </div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>接单</span>
              <span class="text-white font-bold">制作中</span>
              <span>配送</span>
              <span>送达</span>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-sm py-4">暂无进行中的订单</div>
      </div>

      <div class="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
        <h3 class="text-lg font-bold mb-4">过去下单记录</h3>
        <div class="space-y-4 max-h-[300px] overflow-y-auto">
          <div v-for="order in orders" :key="order.id" class="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="text-2xl">{{ order.icon }}</div>
              <div>
                <p class="font-bold text-sm">{{ order.name }}</p>
                <p class="text-xs text-gray-400">{{ order.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold">¥{{ order.price }}</p>
              <button class="text-xs text-blue-400 mt-1 hover:underline">再来一单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
// 🔴 修复点 5：引入 computed
import { computed } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

const totalSpent = computed(() => {
  return props.orders.reduce((sum, order) => sum + order.price, 0)
})
</script>