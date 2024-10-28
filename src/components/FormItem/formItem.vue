<template>
  <div class="flex mb-[24px]">
    <div class="w-[160px] text-right text-sm text-[gba(0, 0, 0, 0.88)] flex flex-row-reverse">
      <label :class="styles.label({ labelCenter })"> {{ label }}:</label>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  defineOptions({ name: 'FormItem' });
  defineProps({
    label: String,
    labelCenter: Boolean,
  });
  const styles = tv({
    slots: {
      label: 'flex h-full pr-[8px]',
    },
    variants: {
      labelCenter: {
        true: {
          label: 'items-center ',
        },
      },
    },
  })();
</script>
