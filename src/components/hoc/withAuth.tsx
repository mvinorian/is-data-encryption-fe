import { useRouter } from 'next/router';
import * as React from 'react';

import Loading from '@/components/Loading';
import api from '@/lib/api';
import { getToken, removeToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { PermissionList } from '@/types/entity/permission-list';
import { User } from '@/types/entity/user';

type WithAuthProps = {
  user: User;
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routePermission: PermissionList[]
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { authed } = router.query;

    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();

    const checkAuth = React.useCallback(() => {
      const token = getToken();

      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }

      const loadUser = async () => {
        try {
          const res = await api.get<ApiReturn<User>>('/user/me');

          login({ ...res.data.data, token });
        } catch (err) {
          removeToken();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated || authed) loadUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    React.useEffect(() => {
      if (window.sessionStorage.getItem('redirectIsDone')) {
        window.sessionStorage.removeItem('redirectIsDone');
        return;
      }

      if (routePermission.includes('all')) return;

      if (user && isAuthenticated) {
        if (!routePermission.includes(user.peran)) {
          router.replace('/');
          window.sessionStorage.setItem('redirectIsDone', 'true');
          return;
        }
      } else {
        if (!isLoading) {
          router.replace('/');
          window.sessionStorage.setItem('redirectIsDone', 'true');
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routePermission, user, isAuthenticated, isLoading]);

    React.useEffect(() => {
      checkAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
      return <Loading />;
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
