<template>
  <div>
    <BasicTable class="m-4" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openModal"> 添加 </a-button>
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
    <Modal @register="register" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getDiversityColumns } from './tableData';
  import { useRoute } from 'vue-router';
  import * as api from '@/api/sys/series';
  import { useModal } from '@/components/Modal';
  import Modal from './uploadSerie.vue';

  const { id } = useRoute().query;
  const [register, { openModal }] = useModal();

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
