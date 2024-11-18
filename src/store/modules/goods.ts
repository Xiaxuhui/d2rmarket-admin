import { baseList } from '@/api/goods';
import { TYPE_ENUM, TYPE_TEXT } from '@/contants';
import { defineStore } from 'pinia';
import { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';
import { cloneDeep } from 'lodash-es';

interface GoodsInfo {
  list: any[];
  loading: boolean;
  typeOption: DefaultOptionType[];
  imgList: { id: number; url: string }[];
}

const baseTypeOption = [
  {
    label: TYPE_TEXT[TYPE_ENUM.MISC],
    value: TYPE_ENUM.MISC,
    children: [],
  },
  {
    label: TYPE_TEXT[TYPE_ENUM.Armor],
    value: TYPE_ENUM.Armor,
    children: [],
  },
  {
    label: TYPE_TEXT[TYPE_ENUM.Weapon],
    value: TYPE_ENUM.Weapon,
    children: [],
  },
  {
    label: TYPE_TEXT[TYPE_ENUM.Currency],
    value: TYPE_ENUM.Currency,
    children: [],
  },
];

export const useGoodsStore = defineStore({
  id: 'goods-info',
  state: (): GoodsInfo => ({
    list: [],
    loading: false,
    typeOption: cloneDeep(baseTypeOption),
    imgList: [],
  }),
  getters: {},
  actions: {
    async getBaseList() {
      this.loading = true;
      const data = await baseList({});
      this.list = data;
      this.typeOption = cloneDeep(baseTypeOption);
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i];
        const currentType = item.type;
        let currentTypeOption;
        switch (currentType) {
          case TYPE_ENUM.MISC:
            currentTypeOption = this.typeOption[0].children;
            break;
          case TYPE_ENUM.Armor:
            currentTypeOption = this.typeOption[1].children;
            break;
          case TYPE_ENUM.Weapon:
            currentTypeOption = this.typeOption[2].children;
            break;
          case TYPE_ENUM.Currency:
            currentTypeOption = this.typeOption[3].children;
            break;
          default:
            currentTypeOption = [];
        }
        currentTypeOption.push({
          label: item.name,
          value: item.id,
          imgList: (item.imgList || []).map((img) => {
            return {
              id: img.id,
              url: img.url,
            };
          }),
          affixList: (item.affixList || []).map((affix) => {
            return {
              value: affix.id,
              label: affix.name,
            };
          }),
        });
      }
      for (let i = 0; i < this.typeOption.length; i++) {
        if (!this.typeOption[i].children?.length) {
          this.typeOption[i].disabled = true;
        }
      }
      this.loading = false;
    },
  },
});
