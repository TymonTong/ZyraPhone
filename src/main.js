import { createApp } from 'vue'
import { assetUrl } from './utils/assetUrl.js'

const rootEl = document.documentElement
rootEl.style.setProperty('--asset-login-bg', `url("${assetUrl('/img/login/bg.png')}")`)
rootEl.style.setProperty('--asset-login-middle', `url("${assetUrl('/img/login/middle.png')}")`)
rootEl.style.setProperty('--asset-login-overlay', `url("${assetUrl('/img/login/overlay.png')}")`)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/ot-theme.css'
import './styles/ot-primary.css'
import './styles/landing.css'
import './styles/login.css'
import './styles/responsive.css'
import './styles/scroll-reveal.css'
import './styles/global.css'
import App from './App.vue'
import router from './router'

createApp(App).use(ElementPlus).use(router).mount('#app')
