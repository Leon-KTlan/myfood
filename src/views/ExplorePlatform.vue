<template>
  <div class="min-h-screen bg-[#0B0F19] text-white pb-20">
    <NavBar @mode-change="handleModeChange" :current-mode="userMode" />

    <main class="pt-20 max-w-7xl mx-auto px-4 sm:px-6">
      
      <div v-if="userMode === 'user'">
        <div class="flex gap-6 mb-8 overflow-x-auto no-scrollbar border-b border-white/10 pb-1">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="whitespace-nowrap px-2 py-2 text-sm font-medium border-b-2 transition-all duration-300"
            :class="activeTab === tab.id 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-400 hover:text-gray-200'"
          >
            {{ tab.name }}
          </button>
        </div>

        <Transition name="fade" mode="out-in">
          
          <FoodWaterfall 
            v-if="activeTab === 'restaurant'" 
            :shops="allShops"
            @checkout="handleNewOrder" 
          />

          <CommunityFeed v-else-if="activeTab === 'community'" />

          <AiAssistant 
            v-else-if="activeTab === 'ai'" 
            :order-history="orderHistory" 
          />

          <UserProfile 
            v-else-if="activeTab === 'profile'" 
            :orders="orderHistory" 
          />
          
        </Transition>
      </div>

      <div v-else>
         <MerchantDashboard @add-shop="handleAddShop" />
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import FoodWaterfall from '../components/FoodWaterfall.vue'
import UserProfile from '../components/UserProfile.vue'
import AiAssistant from '../components/AiAssistant.vue'
import CommunityFeed from '../components/CommunityFeed.vue'
import MerchantDashboard from '../components/MerchantDashboard.vue' // 引入新组件

const userMode = ref('user')
const activeTab = ref('restaurant') 

const tabs = [
  { id: 'restaurant', name: '🏪 逛吃店铺' }, // 改名了
  { id: 'community', name: '📸 社区' },
  { id: 'ai', name: '🤖 私人顾问' },
  { id: 'profile', name: '👤 我的主页' }
]

const handleModeChange = (mode) => {
  userMode.value = mode
}

// --- 数据中心 ---

// 1. 初始化店铺数据（原来的假数据现在放在这里）
const initialRestaurants = [
  {
    id: 1,
    name: '川渝火锅局',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    sales: 1200,
    tags: ['川菜', '火锅', '辣'],
    menu: [
      { id: 101, name: '麻婆豆腐 PRO', description: '采用黑猪肉末，配合四川空运花椒。', originalPrice: 32, currentPrice: 28, sales: 1200, rating: 4.9, icon: '🍲', aiReason: '进店必点！' },
      { id: 102, name: '暴打柠檬茶', description: '手打香水柠檬，解辣神器。', originalPrice: 22, currentPrice: 18, sales: 3000, rating: 4.8, icon: '🍋', aiReason: '解辣神器' }
    ]
  },
  {
    id: 2,
    name: '轻食沙拉站',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    sales: 850,
    tags: ['轻食', '健康', '低卡'],
    menu: [
      { id: 201, name: '鸡胸能量碗', description: '低卡路里，适合健身人士。', originalPrice: 45, currentPrice: 38, sales: 850, rating: 4.7, icon: '🥗', aiReason: '低卡首选' }
    ]
  }
]

const allShops = ref(initialRestaurants)
const orderHistory = ref([])

// 2. 商家发布店铺逻辑
const handleAddShop = (newShop) => {
  // 添加到店铺列表头部
  allShops.value.unshift(newShop)
}

// 3. 用户下单逻辑
const handleNewOrder = (newOrder) => {
  orderHistory.value.unshift(newOrder)
  alert('🎉 下单成功！正在为您制作中...')
  activeTab.value = 'profile'
}
</script>