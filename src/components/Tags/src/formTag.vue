<template>
  <div class="flex flex-col">
    <div class="text-[#1677FF] cursor-pointer" @click="showModal">{{
      t('component.tags.create')
    }}</div>
    <div class="mt-2">
      <Tag
        v-bind="$attrs"
        closable
        v-for="(item, index) in tagList"
        :key="`tag${index}`"
        @close.prevent="closeTag(item)"
        >{{ item.label }}</Tag
      >
    </div>
    <Modal v-model:open="open" :title="title" @ok="handleOk" @cancel="handleCancel">
      <div class="px-[24px] py-[16px]">
        <div class="flex items-center">
          <div class="mr-[12px]">name:</div><Input v-model:value="tagName" />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { Tag, Modal, Input } from 'ant-design-vue';
  import { computed, ref } from 'vue';

  interface ITag {
    label: string;
    id: number | string;
  }

  const { t } = useI18n();

  defineOptions({ name: 'FormTag' });

  const open = ref(false);

  const tagName = ref('');

  const emit = defineEmits(['change', 'update:value', 'delete', 'add']);

  const props = defineProps({
    value: {
      type: Array as PropType<ITag[]>,
      default: () => [],
    },
    title: String,
  });

  const tagList = computed(() => {
    return props.value;
  });

  const showModal = () => {
    open.value = true;
  };

  const handleOk = () => {
    if (tagName.value) {
      emit('add', tagName.value);
      open.value = false;
    }
  };

  const handleCancel = () => {
    tagName.value = '';
  };

  const closeTag = (item: ITag) => {
    emit('delete', item);
  };
</script>
