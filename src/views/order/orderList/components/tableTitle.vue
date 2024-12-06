<template>
  <Alert
    v-show="order.orderCount > 0"
    :message="`${order.orderCount} new order(s) have been placed`"
    type="success"
  />
</template>
<script lang="ts" setup>
  import { useOrderStore } from '@/store/modules/order';
  import { Alert } from 'ant-design-vue';

  const order = useOrderStore();
</script>
