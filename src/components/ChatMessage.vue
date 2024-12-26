<template>
    <div
        :class="[
      'flex mb-4',
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    ]"
    >
        <template v-if="message.sender === 'bot'">
            <a :href="redirectUrl" target="_blank">
                <div class="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 mr-3">
                    <img
                        :src="botAvatar"
                        alt="Bot Avatar"
                        class="w-full h-full rounded-full object-cover"
                    />
                </div>
            </a>
        </template>
        <div
            class="max-w-[70%] rounded-2xl px-4 py-2 message-bubble"
            :class="[
        message.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-white shadow-md'
      ]"
        >
            <div v-html="renderedMessage" class="prose prose-sm"></div>
            <div v-if="message.text === '我正在思考...'" class="flex gap-1 mt-1">
                <div
                    v-for="i in 3"
                    :key="i"
                    class="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    :style="{
            animation: 'bounce 1s infinite',
            animationDelay: `${i * 0.2}s`
          }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { marked } from 'marked'

export default {
    name: 'ChatMessage',
    props: {
        message: {
            type: Object,
            required: true,
            default: () => ({
                sender: '',
                text: ''
            })
        }
    },
    setup(props) {
        const renderedMessage = computed(() => {
            return marked(props.message.text || '')
        })

        return {
            renderedMessage,
            botAvatar: 'https://ooo.0x0.ooo/2024/12/26/OEh8Cq.jpg',
            redirectUrl: 'https://gczdy.cn',
        }
    }
}
</script>

<style>
.message-bubble {
    opacity: 1;  /* Changed from 0 to 1 */
    animation: fadeIn 0.3s ease-out;
    transform: translateY(0);  /* Ensure it stays visible */
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}
</style>
