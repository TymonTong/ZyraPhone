<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a href="#home" class="logo-link" @click="scrollTo('#home', $event)">
          <img :src="assetUrl('/img/logo.png')" alt="ZyraPhone" class="logo-img" width="160" height="40" />
        </a>
        <nav class="nav-menu">
          <el-link
            v-for="item in navItems"
            :key="item.hash"
            :href="item.hash"
            :underline="false"
            class="nav-link nav-link--menu"
            @click="scrollTo(item.hash, $event)"
          >
            {{ item.label }}
          </el-link>
        </nav>
      </div>
      <div class="navbar-right">
        <el-link :underline="false" href="#" class="nav-link nav-link--sub">注册</el-link>
        <el-button type="primary" size="large" class="btn-login" @click="goLogin">登录</el-button>
        <el-button
          class="navbar-menu-btn"
          aria-label="打开导航菜单"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <svg class="navbar-menu-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M1.79 3.15c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73h10.42c.4 0 .73.33.73.73 0 .4-.33.73-.73.73H1.79Zm0 4.44c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73h10.42c.4 0 .73.33.73.73 0 .4-.33.73-.73.73H1.79Zm0 4.44c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73h10.42c.4 0 .73.33.73.73 0 .4-.33.73-.73.73H1.79Z"
            />
          </svg>
        </el-button>
      </div>
    </div>
    <div class="navbar-mobile-panel" :class="{ 'is-open': menuOpen }">
      <nav class="navbar-mobile-nav">
        <el-link
          v-for="item in navItems"
          :key="item.hash"
          :href="item.hash"
          :underline="false"
          class="nav-link nav-link--menu navbar-mobile-link"
          @click="scrollTo(item.hash, $event, true)"
        >
          {{ item.label }}
        </el-link>
      </nav>
      <el-button
        type="primary"
        size="large"
        class="btn-login navbar-mobile-login"
        @click="onMobileLogin"
      >
        登录
      </el-button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useGoLogin } from '../composables/useGoLogin'
import { assetUrl } from '../utils/assetUrl.js'

const menuOpen = ref(false)
const { goLogin } = useGoLogin()

function onMobileLogin() {
  menuOpen.value = false
  goLogin()
}

function getNavbarHeight() {
  const page = document.querySelector('.landing-page')
  if (!page) return 72
  const raw = getComputedStyle(page).getPropertyValue('--navbar-height').trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 72
}

/** 顺序：核心优势 在 核心系统 之前（与产品约定一致） */
const navItems = [
  { label: '首页', hash: '#home' },
  { label: '增长数据', hash: '#data' },
  { label: '核心优势', hash: '#advantages' },
  { label: '核心系统', hash: '#systems' },
  { label: '成功案例', hash: '#cases' },
  { label: '内容培训', hash: '#training' },
]

function scrollTo(hash, event, closeMenu = false) {
  event.preventDefault()
  if (closeMenu) menuOpen.value = false
  const target = document.querySelector(hash)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - getNavbarHeight()
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<style scoped>
/* Figma 12371:23580 官网导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  max-width: 1920px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid var(--el-border-color-light);
  backdrop-filter: blur(8px);
}

.navbar-inner {
  position: relative;
  z-index: 1;
  flex: 0 0 72px;
  width: 100%;
  max-width: 1760px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo-link {
  display: block;
  flex-shrink: 0;
  line-height: 0;
}

.logo-img {
  display: block;
  width: 160px;
  height: 40px;
  object-fit: contain;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 40px;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 链接触发 OT Link 变量：导航 16px regular；右侧 14px regular */
.nav-link--menu {
  --el-link-text-color: var(--el-text-color-regular);
  --el-link-hover-color: var(--el-text-color-primary);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.nav-link--sub {
  --el-link-text-color: var(--el-text-color-regular);
  --el-link-hover-color: var(--el-text-color-primary);
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
}

.nav-link :deep(.el-link__inner) {
  gap: 6px;
}

.nav-link--sub :deep(.otymon-iconfont-svg) {
  width: 14px;
  height: 14px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.nav-link--sub:hover :deep(.otymon-iconfont-svg) {
  color: var(--el-text-color-primary);
}

/* Figma Components/Button：80×40，圆角 8，14px Medium */
.btn-login {
  width: 80px;
  min-width: 80px;
  height: 40px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}

.navbar-menu-btn.el-button {
  display: none;
  flex-shrink: 0;
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 6px;
}

.navbar-menu-icon {
  width: 14px;
  height: 14px;
  display: block;
}

.navbar-mobile-panel {
  display: none;
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 1001;
  padding: 16px 20px 20px;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid var(--el-border-color-light);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.navbar-mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.navbar-mobile-link {
  justify-content: flex-start;
  padding: 8px 0;
}

.navbar-mobile-login {
  width: 100%;
  min-width: 0;
}
</style>
