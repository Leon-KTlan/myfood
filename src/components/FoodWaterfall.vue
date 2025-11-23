<template>
  <div class="space-y-6">
    
    <div v-if="!currentShop" class="animate-fade-in">
      <div class="sticky top-20 z-30 bg-[#0B0F19]/90 backdrop-blur py-2 mb-6">
        <div class="relative">
          <input 
            v-model="shopSearch"
            type="text" 
            placeholder="🔍 搜店铺..."
            class="w-full bg-gray-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm"
          >
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🏪</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="shop in filteredShops" 
          :key="shop.id"
          @click="enterShop(shop)"
          class="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition cursor-pointer group relative"
        >
          <div class="h-48 w-full bg-gray-800 relative overflow-hidden">
             <img v-if="shop.image" :src="shop.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
             <div v-else class="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-900 to-purple-900">🏪</div>
             <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             
             <div class="absolute bottom-4 left-4 right-4">
               <h3 class="text-xl font-bold text-white mb-1">{{ shop.name }}</h3>
               <div class="flex items-center gap-2 text-xs">
                 <span class="text-yellow-400 font-bold">⭐ {{ shop.rating }}</span>
                 <span class="text-gray-400">| 月售 {{ shop.sales }}+</span>
               </div>
             </div>
          </div>
          
          <div class="p-4 flex flex-wrap gap-2">
            <span v-for="tag in shop.tags" :key="tag" class="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="animate-slide-up">
      <div class="flex items-center gap-4 mb-6 sticky top-20 z-40 bg-[#0B0F19]/95 py-2 border-b border-white/10">
        <button @click="exitShop" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
          ←
        </button>
        <div>
          <h2 class="font-bold text-lg leading-tight">{{ currentShop.name }}</h2>
          <p class="text-xs text-gray-500">正在点餐</p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl animate-pulse">🤖</div>
          <div>
            <h3 class="font-bold text-blue-200">AI 进店推荐</h3>
            <p class="text-xs text-gray-400">这家店的招牌菜很适合你的口味！</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="food in currentShop.menu" :key="food.id" class="bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden food-card-hover group relative flex flex-col">
          <div v-if="food.aiReason" class="absolute top-2 left-2 right-2 z-10">
             <div class="bg-black/60 backdrop-blur-md border border-blue-500/30 text-blue-300 text-xs px-3 py-2 rounded-lg shadow-lg flex items-start gap-2">
               <span class="text-base">💡</span><span>{{ food.aiReason }}</span>
             </div>
          </div>
          <div class="h-40 w-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative overflow-hidden">
             <span class="text-6xl transform group-hover:scale-110 transition duration-500">{{ food.icon }}</span>
          </div>
          <div class="p-4 flex-1 flex flex-col">
             <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg text-white truncate">{{ food.name }}</h3>
                <div class="text-right">
                  <span class="block text-xs text-gray-500">销量 {{ food.sales }}</span>
                </div>
             </div>
             <p class="text-gray-500 text-xs mb-4 line-clamp-2 flex-1">{{ food.description }}</p>
             <div class="mt-auto flex items-end justify-between border-t border-white/5 pt-3">
                <div class="flex items-baseline gap-2">
                  <span class="text-xl font-bold text-red-400">¥{{ food.currentPrice }}</span>
                  <span v-if="food.originalPrice" class="text-xs text-gray-600 line-through decoration-gray-500">¥{{ food.originalPrice }}</span>
                </div>
                
                <div v-if="getCartCount(food.id) > 0" class="flex items-center gap-3 bg-gray-800 rounded-lg px-2 py-1">
                   <button @click="updateCart(food, -1)" class="text-gray-400 hover:text-white font-bold px-1">-</button>
                   <span class="text-sm font-bold text-white">{{ getCartCount(food.id) }}</span>
                   <button @click="updateCart(food, 1)" class="text-blue-400 hover:text-blue-300 font-bold px-1">+</button>
                </div>
                <button v-else @click="updateCart(food, 1)" class="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg shadow-blue-900/20 transition">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </button>
             </div>
          </div>
        </div>
      </div>
      
      <div v-if="totalCartCount > 0" class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1A1F2E] border border-blue-500/30 rounded-full p-2 pr-6 shadow-2xl shadow-blue-900/30 flex items-center justify-between z-50 backdrop-blur-md">
        <div class="flex items-center gap-4">
          <div class="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative">
            🛒
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1A1F2E]">{{ totalCartCount }}</span>
          </div>
          <div>
            <p class="text-white font-bold text-lg">¥{{ totalCartPrice }}</p>
            <p class="text-xs text-gray-400">预计 25 分钟后送达</p>
          </div>
        </div>
        <button @click="checkoutCart" class="text-blue-400 font-bold text-sm hover:text-white transition">去结算 ></button>
      </div>

    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, computed } from 'vue'

// 1. 接收父组件传入的所有店铺数据
const props = defineProps({
  shops: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['checkout'])

// 状态管理
const currentShop = ref(null) // 当前选中的店铺，null 表示在列表页
const shopSearch = ref('')
const cart = ref({}) // 购物车 { foodId: quantity }

// --- 店铺列表逻辑 ---
const filteredShops = computed(() => {
  if (!shopSearch.value) return props.shops
  return props.shops.filter(s => s.name.includes(shopSearch.value) || s.tags.includes(shopSearch.value))
})

const enterShop = (shop) => {
  currentShop.value = shop
  cart.value = {} // 进新店清空购物车（简化逻辑）
}

const exitShop = () => {
  currentShop.value = null
  cart.value = {}
}

// --- 购物车逻辑 (仅针对 currentShop.menu) ---
const getCartCount = (id) => cart.value[id] || 0

const updateCart = (food, change) => {
  const current = cart.value[food.id] || 0
  const newCount = current + change
  if (newCount <= 0) delete cart.value[food.id]
  else cart.value[food.id] = newCount
}

const totalCartCount = computed(() => Object.values(cart.value).reduce((a, b) => a + b, 0))

const totalCartPrice = computed(() => {
  if (!currentShop.value) return 0
  let total = 0
  for (const [id, count] of Object.entries(cart.value)) {
    const food = currentShop.value.menu.find(f => f.id == id)
    if (food) total += food.currentPrice * count
  }
  return total
})

const checkoutCart = () => {
  if (!currentShop.value) return
  
  // 生成订单信息
  const itemIds = Object.keys(cart.value)
  const firstItem = currentShop.value.menu.find(f => f.id == itemIds[0])
  const orderName = totalCartCount.value > 1 
    ? `${currentShop.value.name}：${firstItem.name} 等` 
    : `${currentShop.value.name}：${firstItem.name}`

  const orderData = {
    id: Date.now(),
    name: orderName,
    price: totalCartPrice.value,
    date: new Date().toLocaleDateString(),
    icon: '🛍️'
  }

  emit('checkout', orderData)
  // 结算后退出店铺或清空购物车
  cart.value = {}
  currentShop.value = null
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>