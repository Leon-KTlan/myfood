<template>
    <div class="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      <nav class="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SmartCatering AI
          </div>
          <div class="hidden md:flex space-x-8 text-sm text-gray-300">
            <a href="#vision" class="hover:text-blue-400 transition">愿景</a>
            <a href="#painpoints" class="hover:text-blue-400 transition">痛点</a>
            <a href="#abcd" class="hover:text-blue-400 transition">ABCD模型</a>
            <a href="#value" class="hover:text-blue-400 transition">用户价值</a>
          </div>
          <button class="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-full transition shadow-lg shadow-blue-500/30">
            联系合作
          </button>
        </div>
      </nav>
  
    <header id="vision" class="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-6 overflow-hidden">
        
        <div class="bg-noise"></div>

        <div class="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>

        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div class="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/40 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob"></div>
            <div class="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-purple-500/40 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
            <div class="absolute bottom-1/4 left-1/3 w-[580px] h-[580px] bg-pink-500/35 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        <div class="max-w-7xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md text-blue-300 text-xs font-medium mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span class="relative flex h-2 w-2 mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            新一代智慧餐饮生态平台 v2.0
            </div>
            
            <h1 class="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            AI Defines Catering <br />
            <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
                数据重塑味蕾
            </span>
            </h1>
            
            <p class="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            不仅仅是系统，而是您的 <span class="text-white font-semibold">数字经营大脑</span>。<br class="hidden md:block" />
            利用生成式 AI 与实时大数据，打通消费者、餐厅与供应链的每一条神经。
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
            <router-link to="/explore" class="group relative w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 inline-block text-center">
                <span class="relative z-10">探索平台生态</span>
                <div class="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-50"></div>
            </router-link>
            
            <button class="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 hover:border-white/30 transition text-white font-medium flex items-center gap-2 group">
                <span>联系合作</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            </div>
        </div>
    </header>
    
      <section id="painpoints" class="py-20 bg-[#0B0F19]">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            行业痛点 <span class="text-gray-500">vs</span> 智能重构
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(item, index) in painPoints" :key="index" 
                 class="group p-8 rounded-2xl bg-gray-900 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/20 to-transparent rounded-bl-full -mr-4 -mt-4 transition-opacity opacity-50 group-hover:opacity-100"></div>
              
              <component :is="item.icon" class="w-10 h-10 text-blue-400 mb-4" />
              <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <section id="abcd" class="py-24 relative border-y border-white/5 bg-[#0D121F] overflow-hidden">
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="mb-16 text-center">
          <h2 class="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            ABCD 全链路生态
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-lg">
            不仅仅是功能模块，而是驱动餐饮进化的<span class="text-blue-400 font-semibold">四大核心引擎</span>。
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[500px]">
          
          <div class="flex flex-col gap-3 w-full lg:w-1/3">
            <button v-for="(model, key) in abcdData" :key="key"
                    @click="activeModel = key"
                    class="group relative overflow-hidden p-6 rounded-xl border text-left transition-all duration-500 ease-out"
                    :class="activeModel === key 
                      ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'">
              
              <div v-if="activeModel === key" class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

              <div class="relative z-10 flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-3xl font-black mr-4 italic tracking-wider transition-colors duration-300" 
                        :class="activeModel === key ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'text-gray-700'">
                    {{ key }}
                  </span>
                  <div>
                    <span class="block font-bold text-lg text-gray-100">{{ model.name }}</span>
                    <span class="text-xs text-gray-500 font-mono tracking-wider uppercase">System Online</span>
                  </div>
                </div>
                
                <div class="w-2 h-2 rounded-full transition-colors duration-300 shadow-lg"
                     :class="activeModel === key ? 'bg-blue-400 shadow-[0_0_10px_#60A5FA]' : 'bg-gray-800'"></div>
              </div>
            </button>
          </div>

          <div class="w-full lg:w-2/3 relative group">
            <div class="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"></div>
            <div class="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg"></div>

            <div class="h-full bg-[#0B0F19]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              
              <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              <transition name="fade" mode="out-in">
                <div :key="activeModel" class="relative z-10">
                  <div class="flex items-end gap-4 mb-2">
                    <h3 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
                       {{ abcdData[activeModel].title }}
                    </h3>
                    <span class="text-blue-500 font-mono text-sm mb-2 opacity-80">/// MODEL_{{ activeModel }}_V4.0</span>
                  </div>
                  
                  <p class="text-xl text-gray-400 mb-10 border-l-4 border-blue-500/50 pl-4">
                    {{ abcdData[activeModel].subtitle }}
                  </p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div v-for="(feature, idx) in abcdData[activeModel].features" :key="idx" 
                         class="group/item">
                      <div class="flex justify-between text-sm mb-1 text-gray-300 font-medium">
                        <span>{{ feature }}</span>
                        <span class="text-blue-500/50 text-xs font-mono group-hover/item:text-blue-400 transition-colors">
                          {{ 85 + idx * 3 }}%
                        </span>
                      </div>
                      <div class="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform origin-left scale-x-0 animate-[loadBar_1s_ease-out_forwards]" 
                             :style="{ animationDelay: `${idx * 100}ms` }"></div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-600 font-mono">
                    <div class="flex gap-4">
                      <span>LATENCY: 12ms</span>
                      <span>NODES: ACTIVE</span>
                    </div>
                    <div class="flex gap-1">
                      <span class="w-1 h-4 bg-blue-500/20"></span>
                      <span class="w-1 h-4 bg-blue-500/40"></span>
                      <span class="w-1 h-4 bg-blue-500/60"></span>
                      <span class="w-1 h-4 bg-blue-500 animate-pulse"></span>
                    </div>
                  </div>

                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      </section>
  
      <section id="value" class="py-24">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-10">双端价值引擎</h2>
  
          <div class="inline-flex bg-gray-800 p-1 rounded-full mb-16 border border-white/10 relative">
            <div class="absolute top-1 bottom-1 w-[140px] bg-blue-600 rounded-full transition-all duration-300 ease-out shadow-lg"
                 :class="userType === 'consumer' ? 'left-1' : 'left-[148px]'"></div>
            
            <button @click="userType = 'consumer'" 
                    class="relative z-10 w-[140px] py-3 text-sm font-bold rounded-full transition-colors duration-300"
                    :class="userType === 'consumer' ? 'text-white' : 'text-gray-400'">
              C端 · 消费者
            </button>
            <button @click="userType = 'merchant'" 
                    class="relative z-10 w-[140px] py-3 text-sm font-bold rounded-full transition-colors duration-300"
                    :class="userType === 'merchant' ? 'text-white' : 'text-gray-400'">
              B端 · 商家
            </button>
          </div>
  
          <transition name="slide-up" mode="out-in">
            <div :key="userType" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left max-w-5xl mx-auto">
              <div>
                <h3 class="text-4xl font-bold mb-4">
                  {{ userType === 'consumer' ? '专属私人美食顾问' : '科学化增长运营引擎' }}
                </h3>
                <p class="text-xl text-gray-400 mb-8">
                  {{ userType === 'consumer' 
                    ? '不再面对冷冰冰的菜单，享受 AI 带来的超预期用餐体验。' 
                    : '告别拍脑袋决策，用数据驱动每一道菜品、每一次营销。' }}
                </p>
                
                <div class="space-y-6">
                  <div v-for="(feat, idx) in currentUserFeatures" :key="idx" class="flex items-center">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 text-purple-400 mr-4">
                      <component :is="feat.icon" class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg">{{ feat.title }}</h4>
                      <p class="text-sm text-gray-500">{{ feat.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="h-[400px] bg-gradient-to-br rounded-3xl relative overflow-hidden flex items-center justify-center border border-white/5"
                   :class="userType === 'consumer' ? 'from-pink-500/20 to-purple-900/40' : 'from-blue-500/20 to-cyan-900/40'">
                
                <div v-if="userType === 'consumer'" class="text-center">
                  <div class="w-64 bg-gray-900/80 backdrop-blur p-4 rounded-2xl mx-auto mb-4 border border-white/10 shadow-2xl">
                    <div class="h-32 bg-gray-800 rounded-lg mb-3 animate-pulse"></div>
                    <div class="h-4 w-2/3 bg-gray-700 rounded mb-2"></div>
                    <div class="h-3 w-1/2 bg-gray-700 rounded"></div>
                  </div>
                  <p class="text-sm font-mono text-purple-300">Processing AR Preview...</p>
                </div>
  
                <div v-else class="text-center w-full px-8">
                   <div class="space-y-3">
                     <div class="flex justify-between items-end h-32 px-4 pb-0 border-b border-white/10">
                       <div class="w-8 bg-blue-500/50 rounded-t h-[40%]"></div>
                       <div class="w-8 bg-blue-500/70 rounded-t h-[70%]"></div>
                       <div class="w-8 bg-blue-400 rounded-t h-[50%]"></div>
                       <div class="w-8 bg-cyan-400 rounded-t h-[90%] relative">
                          <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded font-bold">+24%</div>
                       </div>
                     </div>
                     <p class="text-sm font-mono text-blue-300">Revenue Analytics AI</p>
                   </div>
                </div>
  
              </div>
            </div>
          </transition>
        </div>
      </section>
  
      <section class="py-20 border-t border-white/5 bg-[#0B0F19]">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-3xl font-bold text-center mb-16">战略路线图</h2>
          
          <div class="relative">
            <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 hidden lg:block"></div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div v-for="(phase, index) in roadmap" :key="index" class="relative z-10 group">
                <div class="w-6 h-6 mx-auto bg-[#0B0F19] border-4 border-gray-700 rounded-full mb-6 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 hidden lg:block"></div>
                
                <div class="bg-gray-900 border border-white/5 p-8 rounded-xl hover:border-blue-500/30 transition text-center lg:text-left">
                  <span class="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded mb-3">
                    Phase 0{{ index + 1 }}
                  </span>
                  <h3 class="text-xl font-bold mb-2">{{ phase.title }}</h3>
                  <p class="text-gray-400 text-sm">{{ phase.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <footer class="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2025 Smart Catering Ecosystem. All rights reserved.</p>
        <p class="mt-2">AI Defines Catering.</p>
      </footer>
  
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Icons (Simulated components for simplicity in this demo)
  // In a real project, import these from 'lucide-vue-next'
  const IconClock = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' };
  const IconDatabase = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' };
  const IconUsers = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' };
  const IconChart = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' };
  const IconCamera = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' };
  const IconGift = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>' };
  const IconCpu = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>' };
  const IconLayers = { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' };
  
  // Data
  const painPoints = [
    { icon: IconClock, title: "体验割裂", desc: "线上点单，线下干等。服务流程中存在大量断点，导致顾客满意度流失。" },
    { icon: IconDatabase, title: "数据孤岛", desc: "各门店、各平台数据不互通，无法形成完整的用户画像，营销无的放矢。" },
    { icon: IconUsers, title: "服务同质化", desc: "老客新客一个样。缺乏个性化关怀，难以建立品牌忠诚度和私域壁垒。" },
    { icon: IconChart, title: "粗放管理", desc: "备货靠经验，定价靠直觉。缺乏数据支撑的精细化运营导致成本高企。" },
  ];
  
  const activeModel = ref('A');
  const abcdData = {
    'A': { 
      name: 'AI Driven', 
      title: 'AI 驱动', 
      subtitle: '超个性化推荐引擎 & AIGC 内容生成',
      features: ['千人千面智能菜单排序', '营销文案/海报自动生成', '智能语音助手接单', '情绪识别服务建议'] 
    },
    'B': { 
      name: 'Big Data', 
      title: '大数据资产', 
      subtitle: '全域数据沉淀与预测分析引擎',
      features: ['智能库存预测与自动补货', '基于天气/节日的动态定价', '供应链溯源区块链', '全渠道用户画像构建'] 
    },
    'C': { 
      name: 'Community', 
      title: '社群与文化', 
      subtitle: 'Web3 时代的品牌共创与忠诚度体系',
      features: ['KOC 孵化与分销系统', 'NFT 权益会员卡', '品牌 DAO 治理投票', 'Gamification 积分玩法'] 
    },
    'D': { 
      name: 'Digital Twin', 
      title: '数字孪生 & IoT', 
      subtitle: '虚拟与现实的完美映射',
      features: ['1:1 虚拟餐厅仿真', 'AR 探店与菜品预览', '后厨 IoT 实时监控', '元宇宙分店体验'] 
    }
  };
  
  const userType = ref('consumer');
  const currentUserFeatures = computed(() => {
    return userType.value === 'consumer' 
      ? [
        { icon: IconCamera, title: 'AR 探店预览', desc: '点餐前 360° 预览真实菜品与份量' },
        { icon: IconGift, title: 'VIP 隐藏菜单', desc: '根据你的口味偏好解锁的专属菜肴' },
        { icon: IconUsers, title: '一键生成 Vlog', desc: '自动抓取用餐高光时刻生成社交素材' }
      ]
      : [
        { icon: IconCpu, title: '营销 CRM 自动化', desc: '自动唤醒沉睡用户，精准推送优惠券' },
        { icon: IconChart, title: '驾驶舱数据看板', desc: '实时掌握营收、翻台率与异常预警' },
        { icon: IconLayers, title: '智能库存管理', desc: '降低损耗，提升后厨备货效率' }
      ];
  });
  
  const roadmap = [
    { title: 'MVP & 种子轮', desc: '完成 50 家标杆餐厅入驻，跑通 AI 推荐模型。' },
    { title: '开放平台 & API', desc: '接入 100+ 开发者与第三方服务，构建应用市场。' },
    { title: '全球化 & 行业标准', desc: '建立智慧餐饮数据标准，拓展海外市场。' },
  ];
  </script>


