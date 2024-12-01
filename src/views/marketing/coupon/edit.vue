<template>
  <div class="m-4 bg-white">
    <BasicForm
      class="local_form"
      @register="register"
      @submit="handleSubmit"
      :disabled="!!couponId && !isEdit"
    >
      <template #resetBefore>
        <a-button class="mr-2" @click="back">back</a-button>
      </template>
      <template #codeInput="{ model, field }">
        <CodeInput v-model="model[field]" :disabled="!!couponId && !isEdit" />
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, computed } from 'vue';
  import { addCoupon, detailCoupon } from '@/api/marketing';
  import CodeInput from './components/codeInput.vue';
  import { useTabs } from '@/hooks/web/useTabs';

  defineOptions({
    name: 'CouponSetting',
  });

  const { closeCurrent } = useTabs();

  interface IParams {
    id?: number;
    code: string;
    discount: number;
    num: number;
    start?: number;
    end?: number;
    note?: string;
  }

  const { back } = useRouter();

  const route = useRoute();
  const couponId = route.query.id;
  const isEdit = Boolean(couponId && route.query.type === 'edit');

  const schemas = computed(() => {
    return [
      {
        field: 'divider-basic',
        component: 'Divider',
        label: 'ADD COUPON',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'note',
        component: 'Input',
        label: 'Desc:',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'num',
        component: 'Input',
        label: 'Amount:',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'discount',
        component: 'Input',
        label: 'Discount:',
        required: true,
        suffix: '%',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'code',
        label: 'Code:',
        slot: 'codeInput',
        required: true,
        colProps: {
          span: 8,
        },
      },
      {
        field: '[startDateTime, endDateTime]',
        label: 'Date range:',
        component: 'RangePicker',
        required: true,
        componentProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: ['Start date', 'End date'],
          showTime: { format: 'HH:mm:ss' },
        },
      },
    ] as FormSchema[];
  });

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 160,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 12,
    },
    submitButtonOptions: {
      text: 'Submit',
    },
    showSubmitButton: Boolean(!couponId || isEdit),
    showResetButton: false,
  });

  const getData = async (id) => {
    detailCoupon(id).then((res) => {
      const { num, discount, start, end, note, code } = res;
      setFieldsValue({
        note,
        discount,
        num,
        startDateTime: start,
        endDateTime: end,
        code,
      });
    });
  };

  onMounted(async () => {
    couponId && getData(couponId);
  });

  const handleParams = (params): IParams => {
    const { discount, note, endDateTime, code, startDateTime, num } = params;

    return {
      discount: +discount,
      note,
      start: new Date(startDateTime).getTime(),
      end: new Date(endDateTime).getTime(),
      code,
      num: +num,
    };
  };

  function handleSubmit(values: any) {
    const params = handleParams(values);

    if (couponId) {
      params.id = +couponId;
    }
    addCoupon(params).then(() => {
      closeCurrent();
      back();
    });
  }
</script>
<style lang="less" scoped>
  :deep(.local_form) .local_typeValue {
    width: calc(100% - 120px);
    margin-bottom: 0;
    margin-left: -1px;
    border-right: 0;

    .ant-input {
      border-radius: 0 6px 6px 0;
    }
  }
</style>
