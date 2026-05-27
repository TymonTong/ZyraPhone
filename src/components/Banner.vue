<template>
  <section id="home" class="banner" :class="{ 'banner--enter': true, 'banner--ready': enterReady }">
    <div class="banner-bg" aria-hidden="true">
      <img
        class="banner-bg-poster"
        :class="{ 'is-hidden': videoReady }"
        src="/img/banner/banner bg.png"
        alt=""
      />
      <video
        ref="videoRef"
        class="banner-bg-video"
        :class="{ 'is-visible': videoReady }"
        src="/img/banner/banner bg.mp4"
        muted
        loop
        playsinline
        preload="auto"
        @canplaythrough="onVideoCanPlayThrough"
        @error="onVideoError"
      />
    </div>
    <div class="banner-content">
      <div class="hero-copy">
        <div class="hero-text">
          <h1 class="hero-title">
            <span>驱动全域增长，</span><span>赋能</span><span class="hero-highlight">全球社媒变现</span>
          </h1>
          <p class="hero-sub">
            自研云手机真机隔离技术 + TikTok官方API双底层，一站式解决跨境社媒运营全痛点，助力企业迅速实现海外市场增长
          </p>
          <el-button class="ot-btn--black btn-cta-black" size="large" @click="goLogin">
            免费开始全球社媒增长
          </el-button>
        </div>
      </div>
      <div class="hero-shot">
        <div class="hero-shot-frame">
          <img src="/img/banner/banner.png" alt="ZyraPhone 系统界面" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useGoLogin } from '../composables/useGoLogin'

const { goLogin } = useGoLogin()

const videoRef = ref(null)
const videoReady = ref(false)
const enterReady = ref(false)

function onVideoCanPlayThrough() {
  const video = videoRef.value
  if (!video || videoReady.value) return
  videoReady.value = true
  video.play().catch(() => {
    /* 自动播放被拦截时仍显示视频首帧 */
  })
}

function onVideoError() {
  videoReady.value = false
}

onMounted(async () => {
  const video = videoRef.value
  if (video?.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    onVideoCanPlayThrough()
  }
  await nextTick()
  requestAnimationFrame(() => {
    enterReady.value = true
  })
})
</script>

<style scoped>
/* 对齐 Figma 12371:23125 */
.banner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 0;
  box-sizing: border-box;
  /* 总高 = 顶部间距 + banner-content 自然高度；<768 时由 responsive 改为 112 */
  padding: var(--banner-top-spacing, 144px) 20px 0;
  overflow: hidden;
}

.banner-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.banner-bg-poster,
.banner-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  pointer-events: none;
}

.banner-bg-poster {
  z-index: 0;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.banner-bg-poster.is-hidden {
  opacity: 0;
}

.banner-bg-video {
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.banner-bg-video.is-visible {
  opacity: 1;
}

.banner-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  flex-shrink: 0;
}

.hero-copy {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.hero-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.hero-title {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: var(--el-text-color-primary);
}

.hero-title span {
  display: inline;
}

.hero-highlight {
  color: var(--el-color-primary);
}

.hero-sub {
  margin: 0;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: var(--el-text-color-regular);
}

.hero-shot {
  width: 100%;
  max-height: 360px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.hero-shot-frame {
  position: relative;
  width: 100%;
  height: 360px;
  max-height: 360px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-shot-frame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  pointer-events: none;
  display: block;
}
</style>
