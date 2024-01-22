<template>
  <div class="p-4">
    <BasicTable
      @register="register"
      title="标签管理"
      :columns="columns"
      :dataSource="data"
      :loading="state.loading"
      :pagination="state.pagination"
      :show-selection-bar="false"
      :before-edit-submit="beforeEditSubmit"
    >
      <template #toolbar>
        <a-button type="primary" @click="addTag">添加</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: () => {
                    deleteTag(record);
                  },
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
  import { reactive, toRefs } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { getBasicColumns } from './tableData';
  import { useLabelStore } from '../../../store/modules/label';
  import { LabelModel } from '../../../api/sys/model/labelModel';

  const [register, { insertTableDataRecord, deleteTableDataRecord, findTableDataRecord }] =
    useTable({
      showIndexColumn: false,
    });
  const labelStore = useLabelStore();
  const { list, loading, adding } = toRefs(labelStore);

  const state = reactive({
    loading: loading.value || adding.value,
    pagination: {
      pageSize: 20,
    },
    selectedRowKeys: [],
  });

  const columns = getBasicColumns();
  const data = list;

  const addTag = () => {
    const newTagName = '新标签名称';
    labelStore.addLabel(newTagName).then(() => {
      insertTableDataRecord({ name: newTagName, w: 1 }, 0);
    });
  };

  const beforeEditSubmit: BeforeEditSubmit = async ({ record }) => {
    const row = findTableDataRecord(record.key) as LabelModel;
    try {
      await labelStore.updatelabel({ id: row.id, name: row.name, w: row.w });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  };

  const deleteTag = ({ id, key }: Recordable) => {
    labelStore.removeLabel(id).then(() => {
      deleteTableDataRecord(key);
    });
  };
</script>
