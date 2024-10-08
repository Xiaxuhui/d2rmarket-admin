<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
      rowKey="goodsId"
      :loading="state.loading"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: selectRows,
      }"
    />
    <template #footer>
      <a-button type="primary" @click="confirmSelectRowKeys">确认</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import type { PropType } from 'vue';

  const props = defineProps({
    api: {
      type: Function as PropType<PromiseFn>,
      default: () => Promise.resolve(),
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    selectedRows: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['change']);

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
      onChange(page, pageSize) {
        state.loading = true;
        state.pagination.current = page;
        state.pagination.pageSize = pageSize;
        getPageData();
      },
    },
    dataCacheMap: new Map(), // 已选项目 record 缓存
    modalData: [] as any,
    selectedRowKeys: [] as any, // 选择项目 goodsId
    selectedRows: [] as any, // 选择项目 record
  });

  const getPageData = async () => {
    return props
      .api({ pageNum: state.pagination.current, pageSize: state.pagination.pageSize })
      .then((res) => {
        state.loading = false;
        state.modalData = res.list;
        state.pagination.total = res.totalRecords;
      });
  };

  const [register, { setModalProps, redoModalHeight, closeModal }] = useModalInner(() => {
    setModalProps({ width: 800 });
    state.loading = true;
    getPageData();
  });

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );

  watch(
    () => props.selectedRows,
    () => {
      state.selectedRowKeys = [];
      for (let item of props.selectedRows) {
        state.selectedRowKeys.push(item.goodsId);
        state.dataCacheMap.set(item.goodsId, item);
      }
    },
  );

  const selectRows = (rowKeys, rows) => {
    state.selectedRowKeys = rowKeys;
    state.selectedRows = rows;
  };
  const confirmSelectRowKeys = async () => {
    emit(
      'change',
      state.selectedRows.map((row) => {
        if (state.dataCacheMap.has(row.goodsId)) {
          return state.dataCacheMap.get(row.goodsId);
        }
      }),
    );
    closeModal();
  };
</script>
