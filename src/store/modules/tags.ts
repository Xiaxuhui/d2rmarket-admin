import { locationTags } from '@/api/settings';
import { defineStore } from 'pinia';

interface ITag {
  [key: string]: string;
}

export const useTagsStore = defineStore({
  id: 'tags',
  state: (): { tags: ITag } => ({
    tags: {},
  }),

  actions: {
    async getTags() {
      locationTags().then((res) => {
        res.forEach((item) => {
          this.tags[item.id] = item.name;
        });
      });
    },
  },
});
