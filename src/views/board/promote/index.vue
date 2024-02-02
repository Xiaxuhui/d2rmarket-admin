<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="exportCsv">导出数据</a-button>
      </template></BasicTable
    >
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { allList } from '@/api/board';
  import { exportExcel } from '@/utils/exportCsv';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const state = reactive<{
    selectedRowKeys: any;
    reject: string;
    pagination: Record<string, any>;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    pagination: { pageSize: 20 },
    reject: '',
  });

  const onSelectChange = (ids) => {
    state.selectedRowKeys = ids;
  };
  const [registerTable, methods] = useTable({
    title: '投放数据',
    api: (params) => {
      const { startTime, endTime } = params;
      const param: Record<string, any> = {};
      if (startTime && endTime) {
        param.startTime = new Date(startTime).getTime();
        param.endTime = new Date(endTime).getTime();
      }
      return allList({ ...params, ...param });
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    rowSelection: {
      type: 'checkbox',
      onChange: onSelectChange,
    },
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20, pageSizeOptions: ['20'] },
  });

  const exportCsv = () => {
    exportExcel(methods.getDataSource(), '投放数据', getBasicColumns());
  };
</script>
