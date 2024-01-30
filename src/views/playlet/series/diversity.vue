<template>
  <div>
    <BasicTable class="m-4" @register="registerTable" @edit-end="change">
      <template #toolbar>
        <DiversityUpload @change="onUploaded" />
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
                    deleteSeries(record.id);
                  },
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
  import { updateRecommend } from '@/api/sys/blog';

  const { id } = useRoute().query as { id: string };

  const [registerTable, { setProps, reload }] = useTable({
    api: async () => {
      const data = await api.getDetail(id);
      setProps({ title: data.title });
      return data.subBlogs;
    },
    columns: getDiversityColumns(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    pagination: { pageSize: 20 },
  });

  const deleteSeries = (id) => {
    api.deleteSeries(id).then(() => {
      reload();
    });
  };

  const change = (item) => {
    if (item.key === 'f') {
      updateRecommend({ blogId: item.record.id, state: Number(item.value) });
      return;
    }
    const data = {
      blogId: item.record.id,
      price: item.record.price,
      state: item.record.state,
      title: item.record.title,
    };
    data[item.key] = item.value;
    api.updateSeriesList(data).then(() => {
      reload();
    });
  };

  const onUploaded = (mediaId: string, title: string) => {
    api
      .createSerie({
        fileId: mediaId,
        title: title,
        parentBlog: id,
        data: '',
        type: 0,
        state: 1,
        price: 0,
        weight: 0,
      })
      .then(() => reload());
  };
</script>
