<script setup>
import { useGoLogin } from '../composables/useGoLogin'
import { assetUrl } from '../utils/assetUrl.js'

const { goLogin } = useGoLogin()
</script>

<template>
  <section class="leads landing-section">
    <div class="leads-card landing-container">
      <img class="leads-bg" :src="assetUrl('/img/海外线索/海外线索.png')" alt="" aria-hidden="true" />
      <div class="leads-content">
        <h2 class="leads-title">为企业获取高质量海外线索</h2>
        <p class="leads-desc">
          通过专业的 IP 孵化与精准线索交付服务，助力企业在海外市场建立品牌影响力，并获取高质量潜在客户
        </p>
        <el-button type="primary" size="large" class="leads-btn" @click="goLogin">了解详情</el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.leads {
  padding-bottom: 80px;
}

.leads-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 80px 32px;
}

.leads-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.leads-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  text-align: center;
}

.leads-desc {
  margin: 0;
  max-width: 900px;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  opacity: 0.7;
}

/* 宽度按稿；高 40 / 圆角 8 / 14 字重由 OT el-button--large 提供 */
.leads-btn {
  width: 100px;
}
</style>
