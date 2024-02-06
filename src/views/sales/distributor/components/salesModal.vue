<template>
  <BasicModal v-bind="$attrs" @register="register" title="下级分销商">
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
                ifShow: canEditSales,
                onClick() {
                  editSalesman(record.id);
                },
              },
              {
                label: '下级',
                icon: 'carbon:sales-ops',
                onClick() {
                  viewSalesman(record.id);
                },
              },
              {
                label: '添加下级',
                icon: 'fluent:people-add-16-regular',
                ifShow: canAddSales,
                onClick() {
                  addNext(record.id);
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
  import { distributorChildList } from '@/api/sys/distributor';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getBasicColumns } from '../tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';

  const [canEditSales, canAddSales] = useAuthorization([
    PERMISSION_ENUM.SALES_EDIT,
    PERMISSION_ENUM.SALES_ADD,
  ]);

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 10,
      pageNum: 1,
    },
    modalData: [],
  });

  const columns = getBasicColumns() as ColumnType[];

  const [register, { setModalProps, redoModalHeight }] = useModalInner((data) => {
    setModalProps({ width: 1200 });
    distributorChildList(Object.assign({ channelId: data.id }, state.pagination)).then((res) => {
      state.modalData = res.list;
    });
  });
  const go = useGo();

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );

  const editSalesman = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const viewSalesman = (id) => {
    distributorChildList({ channelId: id, pageNum: 1, pageSize: 10 }).then((res) => {
      state.pagination = { pageNum: 1, pageSize: 10 };
      state.modalData = res.list;
    });
  };

  const addNext = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
        type: 'add',
      },
    });
  };
</script>
