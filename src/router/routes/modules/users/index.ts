import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const users: AppRouteModule = {
  path: '/users',
  name: 'Users',
  component: LAYOUT,
  redirect: '/user/userList',
  meta: {
    orderNo: 20,
    icon: 'mdi:users-outline',
    title: t('routes.users.users'),
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('@/views/users/userList/index.vue'),
      meta: {
        title: t('routes.users.userList'),
      },
    },
    {
      path: 'userMessage',
      name: 'UserMessage',
      component: () => import('@/views/users/userMessage/index.vue'),
      meta: {
        title: t('routes.users.userMessage'),
      },
    },
  ] as const,
};

export default users;
