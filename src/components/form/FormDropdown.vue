<template>
  <div class="input-group">
    <FormLabel v-if="label" :label="label" :required="required" />
    <div class="relative w-full">
      <Dropdown
        v-model="model"
        type="text"
        class="w-full"
        :placeholder="placeholder"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
      />
      <span v-for="error in errors" :key="error.$uid" class="input-error">{{
        error.$message
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import { defineProps, ref, watch } from 'vue'
import FormLabel from './FormLabel.vue'

const props = defineProps([
  'modelValue',
  'errors',
  'label',
  'required',
  'placeholder',
  'options',
  'optionLabel',
  'optionValue'
])
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)
watch(model, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
