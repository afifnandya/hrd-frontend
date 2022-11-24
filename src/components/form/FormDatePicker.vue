<template>
  <div class="input-group">
    <FormLabel v-if="label" :label="label" :required="required" />
    <div class="w-full">
      <Calendar
        v-model="model"
        :placeholder="placeholder"
        date-format="yy-mm-dd"
        class="w-full"
        :disabled="disabled"
      />
      <span v-for="error in errors" :key="error.$uid" class="input-error">{{
        error.$message
      }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import Calendar from 'primevue/calendar'
import FormLabel from './FormLabel.vue'

const props = defineProps([
  'modelValue',
  'errors',
  'label',
  'required',
  'placeholder',
  'disabled'
])
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)
watch(model, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
