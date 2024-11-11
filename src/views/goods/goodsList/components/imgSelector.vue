<template>
  <div class="flex items-center flex-wrap">
    <template v-if="imgList.length">
      <div
        class="ml-[10px] mt-[10px]"
        v-for="item in imgList"
        :key="item.id"
        @click="chooseImg(item.id)"
      >
        <div :class="styles.imgContainer({ active: activeId === item.id })">
          <img class="w-[100px] h-[100px] rounded-[4px]" :src="`${appDomain}${item.url}`" alt="" />
        </div>
        <div :class="styles.text({ active: activeId === item.id })">{{ item.id }}</div>
      </div>
    </template>
    <img v-else class="w-[100px] h-[100px] rounded-[4px]" :src="ERROR_IMG" alt="" />
  </div>
</template>
<script lang="ts" setup>
  import { ERROR_IMG } from '@/contants';
  import { useGlobSetting } from '@/hooks/setting';
  import { tv } from 'tailwind-variants';
  import { computed, watch } from 'vue';

  const styles = tv({
    slots: {
      imgContainer:
        'cursor-pointer border-[2px] border-transparent rounded-[4px]flex-col items-center',
      text: 'text-center leading-[32px]',
    },
    variants: {
      active: {
        true: {
          imgContainer: 'border-red rounded-[4px]',
          text: 'text-red',
        },
      },
    },
  })();

  const props = defineProps({
    imgList: {
      type: Array as PropType<{ id: number; url: string }[]>,
      default: () => [],
    },
    modelValue: [Number, String],
  });

  watch(
    () => props.imgList,
    () => {
      activeId.value = 0;
    },
  );

  const emits = defineEmits(['update:modelValue']);
  const { appDomain } = useGlobSetting();

  const activeId = computed({
    get() {
      return +(props.modelValue || 0);
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const chooseImg = (id: number) => {
    activeId.value = id;
  };
</script>
