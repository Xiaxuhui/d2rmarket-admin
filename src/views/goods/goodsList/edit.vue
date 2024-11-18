<template>
  <div class="m-4 bg-white">
    <BasicForm
      class="invest_form"
      :disabled="!!goodsId && !isEdit"
      @register="register"
      @submit="handleSubmit"
    >
      <template #localSearch="{ model, field }">
        <AffixField
          v-model="model[field]"
          :selections="currentSelections"
          :columns="affixColumn"
          :disabled="!!goodsId && !isEdit"
        />
      </template>
      <template #localRequire="{ model, field }">
        <uniteTable
          :columns="requireColumn"
          :data-source="requireDateSource"
          v-model="model[field]"
          :disabled="!!goodsId && !isEdit"
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
  import { useRouter, useRoute } from 'vue-router';
  import { QUALITY_SELECTION, ROLE_SELECTION } from '@/contants';
  import ImgSelector from './components/imgSelector.vue';
  import FieldTable from './components/fieldTable.vue';
  import uniteTable from './components/uniteTable.vue';
  import AffixField from './components/affixField.vue';
  import { locationTags } from '@/api/settings';
  import { addProduct, productData, updateProduct } from '@/api/goods';
  import { useGoodsStore } from '@/store/modules/goods';

  const route = useRoute();
  const goodsId = route.query.id;
  const isEdit = Boolean(goodsId && route.query.type === 'edit');

  enum REQUIRE_TYPE {
    STRENGTH,
    LEVEL,
  }
  interface IPriceData {
    name: string;
    id: number;
    key?: number;
    [key: string]: any;
  }

  const goods = useGoodsStore();

  const currentImgList = ref([]);

  const currentSelections = ref([]);

  const currentType = ref('');

  const pendingData = ref<any>(null);

  const priceDataSource = ref<IPriceData[]>([]);

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
        getPopupContainer(trigger) {
          return trigger.parentNode;
        },
      },
    },
    {
      field: 'img',
      component: 'Input',
      required: true,
      label: 'Image:',
      render({ model, field }) {
        return <ImgSelector vModel={model[field]} imgList={currentImgList.value} />;
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
        getPopupContainer(trigger) {
          return trigger.parentNode;
        },
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
      defaultValue: undefined,
      componentProps: {
        options: ROLE_SELECTION,
        getPopupContainer(trigger) {
          return trigger.parentNode;
        },
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
      componentProps: {},
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
      render({ model, field }, { disabled }) {
        return (
          <FieldTable
            columns={priceColumns}
            vModel={model[field]}
            dataSource={priceDataSource.value}
            disabled={disabled}
          />
        );
      },
      colProps: {
        span: 8,
      },
    },
  ]);

  const { back } = useRouter();

  // watch(currentType, (val, oldVal) => {
  //   console.log('val, oldVal', val, oldVal);
  //   if (!val && oldVal) {
  //     currentSelections.value = [];
  //     currentImgList.value = [];
  //   }
  // });

  const [register, { updateSchema, setFieldsValue }] = useForm({
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
    showSubmitButton: Boolean(!goodsId || isEdit),
  });

  const formatResponse = (res) => {
    const { img, ptype, attrs, name, type, role, quality, required, sundry, prices } = res;
    const [strength, level] = required.split(',');

    return {
      name,
      img,
      channelName: [ptype, type],
      role: role || undefined,
      specific: role ? true : false,
      quality,
      required: {
        [REQUIRE_TYPE.STRENGTH]: strength,
        [REQUIRE_TYPE.LEVEL]: level,
      },
      sundry: !!sundry,
      affix: attrs.reduce((prev, nxt) => {
        return {
          ...prev,
          [nxt.aid]: nxt.value,
        };
      }, {}),
      price: (prices || []).map((item) => {
        return {
          price: item.price,
          inventory: item.stock,
        };
      }),
    };
  };

  const initData = async () => {
    goodsId &&
      productData({ id: goodsId }).then((res) => {
        const { affix, channelName, img, ...rest } = formatResponse(res);
        console.log({ affix, channelName, img, ...rest });

        setFieldsValue(rest);
        pendingData.value = {
          affix,
          channelName,
          img,
        };
        if (!goods.loading && priceDataSource.value.length) {
          initPendingData(pendingData.value);
        }
      });
  };

  const initPendingData = (pendingData) => {
    const { channelName } = pendingData;
    const [ptype, type] = channelName;
    for (let item of goods.typeOption) {
      if (+ptype === item.value && item.children) {
        for (let child of item.children) {
          if (+type === child.value) {
            currentType.value = channelName.join('');
            currentImgList.value = child.imgList;
            currentSelections.value = child.affixList;
          }
        }
      }
    }
    setFieldsValue(pendingData);
  };

  watch(priceDataSource, (newPriceData) => {
    if (goodsId && pendingData.value && !goods.loading && newPriceData.length) {
      initPendingData(pendingData.value);
    }
  });

  watch(
    () => goods.loading,
    (val) => {
      if (goodsId && pendingData.value && !val && priceDataSource.value.length) {
        initPendingData(pendingData.value);
      }
    },
  );

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
              currentType.value = `${opt[0].value}${opt[1].value}`;
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
    initData();
  });

  const formatValues = (values: any) => {
    const {
      affix = {},
      channelName,
      img,
      name,
      price,
      quality,
      required = {},
      role,
      sundry,
    } = values;
    const [, type] = channelName || [];
    return {
      img,
      name,
      quality,
      type,
      role,
      sundry: sundry ? 1 : 0,
      attrs: Object.entries(affix).map(([key, item]) => {
        return {
          aid: key,
          value: item,
        };
      }),
      required: Object.values(required).join(',') || '0,0',
      prices: priceDataSource.value.map((item, index) => {
        return {
          season: item.id,
          price: price[index].price || 0,
          stock: price[index].inventory || 0,
        };
      }),
    };
  };

  async function handleSubmit(values: any) {
    const params = formatValues(values);

    if (goodsId) {
      updateProduct({ ...params, id: goodsId }).then(() => {
        back();
      });
    } else {
      addProduct(params).then(() => {
        back();
      });
    }
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
