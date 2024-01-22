<template>
  <div class="p-4">
    <div class="flex text-base rounded-lg bg-white p-4">
      <img class="w-36 h-36 rounded-full" :src="headerImg" alt="" />
      <div class="flex flex-col ml-4 mt-4">
        <div class="flex items-center"
          ><span class="w-20">昵称：</span><span class="text-xl">古树</span></div
        >
        <div class="flex items-center"
          ><span class="w-20">ID：</span><span class="text-xl">123456</span></div
        >
      </div>
    </div>
    <GrowCard :loading="loading" :grow-card-list="growCardList" class="enter-y" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <!-- <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import headerImg from '@/assets/images/header.jpg';
  import { getGrowCardList } from './data';
  // import SiteAnalysis from './components/SiteAnalysis.vue';
  // import VisitSource from './components/VisitSource.vue';
  // import VisitRadar from './components/VisitRadar.vue';
  // import SalesProductPie from './components/SalesProductPie.vue';

  const loading = ref(true);

  const growCardList = getGrowCardList();
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
