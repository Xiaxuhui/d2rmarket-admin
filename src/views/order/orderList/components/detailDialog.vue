<template>
  <BasicModal
    v-bind="$attrs"
    v-model:open="open"
    @register="register"
    :title="'Chat'"
    :showCancelBtn="false"
    @ok="confirm"
  >
    <Table :columns="columns" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';

  const loading = ref(true);
  const open = ref(false);

  const [register, { setModalProps }] = useModalInner(async (data) => {
    console.log(data);
    setModalProps({ width: 800 });
    loading.value = true;
  });

  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ];

  const confirm = () => {
    open.value = false;
  };
</script>
