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
  import { addTags, locationTags, delTags } from '@/api/settings';
  import { FormTag } from '@/components/Tags';
  import { Divider } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';

  const tags = ref<{ name: string; id: number }[]>([]);

  const deleteLocation = (id) => {
    delTags({ id }).then(() => {
      getTags();
    });
  };

  const addLocation = (name: string) => {
    addTags({ name }).then(() => {
      getTags();
    });
  };

  const getTags = () => {
    locationTags().then((res) => {
      tags.value = res.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    });
  };

  onMounted(() => {
    getTags();
  });
</script>
