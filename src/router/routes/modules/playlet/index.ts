import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const playlet: AppRouteModule = {
  path: '/playlet',
  name: 'Playlet',
  component: LAYOUT,
  redirect: '/playlet/series',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.playlet.playlet'),
  },
  children: [
    {
      path: 'series',
      name: 'Series',
      component: () => import('@/views/playlet/series/index.vue'),
      meta: {
        title: t('routes.playlet.series'),
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('@/views/playlet/tag/index.vue'),
      meta: {
        title: t('routes.playlet.tag'),
      },
    },
    {
      path: 'homePage',
      name: 'HomePage',
      component: () => import('@/views/playlet/homePage/index.vue'),
      meta: {
        title: t('routes.playlet.homePage'),
      },
    },
    {
      path: 'charge',
      name: 'Charge',
      component: () => import('@/views/playlet/charge/index.vue'),
      meta: {
        title: t('routes.playlet.charge'),
      },
    },
  ],
};

export default playlet;
