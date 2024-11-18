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
  import { Divider, message } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';

  const tags = ref<{ name: string; id: number }[]>([]);

  const deleteLocation = ({ id }) => {
    delTags({ id }).then(() => {
      message.success('Successfully deleted');
      getTags();
    });
  };

  const addLocation = (name: string) => {
    if (tags.value.length > 10) {
      message.error('Add a maximum of 10 locations');
      return;
    }
    addTags({ name }).then(() => {
      getTags();
      message.success('Created successfully');
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
