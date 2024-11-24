import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const marketing: AppRouteModule = {
  path: '/marketing',
  name: 'Marketing',
  component: LAYOUT,
  redirect: '/marketing/coupon',
  meta: {
    orderNo: 10,
    icon: 'hugeicons:marketing',
    title: t('routes.marketing.marketing'),
  },
  children: [
    {
      path: 'coupon',
      name: 'Coupon',
      component: () => import('@/views/marketing/coupon/index.vue'),
      meta: {
        title: t('routes.marketing.coupon'),
      },
    },
    {
      path: 'couponSetting',
      name: 'CouponSetting',
      component: () => import('@/views/marketing/coupon/edit.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.marketing.couponSetting'),
      },
    },
    {
      path: 'activityList',
      name: 'ActivityList',
      component: () => import('@/views/marketing/activity/index.vue'),
      meta: {
        title: t('routes.marketing.activity'),
      },
    },
    {
      path: 'activitySetting',
      name: 'ActivitySetting',
      component: () => import('@/views/marketing/activity/edit.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.marketing.activitySetting'),
      },
    },
  ],
};

export default marketing;
