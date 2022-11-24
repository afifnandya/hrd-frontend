<template>
  <div class="font-bold input-label">
    {{ label }}
    <FormRequired v-if="required" />
  </div>
</template>
<script lang="ts" setup>
import FormRequired from '@/components/form/FormRequired.vue'
import { defineProps } from 'vue'

const props = defineProps(['label', 'required'])
</script>
