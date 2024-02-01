<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="setSeries()"> 添加 </a-button>
      <a-button type="primary" @click="batchListing"> 批量上架 </a-button>
      <a-button type="primary" @click="bathDelist"> 批量下架 </a-button>
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
                setSeries(record.id);
              },
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: () => {
                  deleteSeries(record.id);
                },
              },
            },
            {
              label: '分集管理',
              icon: 'mingcute:classify-2-fill',
              onClick() {
                go({
                  path: PageEnum.DIVERSITY,
                  query: {
                    id: record.id,
                  },
                });
              },
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useRoute } from 'vue-router';
  import * as api from '@/api/sys/series';

  const go = useGo();
  const { label } = useRoute().query;

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

  const [registerTable, { reload }] = useTable({
    title: '剧集管理',
    api: api.getSeriesList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig({ label: (label as string) || '' }),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    searchInfo: {
      tagId: label,
    },
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
      onChange: onSelectChange,
    },
    showSelectionBar: true,
    pagination: {
      pageSize: 20,
    },
  });

  const setSeries = (id?: string) => {
    go({
      path: PageEnum.SET_SERIES,
      query: {
        id,
      },
    });
  };

  const batchListing = () => {
    console.log('selectedRowKeys', state.selectedRowKeys);
  };

  const bathDelist = () => {
    console.log('selectedRowKeys', state.selectedRowKeys);
  };

  const deleteSeries = (id) => {
    api.deleteSeries(id).then(() => {
      reload();
    });
  };
</script>
