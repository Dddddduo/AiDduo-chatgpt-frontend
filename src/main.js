import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'  // 确保这行在正确位置

const app = createApp(App)
app.use(router)
app.mount('#app')
