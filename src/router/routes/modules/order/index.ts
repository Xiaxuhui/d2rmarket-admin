import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const board: AppRouteModule = {
  path: '/orders',
  name: 'Orders',
  component: LAYOUT,
  redirect: '/orders/orderList',
  meta: {
    orderNo: 30,
    icon: 'material-symbols:orders-outline',
    title: t('routes.order.order'),
  },
  children: [
    {
      path: 'orderList',
      name: 'OrderList',
      component: () => import('@/views/order/orderList/index.vue'),
      meta: {
        title: t('routes.order.orderList'),
      },
    },
  ],
};

export default board;
