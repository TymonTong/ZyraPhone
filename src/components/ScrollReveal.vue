<template>
  <div
    ref="root"
    :class="['scroll-reveal', `scroll-reveal--${animation}`, { 'is-visible': isVisible }, customClasses]"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  animation: { type: String, default: 'fade-up' },
  threshold: { type: Number, default: 0.1 },
  customClasses: { type: Array, default: () => [] },
})

const root = ref(null)
const isVisible = ref(false)
let observer = null

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isVisible.value) {
      isVisible.value = true
      if (observer) observer.disconnect()
      observer = null
    }
  })
}

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(handleIntersect, {
    threshold: props.threshold,
    rootMargin: '0px 0px -60px 0px',
  })
  observer.observe(root.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
}

.scroll-reveal--fade-up {
  transform: translateY(40px);
  transition:
    opacity var(--reveal-duration, 1s) var(--reveal-ease, ease),
    transform var(--reveal-duration, 1s) var(--reveal-ease, ease);
}

.scroll-reveal--fade-in {
  transition: opacity var(--reveal-duration, 1s) ease;
}

.scroll-reveal--fade-left {
  transform: translateX(-40px);
  transition:
    opacity var(--reveal-duration, 1s) var(--reveal-ease, ease),
    transform var(--reveal-duration, 1s) var(--reveal-ease, ease);
}

.scroll-reveal--fade-right {
  transform: translateX(40px);
  transition:
    opacity var(--reveal-duration, 1s) var(--reveal-ease, ease),
    transform var(--reveal-duration, 1s) var(--reveal-ease, ease);
}

.scroll-reveal--zoom-in {
  transform: scale(0.95);
  transition:
    opacity var(--reveal-duration, 1s) var(--reveal-ease, ease),
    transform var(--reveal-duration, 1s) var(--reveal-ease, ease);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translate(0, 0) scale(1) !important;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: none !important;
    transition: none;
  }
}
</style>
