<template>
  <BasicTable class="m-4" @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="setSeries()"> 添加 </a-button>
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
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getDiversityColumns, getBasicData } from './tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useRoute } from 'vue-router';

  const go = useGo();
  const { id } = useRoute().query;
  console.log(id);

  const [registerTable] = useTable({
    api: getBasicData,
    columns: getDiversityColumns(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    pagination: { pageSize: 20 },
  });

  const setSeries = (id?: string) => {
    go({
      path: PageEnum.SET_SERIES,
      query: {
        id,
      },
    });
  };

  const deleteSeries = (id) => {
    console.log('id', id);
  };
</script>
