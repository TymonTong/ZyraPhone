<template>
  <section id="advantages" class="choose-us landing-section">
    <div class="choose-inner landing-container">
      <div class="landing-header-center choose-header">
        <h2 class="landing-h2">为什么跨境卖家都选择我们？</h2>
        <p class="landing-desc">六大核心优势加持，专业靠谱可落地，助力企业高效出海少走弯路</p>
      </div>
      <!-- 960–1200：标题条 + bg 2 大图 + 小装饰图（Figma 12507:15665） -->
      <div class="choose-hero">
        <div class="choose-hero__bg">
          <img class="choose-hero__bg-img" :src="assetUrl('/img/选择我们/big bg.png')" alt="" />
        </div>
        <div class="choose-hero__copy">
          <h2 class="landing-h2">为什么跨境卖家都选择我们？</h2>
          <p class="landing-desc">六大核心优势加持，专业靠谱可落地，助力企业高效出海少走弯路</p>
        </div>
        <div class="choose-demo choose-demo--hero">
          <img
            class="choose-demo__img choose-demo__img--hero"
            :src="assetUrl('/img/选择我们/总场景-小.png')"
            alt="运营演示"
            width="168"
            height="155"
            decoding="async"
            @error="onDemoError"
          />
        </div>
      </div>
      <div class="choose-body">
        <div class="choose-demo choose-demo--side">
          <img
            class="choose-demo__img"
            :src="assetUrl('/img/选择我们/总场景.webp')"
            alt="运营演示"
            width="560"
            height="516"
            decoding="async"
            @error="onDemoError"
          />
        </div>
        <div class="features-grid">
          <article
            v-for="(f, i) in features"
            :key="f.figmaNo"
            class="feature-cell"
            :class="{ 'feature-cell--hover': featureHoverEnabled && hoveredIndex === i }"
            :data-figma-no="f.figmaNo"
            :style="{ gridArea: f.gridArea }"
            @mouseenter="onFeatureEnter(i)"
            @mouseleave="onFeatureLeave"
          >
            <ChooseFeatureIcon
              :lottie="f.lottie"
              :alt="f.title"
              :active="featureHoverEnabled && hoveredIndex === i"
            />
            <div class="feature-text">
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChooseFeatureIcon from './ChooseFeatureIcon.vue'
import { assetUrl } from '../utils/assetUrl.js'

const hoveredIndex = ref(-1)
const featureHoverEnabled = ref(true)

const MOBILE_CHOOSE_MQ = '(max-width: 767px)'

function syncFeatureHoverEnabled() {
  featureHoverEnabled.value = !window.matchMedia(MOBILE_CHOOSE_MQ).matches
  if (!featureHoverEnabled.value) hoveredIndex.value = -1
}

function onFeatureEnter(index) {
  if (!featureHoverEnabled.value) return
  hoveredIndex.value = index
}

function onFeatureLeave() {
  if (!featureHoverEnabled.value) return
  hoveredIndex.value = -1
}

let chooseMq = null

onMounted(() => {
  syncFeatureHoverEnabled()
  chooseMq = window.matchMedia(MOBILE_CHOOSE_MQ)
  chooseMq.addEventListener('change', syncFeatureHoverEnabled)
})

onBeforeUnmount(() => {
  chooseMq?.removeEventListener('change', syncFeatureHoverEnabled)
})

const demoFallback = assetUrl('/img/选择我们/未标题-1.gif')

function onDemoError(e) {
  const img = e.target
  if (img.dataset.fallback) return
  img.dataset.fallback = '1'
  img.src = demoFallback
}

/** Figma 12371:23257 — data-name 01~06 与动效 json 一一对应 */
const features = [
  {
    figmaNo: '01',
    gridArea: '1 / 1 / 2 / 2',
    lottie: assetUrl('/img/选择我们/资深专家.json'),
    title: '资深专家团队',
    desc: '聚焦TikTok Shop赛道，拥有专业运营团队，助力多家头部企业成功拓展全球电商市场，积累丰富实战经验。',
  },
  {
    figmaNo: '06',
    gridArea: '1 / 2 / 2 / 3',
    lottie: assetUrl('/img/选择我们/全链路覆盖.json'),
    title: '全链路覆盖',
    desc: '全面覆盖短视频创作、账号矩阵管理、内容孵化、店铺运营等全环节，提供一站式运营支撑，省心高效。',
  },
  {
    figmaNo: '05',
    gridArea: '2 / 1 / 3 / 2',
    lottie: assetUrl('/img/选择我们/实战方法论.json'),
    title: '实战方法论',
    desc: '依托1000+企业出海成功案例，沉淀一套成熟可落地的运营体系，覆盖从账号起号到变现全流程，避坑提效。',
  },
  {
    figmaNo: '04',
    gridArea: '2 / 2 / 3 / 3',
    lottie: assetUrl('/img/选择我们/数据驱动优化.json'),
    title: '数据驱动优化',
    desc: '搭载AI智能分析系统，实时抓取运营数据、优化运营策略，精准解决运营痛点，提升运营效率与转化效果。',
  },
  {
    figmaNo: '03',
    gridArea: '3 / 1 / 4 / 2',
    lottie: assetUrl('/img/选择我们/矩阵化运营.json'),
    title: '矩阵化运营',
    desc: '采用规模化账号管理模式，优化账号布局与运营流程，实现多账号同步高效运营，降低管理成本。',
  },
  {
    figmaNo: '02',
    gridArea: '3 / 2 / 4 / 3',
    lottie: assetUrl('/img/选择我们/本地化运营.json'),
    title: '本地化深度运营',
    desc: '深耕全球TikTok Shop市场，提供全链路定制化服务，适配不同区域市场需求，助力企业实现全球布局。',
  },
]
</script>

<style scoped>
/* Figma 12371:23257 */
.choose-us {
  position: relative;
  width: 100%;
  padding-top: 96px;
  padding-bottom: 96px;
  background: transparent;
}

.choose-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.choose-header {
  width: 100%;
}

.choose-hero {
  display: none;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: var(--el-color-primary-light-9, #f2f4fa);
  padding: 24px 24px 0;
  box-sizing: border-box;
}

/* 最底层装饰 bg，文案与小图叠在上方 */
.choose-hero__bg {
  display: none;
  position: absolute;
  z-index: 0;
  top: 50%;
  right: 0;
  width: 960px;
  height: 732px;
  transform: translateY(-50%);
  pointer-events: none;
  overflow: hidden;
}

.choose-hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scaleY(-1) rotate(180deg);
}

.choose-hero__copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  text-align: left;
}

.choose-demo--hero {
  display: none;
  position: relative;
  z-index: 1;
}

.choose-body {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.choose-demo {
  flex: 0 0 560px;
  width: 560px;
  height: 516px;
  flex-shrink: 0;
}

.choose-demo__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: transparent;
}

.choose-demo__img--hero {
  object-fit: contain;
  object-position: right top;
}

.features-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(3, fit-content(100%));
  border-radius: 16px;
  min-width: 0;
  overflow: hidden;
}

.feature-cell {
  display: flex;
  gap: 24px;
  padding: 32px 24px;
  align-items: flex-start;
  border-radius: 16px;
  justify-self: stretch;
  overflow: clip;
  background: transparent;
  transition: background-color 0.2s ease;
}

@media (hover: hover) and (min-width: 768px) {
  .feature-cell--hover {
    background: var(--el-fill-color-light, #f5f7fa);
  }
}

.feature-title {
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.feature-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}
</style>
