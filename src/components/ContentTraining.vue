<template>
  <section id="training" class="training landing-section">
    <div class="training-inner landing-container">
      <div class="landing-header-center">
        <h2 class="landing-h2">内容培训</h2>
        <p class="landing-desc">赋能企业自建运营能力，夯实出海核心竞争力</p>
      </div>
      <div class="training-tabs">
        <button
          v-for="(tab, i) in tabs"
          :key="tab"
          type="button"
          class="training-tab"
          :class="{ active: activeTab === i }"
          @click="activeTab = i"
        >
          {{ tab }}
        </button>
      </div>
      <div class="training-cards">
        <article v-for="item in current" :key="item.title" class="training-card">
          <img class="training-card-icon" :src="item.icon" :alt="item.title" />
          <div class="training-card-body">
            <h3 class="training-card-title">{{ item.title }}</h3>
            <p class="training-card-desc">{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { assetUrl } from '../utils/assetUrl.js'

const img = (path) => assetUrl(path)

const activeTab = ref(0)
const tabs = ['创意内容开发', '专业能力赋能']
const all = [
  [
    { icon: img('/img/内容培训/icon-1.png'), title: '短视频创意策划', desc: '深度结合海外流行趋势与平台算法，结合品牌定位定制差异化脚本创意，打造高曝光、高种草的跨境短视频内容，快速抓取海外用户注意力' },
    { icon: img('/img/内容培训/icon-2.png'), title: '直播内容设计', desc: '贴合不同区域用户消费习惯，量身规划直播流程、选品逻辑与互动玩法，搭建本地化直播内容体系，有效提升直播间停留与成交转化' },
    { icon: img('/img/内容培训/icon-3.png'), title: '内容本地化', desc: '适配多国语言与地域文化差异，优化文案表达、画面风格及审美偏好，规避文化壁垒，让品牌内容精准贴合当地用户认知与消费场景' },
    { icon: img('/img/内容培训/icon-4.png'), title: '品牌故事包装', desc: '挖掘品牌核心优势与产品价值，用海外用户易于接受的表达形式重塑品牌形象，强化记忆点，助力品牌在海外市场建立长效口碑' },
  ],
  [
    { icon: img('/img/内容培训/icon-5.png'), title: '平台运营培训', desc: '聚焦TikTok Shop全平台规则，详解账号起号、日常运营及风控核心技巧，助力快速掌握运营逻辑，夯实出海运营基础，提升运营效率与合规性' },
    { icon: img('/img/内容培训/icon-6.png'), title: '内容创作指导', desc: '全流程覆盖选题规划、脚本撰写至拍摄剪辑，提供专业细致指导，助力打造贴合海外市场偏好、兼具质感与传播力的优质运营内容' },
    { icon: img('/img/内容培训/icon-7.png'), title: '数据分析培训', desc: '传授运营数据解读方法，指导通过分析数据优化内容与运营策略，实现精准运营，有效提升转化效率，为企业出海运营提供数据支撑' },
    { icon: img('/img/内容培训/icon-8.png'), title: '团队能力提升', desc: '定制分层培训方案，针对性强化团队运营、内容创作及数据分析能力，夯实企业出海运营根基，助力企业打造专业高效的运营团队' },
  ],
]
const current = computed(() => all[activeTab.value])
</script>

<style scoped>
.training {
  padding-top: 64px;
  padding-bottom: 80px;
}

.training-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.training-tabs {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: var(--el-fill-color-light, #f5f7fa);
  border-radius: 9999px;
}

.training-tab {
  border: none;
  background: transparent;
  padding: 14px 28px;
  border-radius: 100px;
  font-size: var(--training-tab-font-size, 20px);
  font-weight: 500;
  line-height: var(--training-tab-line-height, 28px);
  color: var(--el-text-color-regular, #59596e);
  cursor: pointer;
  transition: all 0.2s;
}

.training-tab.active {
  background: var(--el-bg-color, #fff);
  color: var(--el-text-color-primary, #161619);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.training-cards {
  display: var(--training-cards-display, flex);
  gap: 24px;
  width: 100%;
  flex-wrap: nowrap;
}

.training-card {
  flex: var(--training-card-flex, 1);
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--el-fill-color-light, #f5f7fa);
  border-radius: 16px;
  overflow: clip;
}

.training-card-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: block;
}

.training-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.training-card-title {
  margin: 0;
  font-weight: 500;
  color: var(--el-text-color-primary, #161619);
}

.training-card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-regular, #59596e);
}
</style>
