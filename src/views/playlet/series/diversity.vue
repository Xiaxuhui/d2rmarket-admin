<template>
  <div>
    <BasicTable class="m-4" @register="registerTable">
      <template #toolbar>
        <DiversityUpload />
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
                  deleteSeries(record.id);
                },
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick() {
                  deleteSeries(record.id);
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
  import { getDiversityColumns } from './tableData';
  import { useRoute } from 'vue-router';
  import * as api from '@/api/sys/series';
  import { DiversityUpload } from '@/components/Upload';

  const { id } = useRoute().query;

  const [registerTable, { setProps }] = useTable({
    api: async () => {
      const data = await api.getDetail(id as string);
      setProps({ title: data.data.data.title });
      return data.data.data.subBlogs;
    },
    columns: getDiversityColumns(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    pagination: { pageSize: 20 },
  });

  const deleteSeries = (id) => {
    console.log('id', id);
  };
</script>
