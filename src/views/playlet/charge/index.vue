<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="add"> 添加方案 </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: '编辑',
              onClick() {
                update(record.id);
              },
            },
            {
              label: '删除',
              onClick() {
                del(record.id);
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
  import { PageEnum } from '@/enums/pageEnum';
  import { chargeList, delCharge } from '@/api/playlet/charge';
  import { useGo } from '@/hooks/web/usePage';
  import { reactive } from 'vue';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const go = useGo();
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
  const [registerTable, methods] = useTable({
    title: '充值方案',
    api: chargeList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
    },
    rowSelection: {
      type: 'checkbox',
      onChange: onSelectChange,
    },
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20 },
  });
  const update = (id: string) => {
    go({
      path: PageEnum.ADD_CHARGE,
      query: {
        id,
      },
    });
  };
  const del = (id: string) => {
    delCharge({ priceRateId: id }).then(() => {
      methods.reload();
    });
  };
  const add = () => {
    go({
      path: PageEnum.ADD_CHARGE,
    });
  };
</script>
