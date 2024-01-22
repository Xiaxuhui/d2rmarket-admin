<template>
  <div class="md:flex" v-for="(_, i) in Math.ceil(growCardList.length / 4)" :key="'row' + i">
    <Card
      v-for="(item, index) in growCardList.slice(i * 4, i * 4 + 4)"
      :key="item.title"
      size="small"
      :loading="loading"
      :title="item.title"
      class="md:w-1/4 w-full mt-4"
      :class="{ '!md:mr-4': (index % 4) + 1 < 4, '!mt-4': index > 0, '!invisible': !item.title }"
    >
      <template v-if="item.action" #extra>
        <Tag :color="item.color">{{ item.action }}</Tag>
      </template>

      <div class="py-4 px-4 flex justify-between items-center">
        <CountTo :prefix="item.prefix" :startVal="1" :endVal="item.value" class="text-2xl" />
        <Icon v-if="item.icon" :icon="item.icon" :size="40" />
      </div>

      <div class="p-2 px-4 flex flex-row-reverse">
        &nbsp;
        <a-button v-if="item.actionFn" size="small" @click="item.actionFn" type="primary"
          >提现</a-button
        >
        <!-- <span>总{{ item.title }}</span> -->
        <!-- <CountTo :prefix="item.prefix" :startVal="1" :endVal="item.total" /> -->
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components/CountTo';
  import Icon from '@/components/Icon/Icon.vue';
  import { Tag, Card } from 'ant-design-vue';
  import { PropType } from 'vue';
  import { GrowCardItem } from '../data';

  defineProps({
    loading: {
      type: Boolean,
    },
    growCardList: {
      type: Array as PropType<GrowCardItem[]>,
      default: () => [],
    },
  });
</script>
