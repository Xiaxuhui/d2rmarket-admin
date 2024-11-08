<template>
  <div class="m-4 bg-white">
    <BasicForm class="invest_form" @register="register" @submit="handleSubmit">
      <template #localSearch="{ model, field }">
        <AffixField v-model="model[field]" :selections="currentSelections" :columns="affixColumn" />
      </template>
      <template #localRequire="{ model, field }">
        <uniteTable
          :columns="requireColumn"
          :data-source="requireDateSource"
          v-model="model[field]"
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
  import { computed, onMounted, ref, unref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { QUALITY_SELECTION } from '@/contants';
  import ImgSelector from './components/imgSelector.vue';
  import FieldTable from './components/fieldTable.vue';
  import uniteTable from './components/uniteTable.vue';
  import AffixField from './components/affixField.vue';
  import { locationTags } from '@/api/settings';
  import { useGoodsStore } from '@/store/modules/goods';

  // const route = useRoute();
  // const goodsId = route.query.id;

  enum REQUIRE_TYPE {
    STRENGTH,
    LEVEL,
  }

  const goods = useGoodsStore();

  const currentImgList = ref([]);

  const currentSelections = ref([]);

  const currentType = ref('');

  const priceDataSource = ref<{ name: string; id: number; key?: number; [key: string]: any }[]>([]);

  const priceColumns = [
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
  ];

  const affixColumn = [
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
  ];

  const requireColumn = [
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
  ];

  const requireDateSource = [
    {
      name: 'Strength',
      id: REQUIRE_TYPE.STRENGTH,
    },
    {
      name: 'Level',
      id: REQUIRE_TYPE.LEVEL,
    },
  ];

  const schemas = computed<FormSchema[]>(() => [
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
      required: true,
      label: 'Name:',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'channelName',
      component: 'Cascader',
      label: 'Type:',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: goods.typeOption,
      },
    },
    {
      field: 'img',
      component: 'Input',
      required: true,
      label: 'Image:',
      render({ model, field }) {
        return (
          <ImgSelector
            vModel={model[field]}
            imgList={currentImgList.value}
            type={currentType.value}
          />
        );
      },
    },
    {
      field: 'quality',
      component: 'Select',
      label: 'Quality:',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: QUALITY_SELECTION,
      },
    },
    {
      field: 'sundry',
      component: 'Switch',
      label: 'Sundry goods',
      defaultValue: false,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'specific',
      component: 'Switch',
      label: 'Role specific',
      defaultValue: false,
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
      ifShow: ({ values }) => {
        return values.specific;
      },
    },
    {
      field: 'affix',
      label: 'Affix:',
      slot: 'localSearch',
      required: true,
      colProps: {
        span: 8,
      },
      defaultValue: [],
    },
    {
      field: 'required',
      label: 'Required:',
      slot: 'localRequire',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'price',
      component: 'Input',
      label: 'Price/Inventory:',
      required: true,
      defaultValue: Array.from({ length: 10 }, () => ({})),
      render({ model, field }) {
        return (
          <FieldTable
            columns={priceColumns}
            vModel={model[field]}
            dataSource={priceDataSource.value}
          />
        );
      },
      colProps: {
        span: 8,
      },
    },
  ]);

  const { back } = useRouter();

  watch(currentType, (val) => {
    if (!val) {
      currentSelections.value = [];
      currentImgList.value = [];
    }
  });

  const [register, { updateSchema }] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas: unref(schemas),
    actionColOptions: {
      span: 10,
    },
    submitButtonOptions: {
      text: 'Submit',
    },
    showResetButton: false,
    showSubmitButton: true,
  });

  onMounted(async () => {
    goods.getBaseList().then(() => {
      updateSchema({
        field: 'channelName',
        component: 'Cascader',
        label: 'Type:',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: goods.typeOption,
          onChange: (_, opt) => {
            if (opt && opt[1]) {
              currentType.value = opt.join('');
              currentImgList.value = opt[1].imgList;
              currentSelections.value = opt[1].affixList;
            } else {
              currentType.value = '';
            }
          },
        },
      });
    });
    locationTags().then((res) => {
      priceDataSource.value = res;
    });
  });

  const formatValues = (values: any) => {
    return values;
  };

  async function handleSubmit(values: any) {
    const params = formatValues(values);
    console.log('params', params);
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
