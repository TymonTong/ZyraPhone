<template>
  <section
    class="solutions landing-section"
    :class="{ 'solutions--enter': true, 'solutions--ready': enterReady }"
  >
    <div class="solutions-inner landing-container">
      <article v-for="item in list" :key="item.title" class="solution-item">
        <div class="icon-box-32">
          <img :src="item.icon" :alt="item.title" />
        </div>
        <div class="solution-text">
          <h3 class="solution-title">{{ item.title }}</h3>
          <p class="solution-desc">{{ item.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const enterReady = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    enterReady.value = true
  })
})

const list = [
  {
    icon: '/img/解决方案/icon1.png',
    title: 'TikTok Shop 全链路运营',
    desc: '涵盖选品、内容创作、直播带货、店铺运营到售后管理等全链路服务',
  },
  {
    icon: '/img/解决方案/icon2.png',
    title: 'TikTok B2B营销获客解决方案',
    desc: '全域社媒精准营销 + 企业 IP 孵化全周期服务，助力工厂、企业高效获取海外高质量精准商业线索。',
  },
  {
    icon: '/img/解决方案/icon3.png',
    title: '内容创意+体系化培训',
    desc: '全维度 AI 内容生产赋能 + 定制化运营人才内训，赋能企业自建专属社媒运营团队。',
  },
]
</script>

<style scoped>
.solutions {
  padding-top: 48px;
  padding-bottom: 48px;
  background: var(--el-bg-color);
}

.solutions-inner {
  display: flex;
  flex-direction: var(--solutions-inner-direction, row);
  gap: 24px;
  align-items: flex-start;
}

.solution-item {
  flex: 1;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 0 16px;
  min-width: 0;
}

.solution-title {
  margin: 0 0 8px;
  height: var(--solution-title-block-height, auto);
  display: flex;
  align-items: center;
  font-size: var(--solution-title-font-size, 20px);
  font-weight: 500;
  line-height: var(--solution-title-line-height, 28px);
  color: var(--el-text-color-primary);
}

.solution-desc {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--el-text-color-secondary);
}
</style>
