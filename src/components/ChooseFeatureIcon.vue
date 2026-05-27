<template>
  <div class="icon-box-48">
    <div
      ref="lottieEl"
      class="icon-lottie"
      :aria-label="alt"
      role="img"
    />
  </div>
</template>

<script setup>
import lottie from 'lottie-web'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  lottie: { type: String, required: true },
  alt: { type: String, default: '' },
  active: { type: Boolean, default: false },
})

const lottieEl = ref(null)
let anim = null

function goFirstFrame() {
  anim?.goToAndStop(0, true)
}

function destroyAnim() {
  if (anim) {
    anim.destroy()
    anim = null
  }
}

function initAnim() {
  if (!lottieEl.value || anim) return
  anim = lottie.loadAnimation({
    container: lottieEl.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: props.lottie,
  })
  anim.addEventListener('DOMLoaded', () => {
    if (props.active) anim.goToAndPlay(0)
    else goFirstFrame()
  })
}

watch(
  () => props.active,
  (active) => {
    if (!anim) return
    if (active) {
      anim.goToAndPlay(0)
    } else {
      goFirstFrame()
    }
  },
)

onMounted(initAnim)
onBeforeUnmount(destroyAnim)
</script>

<style scoped>
.icon-box-48 {
  position: relative;
  flex-shrink: 0;
  width: var(--choose-icon-box-size, 48px);
  height: var(--choose-icon-box-size, 48px);
  background: #fff;
  border: 1px solid var(--el-border-color);
  border-radius: var(--choose-icon-box-radius, 12px);
}

.icon-lottie {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--choose-icon-lottie-size, 28px);
  height: var(--choose-icon-lottie-size, 28px);
  transform: translate(-50%, -50%);
  line-height: 0;
  overflow: hidden;
}

.icon-lottie :deep(svg) {
  width: var(--choose-icon-lottie-size, 28px) !important;
  height: var(--choose-icon-lottie-size, 28px) !important;
}
</style>
