<template>
  <BasicModal v-bind="$attrs" @register="register" title="相关短剧">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
    />
    <template #footer></template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch, reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getSeriesColumns } from '../tableData';

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 20,
      pageNum: 1,
    },
    modalData: [],
  });

  const columns = getSeriesColumns() as ColumnType[];

  const [register, { setModalProps, redoModalHeight }] = useModalInner((data) => {
    console.log('data', data);
    setModalProps({ width: 800 });
  });

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );
</script>
