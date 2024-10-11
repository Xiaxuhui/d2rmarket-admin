<template>
  <div class="p-4 bg-[#fff]">
    <div class="font-bold text-2xl">Settings</div>
    <Divider />
    <div class="px-[24px]">
      <div class="flex">
        <div class="mr-4">Location: </div>
        <FormTag
          v-model:value="tags"
          title="Create Location"
          @delete="deleteLocation"
          @add="addLocation"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { FormTag } from '@/components/Tags';
  import { Divider } from 'ant-design-vue';
  import { ref } from 'vue';

  const tags = ref([
    {
      label: 'label1',
      id: 1,
    },
    {
      label: 'label2',
      id: 2,
    },
  ]);

  const deleteLocation = (item) => {
    tags.value = tags.value.filter((tag) => tag.id !== item.id);
  };

  const addLocation = (name: string) => {
    const id = Date.now();
    tags.value.push({
      id,
      label: name,
    });
  };
</script>
