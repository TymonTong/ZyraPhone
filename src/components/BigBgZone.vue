<script setup>
import { assetUrl } from '../utils/assetUrl.js'
</script>

<template>
  <div class="big-bg-zone">
    <img
      class="big-bg-zone__img"
      :src="assetUrl('/img/选择我们/big bg.png')"
      alt=""
      aria-hidden="true"
    />
    <div class="big-bg-zone__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/**
 * 大背景贯穿「选择我们」+「自研系统」（Figma big bg 1920×1464）
 * 整图完整展示，不被单模块 overflow 裁切
 */
.big-bg-zone {
  position: relative;
  width: 100%;
  overflow: visible;
}

.big-bg-zone__img {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  display: block;
  width: 1920px;
  height: 1464px;
  max-width: none;
  pointer-events: none;
  z-index: 0;
}

.big-bg-zone__content {
  position: relative;
  z-index: 1;
}
</style>
