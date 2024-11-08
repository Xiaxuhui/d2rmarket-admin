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
  ];

  const confirm = () => {
    dataSource.value = [];
    open.value = false;
  };
</script>
