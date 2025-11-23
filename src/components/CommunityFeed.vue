<template>
    <div class="space-y-8 pb-20">
      
      <div class="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
        <div class="flex gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold">
            我
          </div>
          <div class="flex-1 space-y-4">
            <textarea 
              v-model="newPostContent"
              placeholder="分享你的美食探店体验..." 
              class="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none text-lg h-24"
            ></textarea>
            
            <div v-if="previewImage" class="relative w-32 h-32 rounded-xl overflow-hidden group">
              <img :src="previewImage" class="w-full h-full object-cover" />
              <button @click="removeImage" class="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
  
            <div class="flex items-center justify-between border-t border-white/5 pt-4">
              <div class="flex gap-4">
                <label class="cursor-pointer flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
                  <input type="file" accept="image/*" class="hidden" @change="handleFileUpload">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span class="text-sm font-medium">添加图片</span>
                </label>
              </div>
              <button 
                @click="publishPost"
                :disabled="!newPostContent.trim() && !previewImage"
                class="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
                发布笔记
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <div 
          v-for="post in posts" 
          :key="post.id"
          @click="openPostDetail(post)"
          class="break-inside-avoid bg-gray-900 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition cursor-pointer group relative"
        >
          <div v-if="post.image" class="relative">
            <img :src="post.image" class="w-full object-cover max-h-[400px]" loading="lazy" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
          </div>
  
          <div class="p-4">
            <h3 class="font-bold text-gray-200 mb-2 line-clamp-2">{{ post.content }}</h3>
            
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-2">
                <img :src="post.avatar" class="w-6 h-6 rounded-full">
                <span class="text-xs text-gray-400">{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-1 text-gray-500 text-xs">
                <span :class="{'text-red-500': post.isLiked}">{{ post.isLiked ? '❤️' : '🤍' }}</span>
                <span>{{ post.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Transition name="modal">
        <div v-if="selectedPost" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closePostDetail"></div>
          
          <div class="bg-[#1A1F2E] w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden flex flex-col md:flex-row relative z-10 shadow-2xl border border-white/10">
            
            <button @click="closePostDetail" class="absolute top-4 right-4 md:hidden z-20 bg-black/50 text-white p-2 rounded-full">✕</button>
  
            <div class="w-full md:w-[60%] bg-black flex items-center justify-center bg-pattern">
               <img v-if="selectedPost.image" :src="selectedPost.image" class="max-w-full max-h-full object-contain" />
               <div v-else class="text-gray-600">纯文本内容</div>
            </div>
  
            <div class="w-full md:w-[40%] flex flex-col bg-[#1A1F2E]">
              <div class="p-4 border-b border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img :src="selectedPost.avatar" class="w-10 h-10 rounded-full border border-white/20">
                  <span class="font-bold text-white">{{ selectedPost.author }}</span>
                </div>
                <button class="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full hover:bg-blue-600/30">关注</button>
              </div>
  
              <div class="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                <div>
                  <p class="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">{{ selectedPost.content }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ selectedPost.date }}</p>
                </div>
  
                <div class="border-t border-white/5 my-4"></div>
  
                <div class="space-y-4">
                  <h4 class="text-sm font-bold text-gray-400">共 {{ selectedPost.comments.length }} 条评论</h4>
                  
                  <div v-for="comment in selectedPost.comments" :key="comment.id" class="flex gap-3">
                    <img :src="comment.avatar" class="w-8 h-8 rounded-full flex-shrink-0">
                    <div class="flex-1">
                      <div class="flex items-baseline justify-between">
                         <span class="text-sm font-bold text-gray-300">{{ comment.user }}</span>
                         <span class="text-xs text-gray-600">{{ comment.time }}</span>
                      </div>
                      <p class="text-sm text-gray-400 mt-1">{{ comment.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="p-4 border-t border-white/10 bg-[#1A1F2E]">
                <div class="flex items-center gap-6 mb-4 text-2xl">
                  <button @click="toggleLike(selectedPost)" class="transition hover:scale-110">
                    {{ selectedPost.isLiked ? '❤️' : '🤍' }}
                  </button>
                  <button class="hover:text-blue-400 transition">💬</button>
                  <button class="hover:text-green-400 transition">📤</button>
                </div>
                <p class="text-sm font-bold mb-3">{{ selectedPost.likes }} 次点赞</p>
                
                <div class="relative">
                  <input 
                    v-model="newCommentText"
                    @keyup.enter="addComment"
                    type="text" 
                    placeholder="说点好听的..." 
                    class="w-full bg-black/30 border border-white/10 rounded-full py-2 pl-4 pr-12 text-sm focus:border-blue-500 focus:outline-none text-white"
                  >
                  <button 
                    @click="addComment"
                    :disabled="!newCommentText.trim()"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-sm disabled:opacity-50 hover:text-blue-300">
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  // --- 状态管理 ---
  const newPostContent = ref('')
  const previewImage = ref(null)
  const selectedPost = ref(null) // 当前打开的帖子
  const newCommentText = ref('')
  
  // --- 模拟数据 ---
  const posts = reactive([
    {
      id: 1,
      author: '辣妹子',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      content: '这家火锅店的麻辣牛肉真的绝了！肉质超级嫩，而且分量很足。强烈推荐大家来试一试！🌶️🔥',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 124,
      isLiked: false,
      date: '2小时前',
      comments: [
        { id: 101, user: '吃货小王', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A', text: '看着就好吃！求地址！', time: '10分钟前' },
        { id: 102, user: '美食探员', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B', text: '这家我也去过，排队排了好久。', time: '1小时前' }
      ]
    },
    {
      id: 2,
      author: 'CoffeeLover',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
      content: '周五下午的快乐，是一杯手冲咖啡给的。☕️ 这家店环境很安静，适合办公。',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      likes: 89,
      isLiked: true,
      date: '5小时前',
      comments: []
    },
    {
      id: 3,
      author: '夜宵之神',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco',
      content: '深夜放毒！这家的烧烤简直是灵魂伴侣，特别是烤五花肉，滋滋冒油！',
      image: '', // 纯文字贴测试
      likes: 45,
      isLiked: false,
      date: '昨天',
      comments: [
        { id: 103, user: '减肥中', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D', text: '太罪恶了...但是我好想吃', time: '昨天' }
      ]
    }
  ])
  
  // --- 图片上传逻辑 (前端模拟) ---
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 创建本地预览链接
      previewImage.value = URL.createObjectURL(file)
    }
  }
  
  const removeImage = () => {
    previewImage.value = null
    // 注意：实际开发中需要清空 input[type=file] 的 value
  }
  
  // --- 发布帖子 ---
  const publishPost = () => {
    if (!newPostContent.value.trim() && !previewImage.value) return
  
    const newPost = {
      id: Date.now(),
      author: '我 (CyberGourmet)',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MyAvatar',
      content: newPostContent.value,
      image: previewImage.value, // 使用本地预览链接
      likes: 0,
      isLiked: false,
      date: '刚刚',
      comments: []
    }
  
    posts.unshift(newPost) // 添加到列表顶部
    
    // 重置表单
    newPostContent.value = ''
    previewImage.value = null
  }
  
  // --- 详情页交互逻辑 ---
  const openPostDetail = (post) => {
    selectedPost.value = post
    // 禁止背景滚动
    document.body.style.overflow = 'hidden'
  }
  
  const closePostDetail = () => {
    selectedPost.value = null
    // 恢复背景滚动
    document.body.style.overflow = 'auto'
  }
  
  const toggleLike = (post) => {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
  
  const addComment = () => {
    if (!newCommentText.value.trim() || !selectedPost.value) return
  
    selectedPost.value.comments.push({
      id: Date.now(),
      user: '我',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MyAvatar',
      text: newCommentText.value,
      time: '刚刚'
    })
  
    newCommentText.value = ''
  }
  </script>
  
  <style scoped>
  /* Modal 进入动画 */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  /* 隐藏滚动条但保持可滚动 */
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
  
  .bg-pattern {
    background-image: radial-gradient(#ffffff 1px, transparent 1px);
    background-size: 20px 20px;
    background-color: #000;
    opacity: 0.9;
  }
  </style>