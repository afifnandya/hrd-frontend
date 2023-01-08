<template>
  <div></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  kontrakId: {
    type: [Number, String],
    required: true
  },
  karyawanId: {
    type: [Number, String],
    required: true
  }
})
</script>
<script>
export default {
  name: 'KaryawanKontrakEdit'
}
</script>
