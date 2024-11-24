<template>
  <BasicModal
    v-bind="$attrs"
    v-model:open="open"
    @register="register"
    :title="'Details'"
    :showCancelBtn="false"
    @ok="confirm"
  >
    <Table :columns="columns" :data-source="dataSource" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';
  import { numberFixed } from '@/utils';
  import BigNumber from 'bignumber.js';

  const loading = ref(true);
  const open = ref(false);
  const dataSource = ref([]);

  const [register, { setModalProps }] = useModalInner(async (data) => {
    dataSource.value = data;
    setModalProps({ width: 800 });
    loading.value = true;
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Num',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      customRender({ value }) {
        return numberFixed(+value / 100 || 0, 2);
      },
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      customRender({ value }) {
        return value > 0 ? `${value}%` : null;
      },
    },
    {
      title: 'Actual price',
      dataIndex: 'price',
      key: 'price',
      customRender({ record }) {
        const { discount, price } = record;
        if (discount > 0) {
          return BigNumber(discount).div(10000).multipliedBy(price).valueOf();
        }
        return numberFixed(+price / 100 || 0, 2);
      },
    },
  ];

  const confirm = () => {
    dataSource.value = [];
    open.value = false;
  };
</script>
