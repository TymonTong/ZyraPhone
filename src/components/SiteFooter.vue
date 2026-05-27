<template>
  <footer class="footer landing-section">
    <div class="footer-inner landing-container">
      <div class="footer-cta">
        <div class="cta-copy">
          <p class="cta-line-muted">立即免费开始</p>
          <p class="cta-line-main">驱动全球社媒营收增长</p>
        </div>
        <el-button class="ot-btn--black btn-login-footer" size="large" @click="goLogin">
          <span>立即登录</span>
          <!-- OT 图标库「箭头」\e878 / icon-jiantou；雪碧图 path 写死 #59596E，此处内联 path 以 currentColor 跟随 Icon/Write -->
          <svg
            class="btn-login-footer__icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M612.864 228.864a38.336 38.336 0 0 1 54.272 0l256 256a38.144 38.144 0 0 1 6.528 9.152A38.016 38.016 0 0 1 934.4 512a37.952 37.952 0 0 1-4.736 17.92 38.208 38.208 0 0 1-6.528 9.216l-256 256a38.336 38.336 0 1 1-54.272-54.272L803.392 550.4H128a38.4 38.4 0 1 1 0-76.8h675.392L612.864 283.136a38.336 38.336 0 0 1 0-54.272z"
            />
          </svg>
        </el-button>
      </div>

      <!-- Figma 12507:15963：上 logo，下三列链接 -->
      <div class="footer-main">
        <img src="/img/logo.png" alt="ZyraPhone" class="footer-logo" width="128" height="32" />
        <div class="footer-nav">
          <div v-for="col in navCols" :key="col.title" class="footer-col">
            <h4 class="col-title">{{ col.title }}</h4>
            <el-link
              v-for="link in col.links"
              :key="link"
              href="#"
              :underline="false"
              class="col-link"
            >
              {{ link }}
            </el-link>
          </div>
        </div>
      </div>

      <!-- Figma 12507:16001：备案 + 社交图标 -->
      <div class="footer-bottom">
        <div class="footer-legal">
          <img src="/img/footer/beian.png" alt="" class="footer-beian" width="20" height="20" />
          <span>苏ICP备2024118083号</span>
          <span>©2023-2025 goproxy.com. All Rights Reserved</span>
        </div>
        <div class="footer-social">
          <el-button
            v-for="item in socialLinks"
            :key="item.id"
            tag="a"
            :href="item.href"
            rel="noopener noreferrer"
            target="_blank"
            class="footer-social-btn"
            :aria-label="item.label"
          >
            <FooterSocialIcon :name="item.icon" />
          </el-button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import FooterSocialIcon from './FooterSocialIcon.vue'
import { useGoLogin } from '../composables/useGoLogin'

const { goLogin } = useGoLogin()

const socialLinks = [
  { id: 'qq', icon: 'qq', label: 'QQ', href: '#' },
  { id: 'wechat', icon: 'wechat', label: '微信', href: '#' },
  { id: 'telegram', icon: 'telegram', label: 'Telegram', href: '#' },
]

const navCols = [
  {
    title: 'TikTok Shop',
    links: ['品牌出海', '企业出海', 'IP孵化', '培训赋能'],
  },
  { title: '平台资源', links: ['平台资源'] },
  { title: '平台协议', links: ['用户协议', '隐私协议', '购买协议'] },
]
</script>

<style scoped>
.footer {
  padding-left: 60px;
  padding-right: 60px;
  background: var(--el-fill-color-light, #f5f7fa);
}

.footer-inner {
  display: flex;
  flex-direction: column;
}

.footer-cta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 72px;
  padding-bottom: 80px;
}

.cta-copy {
  display: flex;
  flex-direction: column;
}

.cta-line-muted {
  margin: 0;
  font-size: var(--landing-title-font-size, 40px);
  font-weight: 700;
  line-height: var(--landing-title-line-height, 48px);
  color: #8e8ea3;
}

.cta-line-main {
  margin: 0;
  font-size: var(--landing-title-font-size, 40px);
  font-weight: 700;
  line-height: var(--landing-title-line-height, 48px);
  color: var(--el-text-color-primary);
}

.footer-cta :deep(.btn-login-footer) {
  flex-shrink: 0;
}

/* 默认宽屏：logo 与导航分列左右（>1200） */
.footer-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 128px;
  border-top: 1px solid var(--el-border-color);
}

.footer-logo {
  display: block;
  height: 56px;
  width: auto;
  flex-shrink: 0;
}

.footer-nav {
  display: flex;
  gap: 0;
}

.footer-col {
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #b7b7c7;
}

.col-link {
  justify-content: flex-start;
  font-size: 14px;
  line-height: 22px;
  --el-link-text-color: var(--el-text-color-regular);
  --el-link-hover-color: var(--el-color-primary);
}

.footer-bottom {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  line-height: 20px;
  color: var(--el-text-color-secondary);
}

.footer-beian {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: cover;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
</style>
