import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

import { getToken } from './cookies';

export type UninterceptedApiError = {
  code: number;
  status: string;
  message: string | Record<string, string[]>;
};

export type ApiReturn<T> = {
  code: string;
  status: string;
  data: T;
};

export type ApiError = {
  errors: string;
  message: string;
  status: string;
};

type PaginateData<T> = {
  data_per_page?: T;
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    total_data: number;
  };
};

export type PaginatedApiResponse<T> = {
  code: number;
  success: string;
  data: PaginateData<T>;
};

const isServer = () => typeof window === 'undefined';
const context = <GetServerSidePropsContext>{};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  if (config.headers) {
    let token: string | undefined;

    if (isServer()) {
      if (!context)
        throw 'Api Context not found. You must call `setApiContext(context)` before calling api on server-side';

      const cookies = new Cookies(context.req?.headers.cookie);
      token = cookies.get('@myevent/token');
    } else {
      token = getToken();
    }

    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
