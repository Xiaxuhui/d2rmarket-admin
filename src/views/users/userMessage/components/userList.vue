<template>
  <div>
    <div class="flex-col h-[100px]">
      <div class="min-h-[40px] w-full p-[10px]">
        <Select
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="selectOptions"
          optionFilterProp="label"
          @change="optionChange"
        />
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="overflow-scroll h-full scrollbar__wrap--hidden-default">
          <div
            :class="styles.tab({ active: activeId === item.qid })"
            v-for="item in handleList"
            :key="item.qid"
            @click="chatChange(item)"
          >
            <div
              class="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
              >{{ item.name.slice(0, 1).toUpperCase() }}</div
            >
            <div class="ml-4 flex-auto relative h-10">
              <div class="font-medium truncate">{{ item.name }}</div>
              <div
                v-if="item.num > 0 && activeId !== item.qid"
                class="rounded-full w-[20px] h-[20px] leading-[20px] text-[#fff] absolute right-0 bottom-0 bg-[#ff4c4a] text-center"
                >{{ item.num }}</div
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { tv } from 'tailwind-variants';
  import { Select } from 'ant-design-vue';
  import { onMounted, watch, computed, ref } from 'vue';
  import { userMessageList } from '@/api/users/message';
  import { IUserMessage } from '@/definations';
  import { onBeforeRouteLeave } from 'vue-router';
  // import { cloneDeep } from 'lodash-es';

  const styles = tv({
    slots: {
      tab: `flex items-center p-4 hover:bg-gray-200 cursor-pointer border-b border-slate-200`,
    },
    variants: {
      active: {
        true: {
          tab: 'bg-gray-200',
        },
      },
    },
  })();

  const activeId = ref(0);

  const isVisibility = ref(true);

  const emits = defineEmits(['chatChange']);

  const userList = ref<IUserMessage[]>([]);

  const cacheMap = ref<{ [key: string]: IUserMessage }>({});

  const handleList = computed(() => {
    // const list = cloneDeep(userList.value);
    // for (let i = 0; i < list.length; i++) {
    //   const user = list[i];
    //   if (activeId.value === user.qid) {
    //     list.splice(i, 1);
    //     list.unshift(user);
    //   }
    // }
    return userList.value;
  });

  const selectOptions = ref<{ label: string; value: number }[]>([]);

  const stop = ref(false);
  const getUserList = () => {
    if (!stop.value && isVisibility.value) {
      const id = setTimeout(() => {
        if (!stop.value && isVisibility.value) {
          userMessageList({}).then((res) => {
            userList.value = res;
            selectOptions.value = userList.value.map((item) => {
              const { name, qid } = item;
              cacheMap[qid] = item;
              return {
                label: name,
                value: qid,
              };
            });
            clearTimeout(id);
            return getUserList();
          });
        }
      }, 5000);
    }
  };

  const chatChange = (item: IUserMessage) => {
    activeId.value = item.qid;
    emits('chatChange', item);
  };

  const optionChange = (val) => {
    activeId.value = val;
    emits('chatChange', cacheMap[val]);
  };

  const getUserMessageListOnce = () => {
    return userMessageList({}).then((res) => {
      userList.value = res;
      selectOptions.value = userList.value.map((item) => {
        const { name, qid } = item;
        cacheMap[qid] = item;
        return {
          label: name,
          value: qid,
        };
      });
      return getUserList();
    });
  };

  onMounted(() => {
    stop.value = false;
    getUserMessageListOnce();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisibility.value = false;
      } else {
        isVisibility.value = true;
      }
    });
  });

  watch(isVisibility, (val) => {
    if (val) {
      getUserMessageListOnce();
    }
  });

  onBeforeRouteLeave((to, from, next) => {
    stop.value = true;
    next();
  });
</script>
