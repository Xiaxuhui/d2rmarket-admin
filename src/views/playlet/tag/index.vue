<template>
  <div class="p-4">
    <BasicTable
      title="标签管理"
      :columns="columns"
      :dataSource="data"
      :loading="state.loading"
      :pagination="state.pagination"
      :row-selection="{
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-button type="primary" @click="addTag">添加</a-button>
        <a-button type="primary" danger @click="batchDelete">批量删除</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'fe:edit',
                onClick() {
                  editTag(record.id);
                },
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick() {
                  deleteTag(record.id);
                },
              },
              {
                label: '相关的剧',
                icon: 'fluent-mdl2:chart-series',
                onClick() {},
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 20,
    },
    selectedRowKeys: [],
  });

  const columns = getBasicColumns();
  const data = getBasicData();

  const onSelectChange = (ids) => {
    console.log(ids);
    state.selectedRowKeys = ids;
  };

  const addTag = () => {};

  const editTag = (id) => {
    console.log(id);
  };
  const deleteTag = (id) => {
    console.log(id);
  };

  const batchDelete = () => {
    console.log('selectedRowKeys', state.selectedRowKeys);
  };
</script>
