<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="addWithdraw"> 发起提现 </a-button>
      <a-button type="primary" @click="confirmListing"> 批量确认 </a-button>
      <a-button type="primary" @click="rejectList"> 批量驳回 </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: '确认',
              onClick() {
                confirm(record.id);
              },
            },
            {
              label: '驳回',
              onClick() {
                reject(record.id);
              },
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { reactive } from 'vue';
  import { getBasicColumns, getBasicData, getWithDrawFormConfig } from './tableData';

  const state = reactive<{
    selectedRowKeys: any;
    pagination: Record<string, any>;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    pagination: { pageSize: 20 },
  });
  const onSelectChange = (ids) => {
    console.log(ids);
    state.selectedRowKeys = ids;
  };
  const [registerTable] = useTable({
    title: '提现管理',
    api: getBasicData,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
      onChange: onSelectChange,
    },
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20 },
  });
  const confirm = (id: string) => {
    console.log(id);
  };
  const reject = (id: string) => {
    console.log(id);
  };
  const addWithdraw = () => {};
  const confirmListing = () => {};
  const rejectList = () => {};
</script>
