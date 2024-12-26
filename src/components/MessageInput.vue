<template>
    <div class="message-input-container">
        <div class="input-wrapper" :class="{ 'is-sending': isSending, 'has-content': modelValue.length > 0 }">
            <!-- 输入框装饰背景 -->
            <div class="input-background">
                <div class="bg-glow"></div>
                <div class="bg-lines"></div>
            </div>

            <!-- 输入框 -->
            <div class="input-content">
                <input
                    type="text"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    @keyup.enter="handleSend"
                    placeholder="输入消息..."
                    :disabled="isSending"
                />

                <!-- 输入提示 -->
                <div class="input-hint" :class="{ 'is-visible': modelValue.length > 0 }">
                    <span class="hint-text">按Enter发送</span>
                </div>
            </div>

            <!-- 发送按钮 -->
            <button
                @click="handleSend"
                :disabled="isSending || !modelValue.trim()"
                class="send-button"
                :class="{ 'is-ready': modelValue.trim().length > 0 }"
            >
                <div class="button-background">
                    <div class="button-glow"></div>
                    <div class="button-shine"></div>
                </div>

                <!-- 发送图标容器 -->
                <div class="icon-container">
                    <div class="icon-wrapper">
                        <SendIcon size="18" class="send-icon" />
                    </div>
                    <div class="send-particles">
                        <span v-for="n in 6" :key="n" class="particle"></span>
                    </div>
                </div>

                <!-- 发送成功动画 -->
                <div class="success-ring">
                    <svg viewBox="0 0 50 50" class="ring-svg">
                        <circle cx="25" cy="25" r="20" class="ring-circle" />
                    </svg>
                </div>
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
            if (!props.modelValue.trim() || isSending.value) return

            isSending.value = true
            emit('send')

            setTimeout(() => {
                isSending.value = false
            }, 1500)
        }

        return {
            isSending,
            handleSend
        }
    }
}
</script>

<style scoped>
.message-input-container {
    padding: 1.5rem;
    background: linear-gradient(to bottom,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.03)
    );
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: rgb(138, 71, 123);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 输入框背景效果 */
.input-background {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    overflow: hidden;
}

.bg-glow {
    position: absolute;
    inset: -20%;
    background: radial-gradient(
        circle at 50% 50%,
        rgba(139, 92, 246, 0.1),
        transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
}

.input-wrapper:focus-within .bg-glow {
    opacity: 1;
    animation: pulse 4s infinite;
}

.bg-lines {
    position: absolute;
    inset: 0;
    overflow: hidden;
    opacity: 0.1;
    mask-image: linear-gradient(to bottom, transparent, #00ffd0 30%);
}

.bg-lines::before {
    content: '';
    position: absolute;
    inset: -100%;
    background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.1) 10px,
        rgba(255, 255, 255, 0.1) 20px
    );
    animation: moveLines 20s linear infinite;
}

/* 输入框样式 */
.input-content {
    position: relative;
    flex: 1;
}

input {
    width: 100%;
    padding: 0.875rem 1.25rem;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 0.9375rem;
    line-height: 1.5;
    outline: none;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
}

.input-wrapper:focus-within input::placeholder {
    opacity: 0.7;
    transform: translateX(5px);
}

/* 输入提示 */
.input-hint {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
}

.input-hint.is-visible {
    opacity: 0.5;
}

.hint-text {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.6);
}

/* 发送按钮样式 */
.send-button {
    position: relative;
    width: 45px;
    height: 45px;
    padding: 0;
    border: none;
    border-radius: 14px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.button-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #ae99e7, #00ffd0);
    opacity: 0.8;
    transition: all 0.3s ease;
}

.button-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at var(--x, 50%) var(--y, 50%),
        rgba(255, 255, 255, 0.2),
        transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
}

.send-button:hover .button-glow {
    opacity: 1;
}

.button-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.1) 30%,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1) 70%,
        transparent
    );
    transform: rotate(45deg) translateY(-100%);
    transition: all 0.5s ease;
}

.send-button:hover .button-shine {
    transform: rotate(45deg) translateY(100%);
}

/* 图标容器 */
.icon-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-wrapper {
    position: relative;
    z-index: 1;
    color: white;
    transition: all 0.3s ease;
}

/* 发送状态动画 */
.is-sending .icon-wrapper {
    transform: translate(50px, -50px) scale(0.5);
    opacity: 0;
}

/* 粒子动画 */
.send-particles {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-sending .particle {
    animation: particleExplode 0.8s ease-out forwards;
}

/* 成功动画 */
.success-ring {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s ease;
}

.is-sending .success-ring {
    opacity: 1;
    transform: scale(1);
}

.ring-circle {
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 125;
    stroke-dashoffset: 125;
    transform-origin: center;
}

.is-sending .ring-circle {
    animation: drawCircle 1s ease-out forwards;
}

/* 动画关键帧 */
@keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
}

@keyframes moveLines {
    0% { transform: translateX(0); }
    100% { transform: translateX(100px); }
}

@keyframes particleExplode {
    0% {
        opacity: 1;
        transform: translate(0, 0);
    }
    100% {
        opacity: 0;
        transform: translate(
            calc(cos(var(--angle)) * 50px),
            calc(sin(var(--angle)) * 50px)
        );
    }
}

@keyframes drawCircle {
    0% { stroke-dashoffset: 125; }
    100% { stroke-dashoffset: 0; }
}

/* 响应式状态 */
.input-wrapper:focus-within {
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
}

.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.send-button.is-ready:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
}

.is-sending {
    transform: scale(0.98);
}
</style>
