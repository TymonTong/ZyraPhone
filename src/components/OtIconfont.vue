<script setup>
/**
 * OT 图标库薄封装（与 ot/app-kit/AppIconfont 一致，供官网使用）
 * 雪碧图由 index.html 中的 iconfont 脚本注入
 */
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  active: { type: Boolean, default: false },
  symbolId: { type: String, default: '' },
  size: { type: String, default: '' },
})

const spriteHref = computed(() => {
  if (props.symbolId) return `#${props.symbolId}`
  if (!props.name) return '#'
  const s = props.active ? '2' : '1'
  return `#icon-a-${props.name}${s}`
})
</script>

<template>
  <svg
    class="otymon-iconfont-svg"
    :class="size ? `otymon-iconfont-svg--${size}` : null"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <use :href="spriteHref" fill="currentColor" />
  </svg>
</template>
