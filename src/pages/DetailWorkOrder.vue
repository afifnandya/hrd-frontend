<template>
  <FormTambahWorkOrder :id="id" :read="true" />
</template>
<script lang="ts" setup>
import FormTambahWorkOrder from '@/page_components/work_order/FormTambahWorkOrder.vue'

import { defineProps } from 'vue'

defineProps(['id'])
</script>
