<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="exportCsv">导出数据</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { allList } from '@/api/board';
  import { exportExcel } from '@/utils/exportCsv';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const [registerTable, methods] = useTable({
    title: '平台统计',
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
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20 },
  });

  const exportCsv = () => {
    exportExcel(methods.getDataSource(), '平台统计', getBasicColumns());
  };
</script>
