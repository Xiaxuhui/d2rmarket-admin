<template>
  <div class="flex">
    <div>Order List</div>
    <div
      v-show="addNum > 0"
      class="rounded-full w-[20px] h-[20px] leading-[20px] text-[#fff] absolute right-0 bottom-0 bg-[#ff4c4a] text-center"
      >{{ addNum }}</div
    >
  </div>
</template>
<script lang="ts" setup>
  import { orderList } from '@/api/order';
  import { ORDER_STATUS_GROUP } from '@/contants';
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    total: Number,
  });

  const addNum = ref(0);

  const getOrderNum = () => {
    setTimeout(async () => {
      const res = await orderList({ status: ORDER_STATUS_GROUP.join(',') });
      addNum.value = res.length - (props.total || res.length);
      return getOrderNum();
    }, 10000);
  };

  onMounted(() => {
    getOrderNum();
  });
</script>
