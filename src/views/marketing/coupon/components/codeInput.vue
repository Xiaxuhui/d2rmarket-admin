<template>
  <div class="flex items-center">
    <Input :value="code" :disabled="disabled" @input="valueChange" placeholder="Please enter" />
    <a v-if="!disabled" class="ml-[16px] text-nowrap" @click="getRandomCode">Random</a>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Input } from 'ant-design-vue';
  import { v4 as uuid } from 'uuid';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    disabled: Boolean,
  });

  const emits = defineEmits(['update:modelValue']);

  const code = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const valueChange = (e) => {
    emits('update:modelValue', e.target.value);
  };

  const getRandomCode = () => {
    const uuidStr = (uuid() || '').split('-')[1] || '';
    emits('update:modelValue', uuidStr);
  };
</script>
