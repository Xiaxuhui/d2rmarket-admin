<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { promote } from '@/api/board';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const [registerTable] = useTable({
    title: '订单数据',
    api: promote,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20 },
  });
</script>
