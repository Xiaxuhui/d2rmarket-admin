<template>
  <div>
    <Button type="link">{{ t('component.tags.create') }}</Button>
    <div>
      <Tag
        v-bind="$attrs"
        closable
        v-for="(item, index) in tagList"
        :key="`tag${index}`"
        @close="closeTag(item)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { Button, Tag } from 'ant-design-vue';
  import { computed } from 'vue';

  interface ITag {
    label: string;
    id: number | string;
  }

  const { t } = useI18n();

  defineOptions({ name: 'FormTag' });

  const emit = defineEmits(['change', 'update:value']);

  const props = defineProps({
    value: {
      type: Array as PropType<ITag[]>,
      default: () => [],
    },
  });

  const tagList = computed(() => {
    return props.value;
  });

  const closeTag = (item: ITag) => {
    const oldTagList = tagList.value;
    const handleTagList = oldTagList.filter((tag) => {
      return tag.id !== item.id;
    });
    emit('update:value', handleTagList);
    emit('change', handleTagList);
  };
</script>
