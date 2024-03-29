import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const playlet: AppRouteModule = {
  path: '/sales',
  name: 'Sales',
  component: LAYOUT,
  redirect: '/sales/promote',
  meta: {
    orderNo: 20,
    icon: 'ant-design:partition-outlined',
    title: t('routes.sales.sales'),
  },
  children: [
    {
      path: 'distributor',
      name: 'Distributor',
      redirect: '/sales/promote',
      component: () => import('@/views/sales/distributor/index.vue'),
      meta: {
        title: t('routes.sales.distributor'),
        hideMenu: true,
      },
    },
    {
      path: 'editDistributor',
      name: 'EditDistributor',
      redirect: '/sales/promote',
      component: () => import('@/views/sales/distributor/edit.vue'),
      meta: {
        title: t('routes.sales.editDistributor'),
        roles: [RoleEnum.SUPER, RoleEnum.ORGANIZATION, RoleEnum.PITCHER],
        hideMenu: true,
      },
    },
    {
      path: 'addPromote',
      name: 'addPromote',
      component: () => import('@/views/sales/promote/add.vue'),
      meta: {
        title: t('routes.sales.addPromote'),
        hideMenu: true,
        roles: [RoleEnum.SUPER, RoleEnum.PITCHER],
      },
    },
    {
      path: 'promote',
      name: 'Promote',
      component: () => import('@/views/sales/promote/index.vue'),
      meta: {
        title: t('routes.sales.promote'),
      },
    },
    {
      path: 'withdraw',
      name: 'Withdraw',
      component: () => import('@/views/sales/withdraw/index.vue'),
      meta: {
        title: t('routes.sales.withdraw'),
        roles: [RoleEnum.SUPER, RoleEnum.ORGANIZATION, RoleEnum.DISTRIBUTOR],
      },
    },
  ],
};

export default playlet;
