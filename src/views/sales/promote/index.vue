<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="addPromote"> 添加 </a-button>
      <a-button type="primary" @click="stopListing"> 批量停用 </a-button>
    </template>
    <template #bodyCell="{ column }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: '确认',
              onClick() {
                confirm();
              },
            },
            {
              label: '驳回',
              onClick() {
                reject();
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
  import { useGo } from '@/hooks/web/usePage';
  import { reactive } from 'vue';
  import { getBasicColumns, getBasicData, getPromoteFormConfig } from './tableData';
  import { PageEnum } from '@/enums/pageEnum';

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
    title: '投放管理',
    api: getBasicData,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getPromoteFormConfig(),
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
  const go = useGo();
  const confirm = () => {};
  const reject = () => {};
  const addPromote = () => {
    go({
      path: PageEnum.ADD_PROMOTE,
      query: {
        id: 1,
      },
    });
  };
  const stopListing = () => {};
</script>
