<template>
  <BasicModal v-bind="$attrs" @register="register" :title="'Chat'">
    <div className="flex-1 flex flex-col h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div id="msg" className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <!-- <div
                        className={`col-start-6 col-end-13 p-3 rounded-lg ${needAnimate &&
                          'animate__animated animate__fadeInUp animate__delay-0.5s'
                          }`}
                        key={item.id}
                        id={`message${index}`}>
                        <div className="flex items-start justify-start flex-row-reverse">
                          <div className="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {userInfo.name?.[0] || 'U'}
                          </div>
                          <RenderMessage message={item} isMyself={myself} />
                        </div>
                      </div> -->

              <!-- <div
                        :class="`col-start-1 col-end-8 p-3 rounded-lg  ${needAnimate &&
                          'animate__animated animate__fadeInUp animate__delay-0.5s`'
                          }`"
                        key={item.id}
                        :id="`message${index}`">
                        <div className="flex flex-row items-start">
                          <div className="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {activeItem.name?.[0] || 'U'}
                          </div>
                          <RenderMessage message={item} isMyself={myself} />
                        </div>
                      </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';

  const state = reactive({
    loading: false,
  });

  const [register, { setModalProps }] = useModalInner(() => {
    console.log('弹窗， 123');

    setModalProps({ width: 1200 });
    state.loading = true;
  });
</script>
