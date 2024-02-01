<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary">导出数据</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '详情',
                onClick() {
                  confirm(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UserDetail @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { reactive } from 'vue';
  import { getUserList } from '@/api/board';
  import UserDetail from './detail.vue';
  import { useModal } from '@/components/Modal';
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

  const [registerModal, { openModal }] = useModal();

  const onSelectChange = (ids) => {
    console.log(ids);
    state.selectedRowKeys = ids;
  };

  // const getUserDataList = (params) => {
  //   const { startTime, endTime } = params;

  // }

  const [registerTable] = useTable({
    title: '用户数据',
    api: (params) => {
      const { startTime, endTime } = params;
      const param: Record<string, any> = {};
      if (startTime && endTime) {
        param.startTime = new Date(startTime).getTime();
        param.endTime = new Date(endTime).getTime();
      }
      return getUserList({ ...params, ...param });
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
    pagination: { pageSize: 20 },
  });
  const confirm = (id: string) => {
    openModal(true, { id });
  };
</script>
