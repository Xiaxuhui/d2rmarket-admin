<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            v-if="record.state === 1"
            stopButtonPropagation
            :actions="[
              {
                label: '确认',
                onClick() {
                  confirm(record.id);
                },
              },
              {
                label: '驳回',
                onClick() {
                  reject(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal @register="register" @click="submit" title="Modal Title" width="500px">
      <a-textarea v-model:value="state.reject" placeholder="请输入原因" :rows="4" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { reactive } from 'vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { list, update } from '@/api/withdraw';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  let withdrawId = '';
  const state = reactive<{
    selectedRowKeys: any;
    reject: string;
    pagination: Record<string, any>;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    pagination: { pageSize: 20 },
    reject: '',
  });
  const [register, { openModal: setModalProps }] = useModal();

  const onSelectChange = (ids) => {
    console.log(ids);
    state.selectedRowKeys = ids;
  };
  const [registerTable, methods] = useTable({
    title: '提现管理',
    api: list,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    rowSelection: {
      type: 'checkbox',
      onChange: onSelectChange,
    },
    showSelectionBar: true, // 显示多选状态栏
    pagination: { pageSize: 20 },
  });
  const confirm = (id: string) => {
    update({ withdrawalId: id, state: 2 }).then(() => {
      methods.reload();
    });
  };
  const submit = () => {
    if (!state.reject) return;
    update({ withdrawalId: withdrawId, state: 3, dealNotes: state.reject }).then(() => {
      setModalProps(false);
      methods.reload();
    });
  };
  const reject = (id: string) => {
    withdrawId = id;
    setModalProps(true);
  };
</script>
