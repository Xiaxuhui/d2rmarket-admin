<template>
  <BasicModal v-bind="$attrs" @register="register" title="用户详情">
    <div class="row">
      <div class="item"> 消费金额：<span>111</span> </div>
      <div class="item"> 订单金额：<span>111</span> </div>
    </div>
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
  import { distributorChildList } from '@/api/sys/distributor';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getBasicColumns } from './tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';

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

  const deleteSalesman = (id) => {
    console.log(id);
  };

  const viewSalesman = (id) => {
    console.log(id);
  };
</script>
<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .item + .item {
    margin-left: 20px;
  }

  .item span {
    color: #000;
    font-weight: bold;
  }
</style>
