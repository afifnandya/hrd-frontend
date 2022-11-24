<template>
  <div class="input-group">
    <FormLabel v-if="label" :label="label" :required="required" />
    <div class="relative w-full">
      <InputText
        v-model="model"
        type="text"
        class="w-full"
        :placeholder="placeholder"
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
