<template>
  <div class="py-6 bg-white">
    <div class="mx-auto border lg:w-8/12 py-[20px] my-[20px]">
      <div class="mx-2 text-xl font-bold text-center mb-[30px]">
        {{ title }}
      </div>
      <div class="mx-12">
        <div v-for="field in fields" :key="`field-${field.name}`">
          <FormInputText
            v-if="field.type === 'text'"
            v-model="state[field.name]"
            :label="field.label"
            :disabled="field.disabled"
            :required="field.required"
            :errors="field.required ? vuelidate[field.name].$errors : null"
          />
          <FormDropdown
            v-else-if="field.type === 'dropdown'"
            v-model="field.model"
            :label="field.label"
            :disabled="field.disabled"
            :required="field.required"
            :options="field.options"
            :option-value="field.optionValue"
            :option-label="field.optionLabel"
            :errors="field.required ? vuelidate[field.name].$errors : null"
          />
          <FormDatePicker
            v-else-if="field.type === 'date'"
            v-model="field.model"
            :label="field.label"
            :disabled="field.disabled"
            :required="field.required"
            :errors="field.required ? vuelidate[field.name].$errors : null"
          />
        </div>
      </div>

      <button
        v-if="submitBtn.show !== false"
        class="block mx-auto button button-primary"
        :disabled="submitBtn.disabled"
        @click="$emit('on-submit')"
      >
        {{ submitBtn.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid'
import { PropType, Ref, ref, toRef } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { requiredMessage } from '@/helper/formValidation'
import FormDatePicker from './FormDatePicker.vue'
import FormDropdown from './FormDropdown.vue'
import FormInputText from './FormInputText.vue'

export type Field = {
  type: 'text' | 'dropdown' | 'date'
  model: any
  name: string
  label?: string
  options?: any[]
  optionValue?: string
  optionLabel?: string
  disabled?: boolean
  required?: boolean
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array as PropType<Field[]>,
    required: true
  },
  submitBtn: {
    type: Object as PropType<{
      label: string
      disabled: boolean
      show?: boolean
    }>,
    required: true
  },
  showSubmit: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['on-submit'])

function createId(fieldLabel?: string) {
  if (fieldLabel) {
    return `${fieldLabel}-${nanoid(4)}`
  }
  return nanoid(4)
}

let state = {} as Record<string, any>
let rules = {} as Record<string, any>

function setupFormValidation() {
  const fields = props.fields
  fields.forEach((field) => {
    if (field.required) {
      rules[field.name] = { required: requiredMessage }
      state[field.name] = toRef(field, 'model')
    }
  })

  // return {
  //   state,
  //   rules
  // }
}

setupFormValidation()
const vuelidate = useVuelidate(rules, { ...state }, { $autoDirty: true })
console.log('a', { ...state })
</script>

<script lang="ts">
export default {
  name: 'FormAddData'
}
</script>
