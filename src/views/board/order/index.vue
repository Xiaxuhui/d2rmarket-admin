<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '详细列表',
                onClick() {
                  confirm(record);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { reactive } from 'vue';
  import { orderList } from '@/api/board';
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
    console.log(ids);
    state.selectedRowKeys = ids;
  };
  const [registerTable] = useTable({
    title: '订单统计',
    api: orderList,
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
    pagination: { pageSize: 20 },
  });
  const confirm = (item) => {
    console.log(item);
  };
</script>
