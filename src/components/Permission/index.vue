<template>
  <div v-if="showActionBtn"><slot></slot></div>
</template>
<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';
  import type { PropType } from 'vue';
  import { ref } from 'vue';

  const uerStore = useUserStore();

  defineOptions({
    name: 'Authentication',
  });

  const props = defineProps({
    auth: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const showActionBtn = ref(true);

  for (let authority of props.auth) {
    if (!uerStore.getAuthority.includes(authority)) {
      showActionBtn.value = false;
    }
  }
</script>
