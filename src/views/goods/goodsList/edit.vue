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
          :model="model"
          @refresh="refreshAffixList"
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
        <a-button class="mr-2" @click="back">Back(返回)</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { computed, onMounted, ref, unref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import {
    QUALITY_SELECTION,
    ROLE_SELECTION,
    TAGS_OPTIONS,
    RUNE_WORDS_SELECTION,
    QUALITY_ENUM,
    ROLE_SKILL_SELECTION,
  } from '@/contants';
  import ImgSelector from './components/imgSelector.vue';
  import FieldTable from './components/fieldTable.vue';
  import uniteTable from './components/uniteTable.vue';
  import AffixField from './components/affixField.vue';
  import { locationTags } from '@/api/settings';
  import { addProduct, productData, updateProduct } from '@/api/goods';
  import { useGoodsStore } from '@/store/modules/goods';
  import { activityList } from '@/api/marketing';
  import { useTabs } from '@/hooks/web/useTabs';

  defineOptions({
    name: 'GoodsSetting',
  });

  const route = useRoute();
  const goodsId = route.query.id;
  const isEdit = Boolean(goodsId && route.query.type === 'edit');

  enum REQUIRE_TYPE {
    STRENGTH,
    LEVEL,
    DEXTERITY,
  }
  interface IPriceData {
    name: string;
    id: number;
    key?: number;
    [key: string]: any;
  }

  const goods = useGoodsStore();

  const { closeCurrent } = useTabs();

  const currentImgList = ref([]);

  const currentSelections = ref([]);

  const currentType = ref('');

  const pendingData = ref<any>(null);

  const priceDataSource = ref<IPriceData[]>([]);

  const discountLoaded = ref(false);

  const activityDiscount = ref<number>();

  const skillOptions = ref([]);

  const priceColumns = [
    {
      title: 'Name(名称)',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Price(价格)',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: 'Inventory(库存)',
      dataIndex: 'inventory',
      key: 'inventory',
      width: 100,
    },
  ];

  const affixColumn = [
    {
      title: 'Name(名称)',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Value(值)',
      dataIndex: 'value',
      key: 'value',
      width: 100,
    },
    {
      title: 'Opt(操作)',
      dataIndex: 'opt',
      key: 'opt',
      width: 100,
    },
  ];

  const requireColumn = [
    {
      title: 'Name(名称)',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Value(值)',
      dataIndex: 'value',
      key: 'value',
      width: 100,
    },
  ];

  const requireDateSource = [
    {
      name: 'Strength(力量)',
      id: REQUIRE_TYPE.STRENGTH,
    },
    {
      name: 'Level(等级)',
      id: REQUIRE_TYPE.LEVEL,
    },
    {
      name: 'Dexterity(敏捷)',
      id: REQUIRE_TYPE.DEXTERITY,
    },
  ];

  const schemas = computed<FormSchema[]>(() => [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: 'GOODS SETTING(商品设置)',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name',
      component: 'Input',
      required: true,
      label: 'Name(名称):',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'channelName',
      component: 'Cascader',
      label: 'Type(类型):',
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
      label: 'Image(图片):',
      render({ model, field }) {
        return <ImgSelector vModel={model[field]} imgList={currentImgList.value} />;
      },
    },
    {
      field: 'quality',
      component: 'Select',
      label: 'Quality(品质):',
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
      field: 's1',
      component: 'Select',
      label: 'RuneWords(符文之语):',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: RUNE_WORDS_SELECTION,
        getPopupContainer(trigger) {
          return trigger.parentNode;
        },
        showSearch: true,
        filterOption(input: string, option: any) {
          return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
      },
      ifShow: ({ values }) => {
        return values.quality === QUALITY_ENUM.Runewords;
      },
    },
    {
      field: 'sundry',
      component: 'Switch',
      label: 'Other(其他)',
      defaultValue: false,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'hot',
      component: 'Switch',
      label: 'Hot(热销)',
      defaultValue: false,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'specific',
      component: 'Switch',
      label: 'Role specific(角色专属)',
      defaultValue: false,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'role',
      component: 'Select',
      label: 'Role(角色):',
      defaultValue: undefined,
      componentProps({ formModel }) {
        return {
          options: ROLE_SELECTION,
          getPopupContainer(trigger) {
            return trigger.parentNode;
          },
          onChange(val) {
            skillOptions.value = ROLE_SKILL_SELECTION[val as number];
            if (!val) {
              formModel.s2 = undefined;
            }
            updateSchema({
              field: 's2',
              defaultValue: undefined,
              componentProps: {
                options: ROLE_SKILL_SELECTION[val as number],
              },
            });
          },
        };
      },
      colProps: {
        span: 8,
      },
      ifShow: ({ values }) => {
        return values.specific;
      },
    },
    {
      field: 's2',
      component: 'Select',
      label: 'Skill(技能):',
      defaultValue: undefined,
      componentProps: {
        options: skillOptions.value,
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
      field: 'discounts',
      component: 'ApiSelect',
      label: 'Activity(活动):',
      defaultValue: undefined,
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: activityList,
        params: {},
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
        getPopupContainer(trigger) {
          return trigger.parentNode;
        },

        onOptionsChange(options) {
          if (options.length > 0) {
            discountLoaded.value = true;
          }
        },
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'tags',
      component: 'CheckboxGroup',
      label: 'Tags(标签):',
      colProps: {
        span: 8,
      },
      defaultValue: [],
      componentProps: {
        options: TAGS_OPTIONS,
      },
    },
    {
      field: 'affix',
      label: 'Affix(词缀):',
      slot: 'localSearch',
      colProps: {
        span: 10,
      },
      componentProps: {},
      defaultValue: [],
    },
    {
      field: 'required',
      label: 'Required(要求):',
      slot: 'localRequire',
      defaultValue: [],
      colProps: {
        span: 8,
      },
    },
    {
      field: 'price',
      component: 'Input',
      label: 'Price/Inventory(价格/库存):',
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
    labelWidth: 200,
    isNotRow: true,
    schemas: unref(schemas),
    actionColOptions: {
      span: 10,
    },
    submitButtonOptions: {
      text: 'Submit(提交)',
    },
    showResetButton: false,
    showSubmitButton: Boolean(!goodsId || isEdit),
  });

  const formatResponse = (res) => {
    const {
      img,
      ptype,
      attrs = [],
      name,
      type,
      role,
      quality,
      required,
      sundry,
      prices,
      discounts,
      tags,
      hot,
      s1,
      s2,
    } = res;
    const [strength, level, dexterity] = required.split(',');
    const pricesMap = (prices || []).reduce((prev, nxt) => {
      return {
        ...prev,
        [nxt.sid]: nxt,
      };
    }, {});
    return {
      name,
      img,
      channelName: [ptype, type],
      role: role || undefined,
      specific: role ? true : false,
      quality: quality ? quality : undefined,
      hot: Boolean(hot),
      discounts,
      tags,
      s1: s1 ? +s1 : undefined,
      s2: s2 ? +s2 : undefined,
      required: {
        [REQUIRE_TYPE.STRENGTH]: strength,
        [REQUIRE_TYPE.LEVEL]: level,
        [REQUIRE_TYPE.DEXTERITY]: dexterity,
      },
      sundry: !!sundry,
      affix: attrs.reduce((prev, nxt) => {
        return {
          ...prev,
          [nxt.aid]: nxt.value,
        };
      }, {}),

      price: Array.from({ length: 10 }, () => ({})).map((_, index) => {
        if (pricesMap[index + 1]) {
          const item = pricesMap[index + 1];
          return {
            price: item.price ? item.price / 100 : '',
            inventory: item.price ? item.stock ?? '' : '',
          };
        }
        return {
          price: '',
          inventory: '',
        };
      }),
    };
  };

  const initData = async () => {
    goodsId &&
      productData({ id: goodsId }).then((res) => {
        const { affix, channelName, img, discounts, ...rest } = formatResponse(res);
        setFieldsValue(rest);
        activityDiscount.value = discounts || undefined;
        pendingData.value = {
          affix,
          channelName,
          img,
        };
        if (discountLoaded.value) {
          setFieldsValue({ discounts: activityDiscount.value });
        }
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

  watch(discountLoaded, (val) => {
    if (val && goodsId) {
      setFieldsValue({
        discounts: activityDiscount.value,
      });
    }
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
        componentProps() {
          return {
            options: goods.typeOption,
            onChange: (val, opt) => {
              if (opt && opt[1]) {
                currentType.value = `${opt[0].value}${opt[1].value}`;
                currentImgList.value = opt[1].imgList;
                currentSelections.value = opt[1].affixList;
              } else {
                currentType.value = '';
              }
              if (val && val[0] === 1 && val[1] === 2053) {
                setFieldsValue({
                  specific: true,
                });
              }
            },
            showSearch: {
              // 自定义搜索逻辑
              filter: (inputValue, path) =>
                path.some((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase()),
                ),
            },
          };
        },
      });
    });
    locationTags().then((res) => {
      priceDataSource.value = res;
    });
    initData();
  });

  const refreshAffixList = async (channelName: string[]) => {
    await goods.getBaseList();
    const [ptype, type] = channelName;
    for (let item of goods.typeOption) {
      if (+ptype === item.value && item.children) {
        for (let child of item.children) {
          if (+type === child.value) {
            currentSelections.value = child.affixList;
          }
        }
      }
    }
  };

  const formatValues = (values: any) => {
    const {
      affix = {},
      channelName,
      img,
      name,
      price,
      quality,
      required = {},
      specific,
      role,
      sundry,
      discounts,
      hot,
      tags,
      s1,
      s2,
    } = values;
    const [, type] = channelName || [];
    return {
      img,
      name,
      quality,
      type,
      role: specific ? role : undefined,
      sundry: sundry ? 1 : 0,
      discounts,
      hot: hot ? 1 : 0,
      tags: tags || [],
      s1,
      s2,
      attrs: Object.entries(affix).map(([key, item]) => {
        return {
          aid: key,
          value: item,
        };
      }),
      required: `${required[REQUIRE_TYPE.STRENGTH] || ''},${required[REQUIRE_TYPE.LEVEL] || ''},${
        required[REQUIRE_TYPE.DEXTERITY] || ''
      }`,
      prices: priceDataSource.value
        .map((item, index) => {
          return {
            season: item.id,
            price: price[index].price ? Math.floor(price[index].price * 100) : undefined,
            stock: price[index].inventory,
          };
        })
        .filter((item) => item.price && item.stock),
    };
  };

  async function handleSubmit(values: any) {
    const params = formatValues(values);
    if (goodsId) {
      updateProduct({ ...params, id: goodsId }).then(() => {
        closeCurrent();
        back();
      });
    } else {
      addProduct(params).then(() => {
        closeCurrent();
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
