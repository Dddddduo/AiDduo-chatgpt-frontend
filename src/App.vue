<template>
    <div id="app">
        <div class="container">
            <h3 align="center">欢迎使用BHU-ACM聊天机器人 </h3>

            <div class="chat-box" ref="chatBox">
                <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.sender">
                    <div v-if="msg.sender === 'bot'" class="avatar">
                        <img src="@/pic/头像.jpg" alt="机器人头像" />
                    </div>
                    <div class="text">
                        <div v-html="renderMarkdown(msg.text)"></div>
                    </div>
                </div>
            </div>

            <div class="input-container">
                <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="在这里输入对话" />
                <button @click="sendMessage">发送</button>
            </div>

            <!-- 添加备案信息 -->
            <footer class="footer">
                <p align="center">© 2024 DduoGPT聊天机器人 多多版权所有 | ICP备案号：苏公网ICP备2024124094</p>
            </footer>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';
export default {
    data() {
        return {
            userMessage: "", // 用户输入的消息
            messages: [],     // 聊天记录
        };
    },
    mounted() {
        this.messages.push({ text: '    你好,我是多多搭建的聊天机器人,我来自北华大学计算机科学技术学院 ACM-ICPC 程序设计实验室,你可以问我任何问题。喵~' ,sender: 'bot' });
    },
    methods: {
        renderMarkdown(text) {
            return marked(text);  // 使用 marked 库将 Markdown 转换为 HTML
        },
        // 发送消息
        async sendMessage() {

            const message = this.userMessage.trim();
            if (!message) return;

            // 添加用户消息到聊天记录
            this.messages.push({ text: message, sender: 'user' });
            this.userMessage = ''; // 清空输入框

            this.messages.push({ text: '我正在思考...' ,sender: 'bot' });

            // 滚动到聊天框底部
            this.$nextTick(() => {
                const chatBox = this.$refs.chatBox;
                chatBox.scrollTop = chatBox.scrollHeight;
            });

            try {
                const response = await fetch(`http://gpt.gczdy.cn:8080/dduoai/chat?message=${encodeURIComponent(message)}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.text(); // 假设响应是文本
                this.messages.push({ text: data, sender: 'bot' });
            } catch (error) {
                this.messages.push({ text: '请求失败，请稍后再试', sender: 'bot' });
            } finally {
                this.$nextTick(() => {
                    const chatBox = this.$refs.chatBox;
                    chatBox.scrollTop = chatBox.scrollHeight;
                });
            }
        }
    }
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #00ffd0;

}

.container {
    width: 1200px;
    height: 100vh;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.chat-box {
    max-height: 70vh;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #fafafa;
}

.input-container {
    width: 100%;
    background-color: white;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-container input {
    height: 50px;
    flex: 1;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.input-container button {
    height: 50px;
    padding: 5px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.input-container button:hover {
    background-color: #0056b3;
}

.message {
    /*display: flex;*/
    align-items: flex-start;
    margin-bottom: 10px;
}

.user {
    text-align: right;
    font-weight: bold;
    color: #c23eac;
}

.bot {
    text-align: left;
    font-weight: normal;
    color: #030303;
}

.bot .avatar {
    margin-right: 10px;
}

.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%; /* 这里使头像变圆 */
    object-fit: cover;
}

.text {
    max-width: 100%;
}

.footer {
    padding: 10px;
    background-color: #f1f1f1;
    color: #555;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    left: 1px;
    width: 100%;
    text-align: center;
}

h3 {
    font-size: 36px;
    color: #eaa9dc; /* 绿色 */
    /*background: linear-gradient(45deg, #ff6b6b, #f3a683); !* 渐变背景 *!*/
    /*background: linear-gradient(45deg, #ff6b6b, #f3a683); !* 渐变背景 *!*/
    padding: 15px 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    /*text-transform: uppercase;*/
    transition: transform 0.3s ease-in-out;
}

h3:hover {
    transform: scale(1.05); /* 鼠标悬停放大效果 */
}
</style>
