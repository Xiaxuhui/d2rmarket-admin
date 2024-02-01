<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary">导出数据</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { order } from '@/api/board';
  import { useRoute } from 'vue-router';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const route = useRoute();

  const state = reactive<{
    selectedRowKeys: any;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
  });

  const onSelectChange = (ids) => {
    console.log(ids);
    state.selectedRowKeys = ids;
  };
  const [registerTable] = useTable({
    title: '订单查询',
    api: (params) => {
      const { startTime, endTime } = params;
      const param: Record<string, any> = {};
      if (startTime && endTime) {
        param.startTime = new Date(startTime).getTime();
        param.endTime = new Date(endTime).getTime();
      }
      return order({ ...params, ...param });
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(route.query),
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
    pagination: { pageSize: 20 },
  });
</script>
