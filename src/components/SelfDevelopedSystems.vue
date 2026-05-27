<template>
  <section
    id="systems"
    ref="sectionRef"
    class="systems landing-section"
    :class="{ 'systems--reveal': true, 'systems--reveal-visible': sectionVisible }"
  >
    <div class="systems-inner landing-container">
      <div class="landing-header-center">
        <h2 class="landing-h2">核心自研系统</h2>
        <p class="landing-desc">以技术为核心，解锁跨境运营高效新方式，筑牢出海技术根基</p>
      </div>
      <div class="systems-cards">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="system-card"
          @mouseenter="onMediaEnter(index)"
          @mouseleave="onMediaLeave(index)"
        >
          <div class="system-img">
            <img :src="card.img" :alt="card.title" />
            <video
              :ref="(el) => setVideoRef(el, index)"
              :src="card.video"
              :poster="card.img"
              class="system-video"
              :class="{ 'is-visible': visibleVideoIndex === index }"
              muted
              playsinline
              preload="auto"
            />
          </div>
          <div class="system-body">
            <h3 class="system-title">{{ card.title }}</h3>
            <p class="system-desc">{{ card.desc }}</p>
          </div>
        </article>
      </div>
      <el-button class="ot-btn--black btn-cta-black systems-cta" size="large" @click="goLogin">
        免费开始全球社媒增长
      </el-button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useGoLogin } from '../composables/useGoLogin'

const { goLogin } = useGoLogin()

const sectionRef = ref(null)
const sectionVisible = ref(false)
let sectionObserver = null

/** 封面图始终垫底；仅视频真正开始播放后才显示视频层，避免闪黑 */
const visibleVideoIndex = ref(-1)
const hoverIndex = ref(-1)
const videoRefs = ref([])

const cards = [
  {
    img: '/img/自研系统/1.png',
    video: '/img/自研系统/1.mp4',
    title: '官方API数据管理后台',
    desc: '全账号数据一键同步，无需人工统计，覆盖播放、完播、转化全维度数据，数据趋势可视化且异常智能预警，多账号数据可统一汇总并一键导出',
  },
  {
    img: '/img/自研系统/2.png',
    video: '/img/自研系统/2.mp4',
    title: '多账号矩阵批量定时发布',
    desc: '跨时区自动发布，解放人工双手，可实现千级账号集群统一管理、防关联隔离，跨时区精准定时发布并实时监控发布状态，批量分发内容规避人工操作失误',
  },
  {
    img: '/img/自研系统/3.png',
    video: '/img/自研系统/3.mp4',
    title: 'AI智能视频剪辑量产引擎',
    desc: '无需专业剪辑，海量原创内容量产，支持文本/图片一键生成原创短视频、多素材混剪去重及多语种字幕配音，适配全球市场需求',
  },
  {
    img: '/img/自研系统/4.png',
    video: '/img/自研系统/4.mp4',
    title: '全域运营智能监控中心',
    desc: '实时监控账号运营状态、内容曝光数据及风控异常，一键查看运营全局，快速响应调整，保障运营高效可控',
  },
]

function setVideoRef(el, index) {
  if (el) videoRefs.value[index] = el
}

function onMediaEnter(index) {
  const video = videoRefs.value[index]
  if (!video) return

  hoverIndex.value = index

  const reveal = () => {
    if (hoverIndex.value === index) {
      visibleVideoIndex.value = index
    }
  }

  video.addEventListener('playing', reveal, { once: true })
  video.currentTime = 0
  video.play().catch(() => {
    if (hoverIndex.value === index) hoverIndex.value = -1
  })
}

function onMediaLeave(index) {
  hoverIndex.value = -1
  visibleVideoIndex.value = -1

  const video = videoRefs.value[index]
  if (!video) return

  video.pause()
  video.currentTime = 0
}

onMounted(() => {
  nextTick(() => {
    videoRefs.value.forEach((video) => video?.load())
  })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sectionVisible.value = true
    return
  }

  if (sectionRef.value) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !sectionVisible.value) {
            sectionVisible.value = true
            sectionObserver?.disconnect()
            sectionObserver = null
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    sectionObserver.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  sectionObserver?.disconnect()
})
</script>

<style scoped>
.systems {
  padding-top: 80px;
  padding-bottom: 80px;
  background: transparent;
}

.systems-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.systems-cards {
  display: var(--systems-cards-display, flex);
  grid-template-columns: var(--systems-cards-grid-columns, none);
  gap: 24px;
  width: 100%;
}

.system-card {
  flex: var(--system-card-flex, 1);
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--el-color-primary-light-9);
  border-radius: 16px;
  overflow: hidden;
}

.system-img {
  position: relative;
  width: 100%;
  aspect-ratio: 804 / 600;
  flex-shrink: 0;
  overflow: hidden;
  cursor: default;
}

.system-img img,
.system-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.system-img img {
  z-index: 0;
}

.system-video {
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.system-video.is-visible {
  visibility: visible;
  opacity: 1;
}

.system-body {
  padding: 16px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.system-title {
  margin: 0;
  font-weight: 500;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.system-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}

.systems-cta {
  margin-top: 0;
}
</style>
