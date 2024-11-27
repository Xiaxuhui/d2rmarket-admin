<template>
  <div class="max-w-[600px] h-full pt-4 pr-4 overflow-auto">
    <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'detail'">
          <a @click="showDetail(record)">detail</a>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'send',
                icon: 'material-symbols:send-outline',
                ifShow: record.status === ORDER_STATUS.PAID,
                onClick() {
                  updateOrder({ state: ORDER_STATUS.BE_SENDING, ids: record.id }).then(() =>
                    reload(),
                  );
                },
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <Card title="Detail">
      <div class="flex">
        <div class="flex-1 text-base font-bold text-center">Name</div>
        <div class="flex-1 text-base font-bold text-center">Num</div>
        <div class="flex-1 text-base font-bold text-center">Unit Price</div>
        <div class="flex-1 text-base font-bold text-center">Discount Price</div>
        <div class="flex-1 text-base font-bold text-center">Price</div>
      </div>
      <div
        class="flex leading-[40px]"
        v-for="(item, index) in orderRecord.details || []"
        :key="`${uid}${index}`"
      >
        <div class="flex-1 text-center truncate max-w-[200px]" :title="item.name">{{
          item.name
        }}</div>
        <div class="flex-1 text-center">x {{ item.num || 0 }}</div>
        <div class="flex-1 text-center">{{ numberFixed((+item.price || 0) / 100, 2) }}</div>
        <div class="flex-1 text-center">{{ numberFixed((+item.discountPrice || 0) / 100, 2) }}</div>
        <div class="flex-1 text-center">{{
          BigNumber(item.discountPrice).div(100).multipliedBy(item.num).valueOf()
        }}</div>
      </div>
    </Card>
    <div class="flex-col mt-[10px]">
      <div class="leading-[40px] text-xl font-bold text-center text-right"
        >Coupon: {{ orderRecord.coupon ? `${orderRecord.coupon}` : '' }}</div
      >
      <div class="leading-[40px] text-xl font-bold text-center text-right">
        Total Price:
        <span class="text-[#ff8c00]">
          {{ numberFixed((+orderRecord.relAmount || 0) / 100, 2) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ORDER_STATUS_GROUP, ORDER_STATUS } from '@/contants/index';
  import { TableAction } from '@/components/Table';
  import { Table, Card } from 'ant-design-vue';
  import { watch, ref } from 'vue';
  import { orderList, updateOrder } from '@/api/order';
  import { IOrder } from '@/definations/index';
  import { numberFixed } from '@/utils/index';
  import BigNumber from 'bignumber.js';
  import { columns } from '../tableData';

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
        orderList({ userId: val, status: ORDER_STATUS_GROUP.join(',') }).then((res) => {
          dataSource.value = res;
        });
      }
    },
  );

  const reload = () => {
    props.uid &&
      orderList({ userId: props.uid, status: ORDER_STATUS_GROUP.join(',') }).then((res) => {
        dataSource.value = res;
      });
  };

  const showDetail = (record) => {
    orderRecord.value = record;
  };
</script>
