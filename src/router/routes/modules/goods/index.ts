import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const goods: AppRouteModule = {
  path: '/goods',
  name: 'Goods',
  component: LAYOUT,
  redirect: '/goods/basic',
  meta: {
    orderNo: 20,
    icon: 'lsicon:goods-outline',
    title: t('routes.goods.goods'),
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/goods/basic/index.vue'),
      meta: {
        title: t('routes.goods.basic'),
      },
    },
    {
      path: 'basicSetting',
      name: 'BasicSetting',
      component: () => import('@/views/goods/basic/edit.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.goods.basicSetting'),
      },
    },
    {
      path: 'goodsList',
      name: 'GoodsList',
      component: () => import('@/views/goods/goodsList/index.vue'),
      meta: {
        title: t('routes.goods.goodsList'),
      },
    },
    {
      path: 'goodsSetting',
      name: 'GoodsSetting',
      component: () => import('@/views/goods/goodsList/edit.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.goods.goodsSetting'),
      },
    },
  ],
};

export default goods;
