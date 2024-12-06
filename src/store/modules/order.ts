import { orderCount } from '@/api/order';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore({
  id: 'order',
  state: (): { orderCount: number } => ({
    orderCount: 0,
  }),

  actions: {
    initOrderCount() {
      this.orderCount = 0;
    },

    async getOrderCount() {
      await orderCount({}).then((res) => {
        this.orderCount = res;
      });
      const id = setTimeout(async () => {
        clearTimeout(id);
        return this.getOrderCount();
      }, 10000);
    },
  },
});
