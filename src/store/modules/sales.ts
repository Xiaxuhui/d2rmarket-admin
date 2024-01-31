import { defineStore } from 'pinia';

export const useSalesStore = defineStore({
  id: 'sales-store',

  state: (): { userId: undefined | number; isRoot: boolean } => ({
    userId: undefined,
    isRoot: false,
  }),

  actions: {
    updateUserId(userId: number) {
      this.userId = userId;
    },
    updateRoot(root: boolean) {
      this.isRoot = root;
    },
  },
});
