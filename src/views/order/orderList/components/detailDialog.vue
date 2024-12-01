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
  import { useTagsStore } from '@/store/modules/tags';

  const loading = ref(true);
  const open = ref(false);
  const dataSource = ref([]);

  const tags = useTagsStore();

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
      title: 'Id',
      dataIndex: 'pid',
      key: 'pid',
    },
    {
      title: 'Location',
      dataIndex: 'sid',
      key: 'sid',
      customRender({ value }) {
        return tags.tags[value] || value;
      },
    },
    {
      title: 'Num',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
      customRender({ value }) {
        return numberFixed(+value / 100 || 0, 2);
      },
    },
    {
      title: 'Discount Price',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      customRender({ value }) {
        return numberFixed(+value / 100 || 0, 2);
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      customRender({ record }) {
        const { discountPrice, num } = record;
        return BigNumber(discountPrice).div(100).multipliedBy(num).valueOf();
      },
    },
  ];

  const confirm = () => {
    dataSource.value = [];
    open.value = false;
  };
</script>
