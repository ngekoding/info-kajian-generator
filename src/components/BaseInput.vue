<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  labelHint: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <label class="block">
    <div class="flex items-center justify-between">
      <span class="text-gray-700">{{ props.label }}</span>
      <span v-if="props.labelHint" class="text-xs text-gray-400">
        {{ props.labelHint }}
      </span>
    </div>
    <input
      v-model="value"
      :type="props.type"
      class="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
      :placeholder="props.placeholder"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600">{{ props.error }}</p>
  </label>
</template>
