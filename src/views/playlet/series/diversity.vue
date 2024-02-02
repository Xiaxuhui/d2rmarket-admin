<template>
  <div>
    <BasicTable class="m-4" @register="registerTable" @edit-end="change">
      <template #toolbar>
        <DiversityUpload @change="onUploaded" />
        <button @click="add">模拟添加</button>
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
              {
                label: '向上移',
                icon: 'ant-design:arrow-up-outlined',
                onClick() {
                  up(1, record);
                },
              },
              {
                label: '向下移',
                icon: 'ant-design:arrow-down-outlined',
                onClick() {
                  up(0, record);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <FormDialog @register="registerModal" @submit="submit" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getDiversityColumns } from './tableData';
  import { useRoute } from 'vue-router';
  import * as api from '@/api/sys/series';
  import { DiversityUpload } from '@/components/Upload';
  import FormDialog from './components/uploadForm.vue';
  import { updateRecommend } from '@/api/sys/blog';
  import { useModal } from '@/components/Modal';
  import { updateCategory } from '@/api/sys/series';

  const { id } = useRoute().query as { id: string };

  let detailTitle = '';
  let metaId = '';

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
    if (item.key === 'recommendState') {
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

  const [registerModal, { openModal }] = useModal();

  const onUploaded = (mediaId: string, title: string) => {
    detailTitle = title;
    metaId = mediaId;
    openModal(true, { mediaId, title });
  };

  const submit = (value) => {
    if (value.price) {
      value.price = Number(value.price) * 100;
    }
    api
      .createSerie(
        Object.assign(
          {
            fileId: metaId,
            title: detailTitle,
            parentBlog: id,
            type: 0,
            state: 1,
          },
          value,
        ),
      )
      .then(() => reload());
  };

  const up = (type: number, record) => {
    updateCategory({ flag: type, blogId: record.id }).then(() => {
      reload();
    });
  };

  const add = () => {
    openModal(true, { metaId: 1, title: 'title' });
    // api
    //   .createSerie({
    //     fileId: 104801,
    //     title: `[${new Date()}]demo.mp4`,
    //     parentBlog: id,
    //     data: '',
    //     type: 0,
    //     state: 1,
    //     price: 0,
    //     weight: 0,
    //   })
    //   .then(() => reload());
  };
</script>
