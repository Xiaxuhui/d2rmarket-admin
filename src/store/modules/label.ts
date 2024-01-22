import { defineStore } from 'pinia';
import { addLabel, getLabelList, removeLabel, updateLabel } from '@/api/sys/label';
import { LabelModel } from '../../api/sys/model/labelModel';

interface Label {
  list: LabelModel[];
  loading: boolean;
  adding: boolean;
}

export const useLabelStore = defineStore({
  id: 'video-label',
  state: (): Label => ({
    list: [],
    loading: false,
    adding: false,
  }),
  getters: {
    options(state) {
      return state.list.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    },
  },
  actions: {
    async loadLabel() {
      this.loading = true;
      const { data } = await getLabelList();
      this.list = data.data;
      this.loading = false;
    },
    async addLabel(name: string, sort: number = 1) {
      try {
        this.adding = true;
        const { data } = await addLabel(name, sort);
        this.list.unshift({ id: data.data, name, w: sort });
      } catch (error) {
        console.log(error);
        //
      }
      this.adding = false;
    },
    async removeLabel(id: string) {
      try {
        await removeLabel(id);
        const index = this.list.findIndex((item) => item.id === id);
        this.list.splice(index, 1);
      } catch (error) {
        console.log(error);
        //
      }
    },
    async updatelabel(label: LabelModel) {
      try {
        await updateLabel(label);
        const index = this.list.findIndex((item) => item.id === label.id);
        this.list[index] = { ...this.list[index], ...label };
      } catch (error) {
        console.log(error);
        //
      }
    },
  },
});
