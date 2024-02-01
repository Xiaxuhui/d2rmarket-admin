<template>
  <div class="p-4">
    <div class="flex text-base rounded-lg bg-white p-4">
      <img class="w-36 h-36 rounded-full" :src="headerImg" alt="" />
      <div class="flex flex-col ml-4 mt-4">
        <div class="flex items-center"
          ><span class="w-20">昵称：</span
          ><span class="text-xl">{{ state.data.channel }}</span></div
        >
        <div class="flex items-center"
          ><span class="w-20">ID：</span><span class="text-xl">{{ state.data.id }}</span></div
        >
      </div>
    </div>
    <GrowCard :loading="loading" :grow-card-list="growCardList" class="enter-y" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import headerImg from '@/assets/images/header.jpg';
  import { allList } from '@/api/board';
  import { distributorDetail } from '@/api/sys/distributor';
  import { getGrowCardList } from './data';

  const loading = ref(true);

  const state = reactive({
    data: {
      channel: '',
      id: '',
      v1: '0',
      v2: '0',
      v3: '0',
      v4: '0',
      v5: '0',
      v6: '0',
      canRemain: false,
      remain_m: 0,
    },
  });

  const growCardList = computed(() => {
    return getGrowCardList(state.data);
  });

  Promise.all([
    allList({
      type: 6,
      timeGap: 3600000 * 24,
      value: 2,
    }),
    distributorDetail({ channelId: 2 }),
  ])
    .then(([listData, detail]) => {
      const { channel, id, v1, v2, v3, v4, v5, v6 } = listData[0] || {};
      const { canRemain, remain_m } = detail;
      state.data = { channel, id, v1, v2, v3, v4, v5, v6, canRemain: !!canRemain, remain_m };
    })
    .finally(() => {
      loading.value = false;
    });
</script>
