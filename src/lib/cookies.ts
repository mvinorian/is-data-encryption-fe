import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const getToken = (): string => {
  return cookies.get('@tamiyochi/token');
};

export const setToken = (token: string) => {
  cookies.set('@tamiyochi/token', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookies.remove('@tamiyochi/token', {
    path: '/',
  });
};
