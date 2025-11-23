<template>
    <div class="space-y-8 pb-20">
      <div class="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6">
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <span class="text-3xl">🏪</span> 商家入驻 / 新品上架
        </h2>
        <p class="text-gray-400 text-sm mt-2">请完善店铺基本信息及菜单配置</p>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="space-y-6">
          <div class="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 text-blue-300">1. 店铺档案</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">店铺名称</label>
                <input v-model="shopForm.name" type="text" placeholder="例如：川渝火锅局" class="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none">
              </div>
  
              <div>
                <label class="block text-sm text-gray-400 mb-1">店铺标签 (用逗号分隔)</label>
                <input v-model="shopForm.tags" type="text" placeholder="例如：川菜, 辣, 老字号" class="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none">
              </div>
  
              <div>
                <label class="block text-sm text-gray-400 mb-2">店铺封面图</label>
                <div class="flex items-start gap-4">
                  <div v-if="shopForm.previewImage" class="w-32 h-32 rounded-xl overflow-hidden border border-white/10 relative group">
                    <img :src="shopForm.previewImage" class="w-full h-full object-cover">
                    <button @click="removeShopImage" class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-red-400">删除</button>
                  </div>
                  <label v-else class="w-32 h-32 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition text-gray-500">
                    <span class="text-2xl">+</span>
                    <span class="text-xs mt-1">上传封面</span>
                    <input type="file" accept="image/*" class="hidden" @change="handleShopImageUpload">
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="space-y-6">
          <div class="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-purple-300">2. 菜单管理</h3>
              <button @click="addEmptyDish" class="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg border border-white/10 transition">+ 添加一行</button>
            </div>
  
            <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <div v-for="(dish, index) in shopForm.menu" :key="index" class="bg-black/20 p-4 rounded-xl border border-white/5 relative group">
                <button @click="removeDish(index)" class="absolute top-2 right-2 text-gray-600 hover:text-red-400 transition">✕</button>
                
                <div class="grid grid-cols-[60px_1fr] gap-4">
                  <div class="flex items-center justify-center bg-gray-800 rounded-lg text-2xl h-full cursor-pointer hover:bg-gray-700" title="点击切换图标">
                    <input v-model="dish.icon" type="text" class="w-full h-full bg-transparent text-center focus:outline-none" placeholder="🍲">
                  </div>
                  
                  <div class="space-y-2">
                    <div class="flex gap-2">
                      <input v-model="dish.name" type="text" placeholder="菜品名称" class="flex-1 bg-transparent border-b border-white/10 focus:border-blue-500 focus:outline-none text-sm pb-1">
                      <input v-model.number="dish.price" type="number" placeholder="价格" class="w-20 bg-transparent border-b border-white/10 focus:border-blue-500 focus:outline-none text-sm pb-1 text-right">
                    </div>
                    <input v-model="dish.description" type="text" placeholder="描述（如：微辣，推荐）" class="w-full bg-transparent text-xs text-gray-500 focus:outline-none">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="fixed bottom-0 left-0 w-full bg-[#0B0F19]/90 backdrop-blur-lg border-t border-white/10 p-4 z-40">
        <div class="max-w-7xl mx-auto flex justify-end gap-4">
          <button class="px-6 py-3 rounded-xl text-gray-400 font-bold hover:text-white transition">重置</button>
          <button 
            @click="publishShop"
            :disabled="!isValid"
            class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            立即发布店铺
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  /* eslint-disable no-undef */
  import { ref, computed } from 'vue'
  
  const emit = defineEmits(['add-shop'])
  
  const shopForm = ref({
    name: '',
    tags: '',
    previewImage: null,
    menu: [
      { name: '', price: null, description: '', icon: '🥘' } // 默认一行
    ]
  })
  
  // 简单的校验
  const isValid = computed(() => {
    return shopForm.value.name.trim() && 
           shopForm.value.menu.some(d => d.name && d.price)
  })
  
  const handleShopImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) shopForm.value.previewImage = URL.createObjectURL(file)
  }
  
  const removeShopImage = () => {
    shopForm.value.previewImage = null
  }
  
  const addEmptyDish = () => {
    shopForm.value.menu.push({ name: '', price: null, description: '', icon: '🍴' })
  }
  
  const removeDish = (index) => {
    shopForm.value.menu.splice(index, 1)
  }
  
  const publishShop = () => {
    // 构造数据结构
    const newShop = {
      id: Date.now(),
      name: shopForm.value.name,
      image: shopForm.value.previewImage || 'https://via.placeholder.com/400x200?text=No+Image', // 默认图
      tags: shopForm.value.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean),
      rating: 5.0, // 新店默认5分
      sales: 0,
      menu: shopForm.value.menu.filter(d => d.name && d.price).map((d, i) => ({
        id: Date.now() + i,
        name: d.name,
        currentPrice: d.price,
        originalPrice: Math.floor(d.price * 1.2), // 模拟原价
        description: d.description || '暂无描述',
        sales: 0,
        rating: 5.0,
        icon: d.icon,
        aiReason: i === 0 ? '店长推荐新品' : null // 简单的AI理由模拟
      }))
    }
  
    emit('add-shop', newShop)
    
    // 重置表单
    alert(`店铺 "${newShop.name}" 发布成功！请切换到用户模式查看。`)
    shopForm.value = {
      name: '',
      tags: '',
      previewImage: null,
      menu: [{ name: '', price: null, description: '', icon: '🥘' }]
    }
  }
  </script>