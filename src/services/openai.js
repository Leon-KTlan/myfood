// 通义千问 API 服务
// 注意：请在本地 .env.local 中配置 VUE_APP_QWEN_API_KEY，不要把密钥写在前端代码里
const API_KEY = process.env.VUE_APP_QWEN_API_KEY
// 通义千问兼容 OpenAI 格式的 API 端点
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

/**
 * 调用通义千问 API 进行对话
 * @param {string} message - 用户消息
 * @param {Array} conversationHistory - 对话历史记录
 * @returns {Promise<string>} AI 回复
 */
export async function chatWithAI(message, conversationHistory = []) {
  try {
    if (!API_KEY) {
      throw new Error('未检测到通义千问密钥，请在 .env.local 中配置 VUE_APP_QWEN_API_KEY')
    }

    // 构建消息历史，包含系统提示和对话历史
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的美食助手，擅长推荐餐厅、菜品，回答美食相关问题。你的回答要友好、专业，并且要像真人一样自然交流，不要像机器人。你可以根据用户的喜好和需求，给出个性化的建议。'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo', // 通义千问模型
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error?.message || errorData.message || `API 错误: ${response.status} ${response.statusText}`
      console.error('API 错误详情:', errorData)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // 通义千问的响应格式与 OpenAI 兼容
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim()
    } else if (data.output && data.output.text) {
      // 备用格式
      return data.output.text.trim()
    } else {
      console.error('意外的响应格式:', data)
      throw new Error('API 返回了意外的数据格式')
    }
  } catch (error) {
    console.error('通义千问 API 错误:', error)
    // 提供更友好的错误信息
    if (error.message.includes('Load failed') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('网络连接失败，请检查网络连接或稍后重试。如果问题持续，可能是 CORS 限制，建议使用后端代理。')
    }
    throw error
  }
}

