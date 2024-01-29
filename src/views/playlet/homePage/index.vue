<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="add"> 添加 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                popConfirm: {
                  title: '确认删除？',
                  confirm: () => {
                    deleteItem(record.id);
                  },
                },
              },
              {
                label: '编辑',
                onClick() {
                  edit(record.id);
                },
              },
              {
                label: record.state === 1 ? '关闭' : '开启',
                onClick() {
                  open(record);
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
  import { list, update, del } from '@/api/playlet/homePage';
  import { useGo } from '@/hooks/web/usePage';
  import { getBasicColumns } from './tableData';
  import { PageEnum } from '@/enums/pageEnum';

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
  const [registerTable, methods] = useTable({
    title: '首页管理',
    api: list,
    searchInfo: {
      type: 1,
    },
    columns: getBasicColumns(),
    useSearchForm: true,
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
  const deleteItem = (id: string) => {
    del({ id }).then(() => {
      methods.reload();
    });
  };
  const go = useGo();
  const add = () => {
    go({
      path: PageEnum.ADD_HOMEPAGE,
    });
  };
  const edit = (id) => {
    go({
      path: PageEnum.ADD_HOMEPAGE,
      query: {
        id,
      },
    });
  };
  const open = (item) => {
    update(Object.assign(item, { state: item.state === 1 ? 2 : 1 })).then(() => {
      methods.reload();
    });
  };
</script>
