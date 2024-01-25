<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title" @open-change="handleShow">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
      rowKey="id"
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
  });

  const emit = defineEmits(['change']);

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 10,
    },
    modalData: [] as any,
    selectedRowKeys: [],
  });

  const [register, { setModalProps, redoModalHeight, closeModal }] = useModalInner(() => {
    setModalProps({ width: 800 });
    props.api().then((res) => {
      state.modalData = res;
    });
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
      }, 1000);
    }
  }

  const selectRows = (rowKeys) => {
    state.selectedRowKeys = rowKeys;
  };

  const confirmSelectRowKeys = () => {
    emit('change', state.selectedRowKeys);
    closeModal();
  };
</script>
