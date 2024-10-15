<template>
  <div>
    <div :class="timeStyle({ isMyself })">2024/10/15 9:58</div>
    <div :class="messageCardStyle({ isMyself })">
      <div class="flex items-center break-all">
        <template v-if="message.type === IMessageType.IMG">
          <img class="max-w-[600px]" :src="message.data" alt="" />
        </template>
        <template v-else>
          {{ message.data }}
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { tv } from 'tailwind-variants';
  import { IMessageType } from '../definition';

  defineProps({
    isMyself: Boolean,
    message: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  });

  const styles = tv({
    slots: {
      time: 'text-[10px] px-4',
      messageCard: 'relative text-sm py-2 px-4 shadow rounded-xl',
    },
    variants: {
      isMyself: {
        true: {
          time: 'text-right',
          messageCard: 'bg-indigo-500 text-white mr-3',
        },
        false: {
          time: 'text-left',
          messageCard: 'bg-white  ml-3 ',
        },
      },
    },
  });

  const { time: timeStyle, messageCard: messageCardStyle } = styles();
</script>
