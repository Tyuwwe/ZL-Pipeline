import './assets/main.css'

import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import i18n from './locales'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
