import { PERMISSION_ENUM } from '@/enums/permissionEnum';
import { useUserStore } from '@/store/modules/user';

export const useAuthorization = (auth: PERMISSION_ENUM[]) => {
  const userStore = useUserStore();

  const authority = userStore.getAuthority;

  return auth.map((item) => {
    return authority.includes(item);
  });
};
