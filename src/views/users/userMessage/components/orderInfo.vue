<template>
  <div class="w-[600px] pt-4 pr-4">
    <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'detail'">
          <a @click="showDetail(record)">detail</a>
        </template>
      </template>
    </Table>
    <Card class="mt-[30px]" title="Detail">
      <div class="flex">
        <div class="flex-1 text-base font-bold text-center">Name</div>
        <div class="flex-1 text-base font-bold text-center">Num</div>
        <div class="flex-1 text-base font-bold text-center">Discount</div>
        <div class="flex-1 text-base font-bold text-center">Price</div>
        <div class="flex-1 text-base font-bold text-center">Actual Price</div>
      </div>
      <div
        class="flex leading-[40px]"
        v-for="(item, index) in orderRecord.details || []"
        :key="`${uid}${index}`"
      >
        <div class="flex-1 text-center">{{ item.name }}</div>
        <div class="flex-1 text-center">x {{ item.num || 0 }}</div>
        <div class="flex-1 text-center">{{ item.discount > 0 ? `${item.discount}%` : '' }}</div>
        <div class="flex-1 text-center">{{ numberFixed((+item.price || 0) / 100, 2) }}</div>
        <div class="flex-1 text-center">{{
          item.discount > 0
            ? BigNumber(item.price).div(10000).multipliedBy(item.discount).valueOf()
            : numberFixed((+item.price || 0) / 100, 2)
        }}</div>
      </div>
    </Card>
    <div class="flex-col mt-[10px]">
      <div class="leading-[40px] text-xl font-bold text-center text-right"
        >Coupon: {{ orderRecord.coupon ? `${orderRecord.coupon}%` : '' }}</div
      >
      <div class="leading-[40px] text-xl font-bold text-center text-right">
        Price:
        <span class="text-[#ff8c00]">
          {{ numberFixed((+orderRecord.amount || 0) / 100, 2) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ORDER_TEXT } from '@/contants/index';
  import { formatToDateTime } from '@/utils/dateUtil';
  import { Table, Card } from 'ant-design-vue';
  import { watch, ref } from 'vue';
  import { orderList } from '@/api/order';
  import { IOrder } from '@/definations/index';
  import { numberFixed } from '@/utils/index';
  import BigNumber from 'bignumber.js';

  const dataSource = ref<IOrder[]>([]);

  const orderRecord = ref<IOrder>({} as IOrder);

  const props = defineProps({
    uid: Number,
  });

  watch(
    () => props.uid,
    (val) => {
      dataSource.value = [];
      orderRecord.value = {} as IOrder;
      if (val) {
        orderList({ uid: val }).then((res) => {
          dataSource.value = res;
        });
      }
    },
  );

  const columns = [
    {
      title: 'OrderId',
      dataIndex: 'id',
    },
    {
      title: 'Create Time',
      dataIndex: 'ctime',
      customRender({ value }) {
        return formatToDateTime(value * 1000);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      customRender({ value }) {
        return ORDER_TEXT[value];
      },
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
  ];

  const showDetail = (record) => {
    console.log('detail', record);
    orderRecord.value = record;
  };
</script>
