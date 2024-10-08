import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/settings',
  meta: {
    orderNo: 0,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/dashboard/settings/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.settings'),
      },
    },
  ],
};

export default dashboard;
