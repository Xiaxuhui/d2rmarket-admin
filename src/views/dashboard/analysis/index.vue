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
    <GrowCard :loading="loading" :grow-card-list="growCardList" :data="state.data" />
    <WithdrawModal @register="registerModal" />
    <DetailModal @register="registerDetailModal" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import WithdrawModal from './components/WithdrawModal.vue';
  import DetailModal from './components/DetailModal.vue';
  import headerImg from '@/assets/images/header.jpg';
  import { allList } from '@/api/board';
  import { distributorDetail } from '@/api/sys/distributor';
  import { useModal } from '@/components/Modal';
  import { getHomeData } from '@/api/sys/user';
  import { getGrowCardList } from './data';
  import { useUserStore } from '@/store/modules/user';

  const loading = ref(true);

  const userStore = useUserStore();

  const [registerModal, { openModal }] = useModal();

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

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
      vipNum: 0,
      sonChannelNum: 0,
      investNum: 0,
      blogNum: 0,
    },
  });

  const growCardList = getGrowCardList(openModal, openDetailModal.bind(null, true, 1));

  onMounted(() => {
    Promise.all([
      allList({
        type: 6,
        timeGap: 3600000 * 24,
        value: userStore.getUserInfo.id,
      }),
      distributorDetail({ channelId: userStore.getUserInfo.id }),
      getHomeData({}),
    ])
      .then(([listData, detail, homeData]) => {
        const { channel, id, v1, v2, v3, v4, v5, v6 } = listData?.list[0] || {};
        const { canRemain, remain_m } = detail;
        const { vipNum, sonChannelNum, investNum, blogNum } = homeData;
        state.data = {
          channel,
          id,
          v1,
          v2,
          v3,
          v4,
          v5,
          v6,
          canRemain: !!canRemain,
          remain_m: remain_m / 10000,
          vipNum,
          sonChannelNum,
          investNum,
          blogNum,
        };
      })
      .finally(() => {
        loading.value = false;
      });
  });
</script>
