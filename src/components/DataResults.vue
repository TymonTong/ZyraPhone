<template>
  <section id="data" ref="sectionRef" class="data-results landing-section">
    <div class="data-inner landing-container">
      <div class="data-left">
        <div class="data-head">
          <span class="data-tag">服务30+大型企业对象</span>
          <h2 class="data-title">核心数据成果直观可见</h2>
          <p class="data-desc">
            以数据佐证实力，全方位呈现运营价值，用真实数据为企业出海保驾护航
          </p>
        </div>
        <div class="metrics">
          <div
            v-for="(m, index) in metrics"
            :key="m.label"
            class="metric-item"
          >
            <div v-if="m.extraSuffix" class="metric-value-row">
              <span class="metric-number">{{ displayedValues[index] }}</span>
              <span class="metric-suffix">{{ m.extraSuffix }}</span>
            </div>
            <span v-else class="metric-number">{{ displayedValues[index] }}</span>
            <span class="metric-label">{{ m.label }}</span>
          </div>
        </div>
      </div>
      <div class="data-map">
        <!-- 舞台与地图同宽高比，fill 铺满；数据条用 % 定位，随容器同比缩放 -->
        <div class="data-map-stage">
          <img
            class="data-map-img"
            :src="assetUrl('/img/数据成果/map.png')"
            alt="全球数据分布"
            width="2200"
            height="1000"
          />
          <div class="data-bars" :class="{ 'is-animated': sectionAnimated }">
            <div
              v-for="(bar, index) in mapBars"
              :key="index"
              class="map-bar"
              :style="{
                left: `${bar.left}%`,
                bottom: `${bar.bottom}%`,
                height: `${bar.height}%`,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import mapBars from '../data/map-bars.json'
import { assetUrl } from '../utils/assetUrl.js'

/** 与数据条生长动画 map-bar-grow 时长一致 */
const GROW_DURATION_MS = 1200

const metrics = [
  { end: 342.86, decimals: 2, suffix: '%', label: '业务收益增长' },
  { end: 90, decimals: 0, suffix: '%', label: '人工统表时间减少' },
  { end: 99.8, decimals: 1, suffix: '%', label: '系统稳定性' },
  { end: 0, decimals: 0, extraSuffix: '误差', label: '官方接口数据直达' },
]

const sectionRef = ref(null)
const sectionAnimated = ref(false)
const displayedValues = ref(metrics.map((m) => formatMetric(0, m)))

let observer = null
let rafId = null

/** 与 CSS cubic-bezier(0.22, 1, 0.36, 1) 接近的缓动 */
function easeGrow(t) {
  return 1 - (1 - t) ** 3
}

function formatMetric(value, config) {
  const n = config.suffix === '%' ? `${formatNumber(value, config.decimals)}%` : formatNumber(value, config.decimals)
  return n
}

function formatNumber(value, decimals) {
  if (decimals === 0) return String(Math.round(value))
  return value.toFixed(decimals)
}

function getFinalDisplays() {
  return metrics.map((m) => formatMetric(m.end, m))
}

function runCountUp() {
  if (rafId) cancelAnimationFrame(rafId)
  const start = performance.now()

  const tick = (now) => {
    const t = Math.min((now - start) / GROW_DURATION_MS, 1)
    const eased = easeGrow(t)
    displayedValues.value = metrics.map((m) => formatMetric(m.end * eased, m))
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      displayedValues.value = getFinalDisplays()
      rafId = null
    }
  }

  displayedValues.value = metrics.map((m) => formatMetric(0, m))
  rafId = requestAnimationFrame(tick)
}

function startSectionAnimation() {
  sectionAnimated.value = true
  runCountUp()
}

onMounted(() => {
  const el = sectionRef.value
  if (!el) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    displayedValues.value = getFinalDisplays()
    sectionAnimated.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startSectionAnimation()
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Figma 12371:23175 */
.data-results {
  --grow-duration: 1.2s;
  --grow-ease: cubic-bezier(0.22, 1, 0.36, 1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 80px;
}

/* 左 1 : 右 2，间距 24；宽度随容器同比缩放 */
.data-inner {
  display: grid;
  grid-template-columns: var(--data-inner-grid-columns, minmax(0, 1fr) minmax(0, 2fr));
  gap: 24px;
  width: 100%;
  align-items: center;
}

.data-left {
  display: flex;
  flex-direction: column;
  gap: 56px;
  align-items: flex-start;
  justify-content: center;
  min-height: 420px;
  min-width: 0;
}

.data-head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
}

.data-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 10px;
  background: var(--el-color-primary-light-9, #f2f4fa);
  border: 1px solid var(--el-color-primary-light-8, #e1e2fa);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: var(--el-color-primary);
  white-space: nowrap;
}

.data-desc {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  row-gap: 20px;
  column-gap: 24px;
  width: 100%;
  height: 152px;
  flex-shrink: 0;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}

.metric-value-row {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
}

.metric-number {
  font-family: 'Poppins', var(--el-font-family), sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.metric-suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.metric-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}

.data-map {
  width: 100%;
  min-width: 0;
}

/* map.png 2200×1000，与 Figma 标注坐标系一致 */
.data-map-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 2200 / 1000;
}

.data-map-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  pointer-events: none;
  z-index: 0;
}

.data-bars {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* 4px 填充胶囊条（非描边）；锚点 = 底边中心：left + translateX(-50%)，bottom + origin bottom center */
.map-bar {
  position: absolute;
  width: 4px;
  transform: translateX(-50%) scaleY(0);
  transform-origin: bottom center;
  border-radius: 2px;
  background: linear-gradient(
    to top,
    rgba(27, 0, 229, 0.04) 0%,
    rgba(27, 0, 229, 0.18) 28%,
    rgba(27, 0, 229, 0.5) 62%,
    rgba(27, 0, 229, 0.88) 88%,
    #1b00e5 100%
  );
  border: none;
  box-shadow: none;
  filter: none;
}

.data-bars.is-animated .map-bar {
  animation: map-bar-grow var(--grow-duration) var(--grow-ease) forwards;
}

@keyframes map-bar-grow {
  from {
    transform: translateX(-50%) scaleY(0);
  }
  to {
    transform: translateX(-50%) scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .map-bar {
    transform: translateX(-50%) scaleY(1);
  }
}
</style>
