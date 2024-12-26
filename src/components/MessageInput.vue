<template>
    <div class="p-4 bg-white border-t border-gray-200">
        <div class="flex gap-2">
            <input
                type="text"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup.enter="handleSend"
                placeholder="在这里输入对话..."
                class="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
                @click="handleSend"
                :disabled="isSending"
                :class="[
          'bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 w-12 h-12',
          'flex items-center justify-center transition-all duration-200',
          { 'scale-90 opacity-70': isSending }
        ]"
            >
                <SendIcon
                    size="20"
                    :class="[
            'transition-transform duration-200',
            { 'translate-x-1 translate-y-1': isSending }
          ]"
                />
            </button>
        </div>
    </div>
</template>

<script>
import { SendIcon } from 'lucide-vue-next'
import { ref } from 'vue'

export default {
    name: 'MessageInput',
    components: {
        SendIcon
    },
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue', 'send'],
    setup(props, { emit }) {
        const isSending = ref(false)

        const handleSend = () => {
            if (!props.modelValue.trim()) return

            isSending.value = true
            emit('send')

            // 模拟发送动画效果
            setTimeout(() => {
                isSending.value = false
            }, 1000)
        }

        return {
            isSending,
            handleSend
        }
    }
}
</script>

<style scoped>
.translate-x-1 {
    transform: translateX(0.25rem);
}

.translate-y-1 {
    transform: translateY(0.25rem);
}

.scale-90 {
    transform: scale(0.9);
}

.opacity-70 {
    opacity: 0.7;
}
</style>
