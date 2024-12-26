<template>
    <div class="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        <div class="container mx-auto px-4 py-8 max-w-4xl">
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-pink-400 to-purple-500 p-6">
                    <h1 class="text-3xl md:text-4xl font-bold text-white text-center">
                        <a href="http://bhuacm.gczdy.cn" target="_blank" style="font-family: 'Arial', sans-serif;">BHU-ACM DduoChat</a>
                    </h1>
                </div>

                <!-- Chat Container -->
                <div ref="chatBox" class="h-[60vh] overflow-y-auto p-6 bg-gray-50">
                    <ChatMessage
                            v-for="(msg, index) in messages"
                            :key="index"
                            :message="msg"
                    />
                </div>

                <!-- Input Area -->
                <MessageInput
                        v-model="userMessage"
                        @send="sendMessage"
                />

                <!-- Footer -->
                <footer class="bg-gray-50 p-4 text-center text-gray-600 text-sm">
                    <p>
                        <a href="https://bailian.console.aliyun.com/?spm=5176.29619931.J__Z58Z6CX7MY__Ll8p1ZOR.1.74cd59fcm3m1wC#/home" target="_blank">Alibaba Cloud Tongyi Qianwen AI Model Support</a>
                    </p>
                    <p>
                        <a href="https://bzxx.miit.gov.cn/bzxx/" target="_blank">© 2024-2024 苏公网ICP备2024124094 by Dduo</a>
                    </p>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import ChatMessage from './ChatMessage.vue'
import MessageInput from './MessageInput.vue'

export default {
    name: 'ChatView',
    components: {
        ChatMessage,
        MessageInput
    },
    setup() {
        const chatBox = ref(null)
        const userMessage = ref('')
        const messages = ref([])

        onMounted(() => {
            messages.value.push({
                text: '你好,我是多多搭建的聊天机器人,我来自北华大学计算机科学技术学院ACM-ICPC程序设计工作室,你可以问我任何问题。喵~',
                sender: 'bot'
            })
        })

        const scrollToBottom = () => {
            if (chatBox.value) {
                chatBox.value.scrollTop = chatBox.value.scrollHeight
            }
        }

        const sendMessage = async () => {
            const message = userMessage.value.trim()
            if (!message) return

            messages.value.push({ text: message, sender: 'user' })
            userMessage.value = ''
            messages.value.push({ text: '我正在思考...', sender: 'bot' })
            scrollToBottom()

            try {
                const response = await fetch(
                    `http://gpt.gczdy.cn:8080/dduoai/chat?message=${encodeURIComponent(message)}`,
                    { method: 'GET' }
                )

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                const data = await response.text()

                messages.value = messages.value.filter(msg => msg.text !== '我正在思考...')
                messages.value.push({ text: data, sender: 'bot' })
            } catch (error) {
                messages.value = messages.value.filter(msg => msg.text !== '我正在思考...')
                messages.value.push({ text: '请求失败，请稍后再试', sender: 'bot' })
            }
            scrollToBottom()
        }

        return {
            chatBox,
            userMessage,
            messages,
            sendMessage
        }
    }
}
</script>
