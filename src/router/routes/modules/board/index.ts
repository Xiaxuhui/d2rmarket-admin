import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const board: AppRouteModule = {
  path: '/board',
  name: 'Board',
  component: LAYOUT,
  redirect: '/board/userData',
  meta: {
    orderNo: 30,
    icon: 'tabler:chart-dots',
    title: t('routes.board.board'),
  },
  children: [
    {
      path: 'userData',
      name: 'UserData',
      component: () => import('@/views/board/userData/index.vue'),
      meta: {
        title: t('routes.board.userData'),
      },
    },
    {
      path: 'platform',
      name: 'Platform',
      component: () => import('@/views/board/platform/index.vue'),
      meta: {
        title: t('routes.board.platform'),
      },
    },
    {
      path: 'series',
      name: 'SeriesData',
      component: () => import('@/views/board/series/index.vue'),
      meta: {
        title: t('routes.board.series'),
      },
    },
    {
      path: 'sales',
      name: 'SalesData',
      component: () => import('@/views/board/sales/index.vue'),
      meta: {
        title: t('routes.board.sales'),
      },
    },
    {
      path: 'promote',
      name: 'PromoteData',
      component: () => import('@/views/board/promote/index.vue'),
      meta: {
        title: t('routes.board.promote'),
      },
    },
    {
      path: 'order',
      name: 'Order',
      component: () => import('@/views/board/order/index.vue'),
      meta: {
        title: t('routes.board.order'),
      },
    },
    {
      path: 'orderList',
      name: 'OrderList',
      component: () => import('@/views/board/orderList/index.vue'),
      meta: {
        title: t('routes.board.orderList'),
      },
    },
  ],
};

export default board;
