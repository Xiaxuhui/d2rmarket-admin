<template>
  <BasicModal v-bind="$attrs" @register="register" title="下级分销商" @open-change="handleShow">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'fe:edit',
                onClick() {
                  editSalesman(record.id);
                },
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick() {
                  deleteSalesman(record.id);
                },
              },
              {
                label: '下级',
                icon: 'carbon:sales-ops',
                ifShow: !!record.num,
                onClick() {
                  viewSalesman(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <template #footer></template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch, reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { TableAction } from '@/components/Table';
  import { Table } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getBasicColumns } from '../tableData';

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 10,
    },
    modalData: [],
  });

  const columns = getBasicColumns() as ColumnType[];

  const [register, { setModalProps, redoModalHeight }] = useModalInner((data) => {
    console.log('data', data);
    setModalProps({ width: 1000 });
  });

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );

  function handleShow(open: boolean) {
    if (open) {
      state.loading = true;
      setModalProps({ loading: true });
      setTimeout(() => {
        lines.value = Math.round(Math.random() * 30 + 5);
        state.loading = false;
        setModalProps({ loading: false });
      }, 3000);
    }
  }

  const editSalesman = (id) => {
    console.log(id);
  };

  const deleteSalesman = (id) => {
    console.log(id);
  };

  const viewSalesman = (id) => {
    console.log(id);
  };
</script>
