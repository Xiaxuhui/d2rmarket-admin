<template>
  <div>
    <Row>
      <a-button>编辑</a-button>
      <a-button>取消</a-button>
      <a-button>确认</a-button>
    </Row>
    <Table :columns="columns" :dataSource="dataSource">
      <template #bodyCell="{ column, text, record }">
        <template v-if="editProps.includes(column.dataIndex || '')">
          <div>
            <a-input
              v-if="state.editableData[record.key]"
              v-model:value="state.editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'fe:edit',
                onClick() {},
              },
              {
                label: '取消',
                icon: 'ic:outline-delete-outline',
                onClick() {},
              },
              {
                label: '保存',
                icon: 'carbon:sales-ops',
                onClick() {},
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <a-button @click="actionOptions.action">{{ actionOptions.text }}</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { Table, Row } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { reactive } from 'vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { DataIndex } from 'ant-design-vue/lib/vc-table/interface';

  defineProps({
    api: {
      type: String,
      default: '',
    },
    actionOptions: {
      type: Object as PropType<{
        text: string;
        action(): void;
      }>,
      default: () => ({}),
    },
    dataSource: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    editProps: {
      type: Array as PropType<DataIndex[]>,
      default: () => [],
    },
  });

  const state = reactive({
    editableData: {},
  });
</script>
