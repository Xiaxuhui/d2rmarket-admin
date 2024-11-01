<template>
  <div class="flex items-center flex-wrap">
    <template v-if="imgList.length">
      <div
        :class="styles.imgContainer({ active: activeId === item.id })"
        v-for="item in imgList"
        :key="item.id"
        @click="chooseImg(item.id)"
      >
        <img class="w-[100px] h-[100px] rounded-[4px]" :src="`${appDomain}${item.url}`" alt="" />
      </div>
    </template>
    <img v-else class="w-[100px] h-[100px] rounded-[4px]" :src="ERROR_IMG" alt="" />
  </div>
</template>
<script lang="ts" setup>
  import { ERROR_IMG } from '@/contants';
  import { useGlobSetting } from '@/hooks/setting';
  import { tv } from 'tailwind-variants';
  import { computed } from 'vue';

  const styles = tv({
    slots: {
      imgContainer:
        'cursor-pointer border-[2px] border-transparent rounded-[4px] ml-[10px] mt-[10px]',
    },
    variants: {
      active: {
        true: {
          imgContainer: 'border-red',
        },
      },
    },
  })();

  const props = defineProps({
    imgList: {
      type: Array as PropType<{ id: number; url: string }[]>,
      default: () => [],
    },
    modelValue: Number,
  });

  const emits = defineEmits(['update:modelValue']);
  const { appDomain } = useGlobSetting();

  const activeId = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const chooseImg = (id: number) => {
    activeId.value = id;
  };
</script>
