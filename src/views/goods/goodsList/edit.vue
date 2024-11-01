<template>
  <div class="m-4 bg-white">
    <BasicForm class="invest_form" @register="register" @submit="handleSubmit">
      <template #localSearch="{ model, field }">
        <AffixField
          v-model="model[field]"
          :columns="[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              width: 100,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              key: 'value',
              width: 100,
            },
            {
              title: 'Opt',
              dataIndex: 'opt',
              key: 'opt',
              width: 100,
            },
          ]"
        />
      </template>
      <template #resetBefore>
        <a-button class="mr-2" @click="back">Back</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import message from '@/views/form-design/utils/message';
  import { QUALITY_SELECTION } from '@/contants';
  import ImgSelector from './components/imgSelector.vue';
  import FieldTable from './components/fieldTable.vue';
  import AffixField from './components/affixField.vue';

  // const route = useRoute();
  // const goodsId = route.query.id;

  const schemas: FormSchema[] = reactive([
    {
      field: 'divider-basic',
      component: 'Divider',
      label: 'GOODS SETTING',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: 'Name:',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'channelName',
      component: 'Cascader',
      label: 'Type:',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
              },
            ],
          },
        ],
      },
    },
    {
      field: 'img',
      component: 'Input',
      label: 'Image:',
      render({ model, field }) {
        return (
          <ImgSelector
            vModel={model[field]}
            imgList={[
              { id: 144422, url: '/assets/144422.png' },
              { id: 145431, url: '/assets/145431.png' },
            ]}
          />
        );
      },
    },
    {
      field: 'quality',
      component: 'Select',
      label: 'Quality:',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: QUALITY_SELECTION,
      },
    },
    {
      field: 'specific',
      component: 'Switch',
      label: 'Role specific',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'role',
      component: 'Select',
      label: 'Role:',
      componentProps: {
        options: [],
      },
      colProps: {
        span: 8,
      },
    },

    {
      field: 'affix',
      // component: 'Input',
      label: 'affix:',
      slot: 'localSearch',
      colProps: {
        span: 8,
      },
      defaultValue: '0',
      componentProps: {
        onOptionsChange() {},
      },
    },
    {
      field: 'required',
      component: 'Input',
      label: 'Required:',
      colProps: {
        span: 8,
      },
      render({ model, field }) {
        return (
          <FieldTable
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
              },
              {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: 100,
              },
            ]}
            vModel={model[field]}
          />
        );
      },
    },
    {
      field: 'price',
      component: 'Input',

      label: 'Price/Inventory:',
      render({ model, field }) {
        return (
          <FieldTable
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
              },
              {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: 100,
              },
              {
                title: 'Inventory',
                dataIndex: 'inventory',
                key: 'inventory',
                width: 100,
              },
            ]}
            vModel={model[field]}
          />
        );
      },
      colProps: {
        span: 8,
      },
    },
  ]);

  const { back } = useRouter();

  const [register] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 10,
    },
    submitButtonOptions: {
      text: 'Submit',
    },
    showResetButton: false,
    showSubmitButton: true,
  });

  onMounted(async () => {});

  async function handleSubmit(values: any) {
    const { min, max } = values;
    if (!Number.isInteger(Number(min)) || !Number.isInteger(Number(max))) {
      return message.error('回传范围必须是整数');
    }

    back();
  }
</script>
<style lang="less" scoped>
  :deep(.invest_form) .local_typeValue {
    width: 100px;
  }

  :deep(.invest_form) .invest_typeValue {
    width: 100px;
    border-radius: 6px;
  }

  :deep(.invest_form) .invest-from-item {
    border: 0;
  }
</style>
