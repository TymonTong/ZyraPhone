<template>
  <section class="cases landing-section">
    <div class="cases-wrap landing-container">
      <div class="cases-bg-right" aria-hidden="true">
        <img :src="assetUrl('/img/出海案例/bg.png')" alt="" />
      </div>
      <div class="cases-tab-img cases-tab-img--ecom" :class="{ active: activeTab === 'ecom' }">
        <img :src="assetUrl('/img/出海案例/电商出海.png')" alt="" />
      </div>
      <div class="cases-tab-img cases-tab-img--corp" :class="{ active: activeTab === 'corp' }">
        <img :src="assetUrl('/img/出海案例/企业出海.png')" alt="" />
      </div>

      <aside class="cases-sidebar">
        <div class="cases-head">
          <h2 class="landing-h2">出海成功案例</h2>
          <p class="landing-desc">
            多行业实战案例佐证，覆盖电商、企业外贸等赛道，复刻成功路径助力出海增长
          </p>
        </div>
        <div class="cases-tabs">
          <button
            type="button"
            class="cases-tab"
            :class="{ active: activeTab === 'ecom' }"
            @click="activeTab = 'ecom'"
          >
            <span v-if="activeTab === 'ecom'" class="tab-arrow" aria-hidden="true">▶</span>
            电商出海案例
          </button>
          <button
            type="button"
            class="cases-tab"
            :class="{ active: activeTab === 'corp' }"
            @click="activeTab = 'corp'"
          >
            <span v-if="activeTab === 'corp'" class="tab-arrow" aria-hidden="true">▶</span>
            企业出海案例
          </button>
        </div>
      </aside>

      <div class="cases-grid">
        <article class="case-card case-card--wide">
          <div class="case-top">
            <h3 class="case-title">{{ wideCard.title }}</h3>
            <p class="case-desc">{{ wideCard.desc }}</p>
          </div>
          <div class="case-stats">
            <div v-for="s in wideCard.stats" :key="s.label" class="stat-row">
              <span class="stat-bar" />
              <span class="stat-label">{{ s.label }}</span>
              <span class="stat-value">{{ s.value }}</span>
            </div>
          </div>
        </article>
        <article v-for="card in smallCards" :key="card.title" class="case-card">
          <div class="case-top">
            <h3 class="case-title">{{ card.title }}</h3>
            <p class="case-desc">{{ card.desc }}</p>
          </div>
          <div class="case-stats">
            <div v-for="s in card.stats" :key="s.label" class="stat-row">
              <span class="stat-bar" />
              <span class="stat-label">{{ s.label }}</span>
              <span class="stat-value">{{ s.value }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { assetUrl } from '../utils/assetUrl.js'

const activeTab = ref('ecom')

/** Figma 12505:7370 */
const wideCard = {
  title: '消费品牌电商出海',
  desc: '搭建 TikTok 海外品牌电商账号矩阵，实现内容种草与销售转化协同运营',
  stats: [
    { label: '电商账号稳定运行', value: '1200+' },
    { label: '海外转化率提升', value: '80%' },
  ],
}

const smallCards = [
  {
    title: '跨境零售电商',
    desc: '搭建小店运营体系，打通短视频带货转化链路',
    stats: [
      { label: '电商账号统一管理', value: '900+' },
      { label: '海外订单增长', value: '150%' },
    ],
  },
  {
    title: '美妆电商出海',
    desc: '打造种草达人矩阵，促成品牌曝光销量双增长',
    stats: [
      { label: '商品点击转化率提升', value: '95%' },
      { label: '海外客户增长', value: '110%' },
    ],
  },
]
</script>

<style scoped>
.cases {
  padding-top: 80px;
  padding-bottom: 80px;
}

/* Figma 12505:7370：左 796 + 右 796，间距 24，内边距 32 */
.cases-wrap {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
  background: var(--el-fill-color-light, #f5f7fa);
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
  min-height: 536px;
  box-sizing: border-box;
}

/* 背景 x480，宽 1200（相对 1680 画布） */
.cases-bg-right {
  position: absolute;
  left: 28.571428571%;
  top: 0;
  right: 0;
  height: 600px;
  pointer-events: none;
}

.cases-bg-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cases-tab-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 400px;
  height: 240px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.cases-tab-img.active {
  opacity: 1;
}

.cases-tab-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cases-sidebar {
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px 24px 0;
}

.cases-head {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cases-tabs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cases-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border: none;
  background: none;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  text-align: left;
}

.cases-tab.active {
  color: var(--el-text-color-primary);
}

.tab-arrow {
  display: inline-flex;
  width: 16px;
  font-size: 12px;
  color: var(--el-color-primary);
}

.cases-grid {
  position: relative;
  z-index: 2;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: auto auto;
  gap: 16px;
}

.case-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  height: 228px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.case-card--wide {
  grid-column: 1 / span 2;
}

.case-title {
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
}

.case-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}

.case-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-bar {
  width: 2px;
  height: 18px;
  background: var(--el-color-primary);
  border-radius: 1px;
  flex-shrink: 0;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.stat-value {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}
</style>
