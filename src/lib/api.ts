import axios, { AxiosRequestConfig } from 'axios';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';

export const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const api = axios.create(apiConfig);

api.interceptors.request.use(
  async (config) => {
    const session: Session = (await getSession()) as Session;

    const token = session?.user?.token?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // redirect to login page with signout
      signOut({ callbackUrl: '/login' });
    }
    return Promise.reject(error);
  }
);

export { api };
