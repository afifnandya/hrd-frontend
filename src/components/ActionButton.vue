<template>
  <div>
    <div ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <div ref="content" class="hidden">
      <div class="p-3">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tippy from 'tippy.js'
import { onMounted, ref } from 'vue'
const trigger = ref(null)
const content = ref(null)

onMounted(() => {
  if (!trigger.value || !content.value) {
    return
  }
  tippy(trigger.value, {
    content: content.value.innerHTML,
    interactive: true,
    allowHTML: true,
    theme: 'custom'
  })
})
</script>

<style lang="scss">
.tippy-box[data-theme~='custom'] {
  @apply p-[2px] bg-slate-50 shadow;
}
</style>
