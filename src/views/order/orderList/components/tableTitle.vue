<template>
  <Alert v-show="addNum > 0" :message="`${addNum} new order(s) have been placed`" type="success" />
</template>
<script lang="ts" setup>
  import { orderCount } from '@/api/order';
  import { ORDER_STATUS } from '@/contants';
  import { Alert } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    total: Number,
  });

  const addNum = ref(0);

  const getOrderNum = () => {
    setTimeout(async () => {
      const res = await orderCount({ status: ORDER_STATUS.PAID });
      addNum.value = res - props.total!;
      return getOrderNum();
    }, 10000);
  };
  onMounted(() => {
    getOrderNum();
  });
</script>
