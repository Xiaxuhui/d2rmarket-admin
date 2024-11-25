<template>
  <div class="m-4 bg-white">
    <BasicForm
      class="local_form"
      @register="register"
      @submit="handleSubmit"
      :disabled="!!activityId && !isEdit"
    >
      <template #resetBefore>
        <a-button class="mr-2" @click="back">back</a-button>
      </template>
      <template #discount="{ model, field }">
        <FieldTable
          v-model="model[field]"
          :disabled="!!activityId && !isEdit"
          :dataSource="defaultDateSource"
        />
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, computed } from 'vue';
  import { addActivity, detailActivity } from '@/api/marketing';
  import dayjs from 'dayjs';
  import FieldTable from './components/fieldTable.vue';

  defineOptions({
    name: 'ActivitySetting',
  });

  interface IParams {
    id?: number;
    name: string;
    data: string;
    forever: 0 | 1;
    start?: number;
    end?: number;
    note?: string;
  }

  const { back } = useRouter();

  const route = useRoute();
  const activityId = route.query.id;
  const isEdit = Boolean(activityId && route.query.type === 'edit');

  const timeFormat = 'YYYY-MM-DD HH:mm:ss';

  const schemas = computed(() => {
    return [
      {
        field: 'divider-basic',
        component: 'Divider',
        label: 'ADD ACTIVITY',
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
        field: 'note',
        component: 'Input',
        label: 'Desc:',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'discount',
        slot: 'discount',
        label: 'Discount:',
        defaultValue: defaultDateSource,
        colProps: {
          span: 8,
        },
      },
      {
        field: 'indefinite',
        component: 'Switch',
        label: 'Indefinite:',
        defaultValue: false,
        colProps: {
          span: 8,
        },
      },
      {
        field: '[startDateTime, endDateTime]',
        label: 'Date range:',
        component: 'RangePicker',
        componentProps: {
          format: timeFormat,
          placeholder: ['Start date', 'End date'],
          showTime: { format: 'HH:mm:ss' },
        },
        ifShow: ({ values }) => {
          return !values.indefinite;
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
    showSubmitButton: Boolean(!activityId || isEdit),
    showResetButton: false,
  });

  const defaultDateSource = [
    {
      num: '',
      discount: '',
    },
    {
      num: '',
      discount: '',
    },
    {
      num: '',
      discount: '',
    },
  ];

  const getData = async (id) => {
    detailActivity(id).then((res) => {
      const { name, forever, discountList, start, end, note } = res;
      const discount = defaultDateSource.map((item, index) => {
        if (discountList[index]) {
          return discountList[index];
        }
        return item;
      });
      setFieldsValue({
        name,
        note,
        discount,
        indefinite: Boolean(forever),
        startDateTime: !forever ? dayjs(start) : undefined,
        endDateTime: !forever ? dayjs(end) : undefined,
      });
    });
  };

  onMounted(async () => {
    activityId && getData(activityId);
  });

  const handleParams = (params): IParams => {
    const { discount, note, endDateTime, indefinite, name, startDateTime } = params;
    let data: { num: number; discount: number }[] = [];
    for (let dis of discount) {
      const { num, discount: percent } = dis;
      if (num && percent && +num > 0 && +percent <= 100) {
        data.push({
          num: +num,
          discount: +percent,
        });
      }
    }
    return {
      data: JSON.stringify(data),
      note,
      start: !indefinite ? new Date(startDateTime).getTime() : undefined,
      end: !indefinite ? new Date(endDateTime).getTime() : undefined,
      forever: indefinite ? 1 : 0,
      name,
    };
  };

  function handleSubmit(values: any) {
    const params = handleParams(values);

    if (activityId) {
      params.id = +activityId;
    }
    addActivity(params).then(() => {
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
