import axios from 'axios';
import { cookieWrapper } from './cookie';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

//  Request interceptor
axiosInstance.interceptors.request.use(config => {
    const token = cookieWrapper.get('accessToken');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

//  Response interceptor
axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = cookieWrapper.get('refreshToken');

                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { refreshToken });

                const newAccessToken = res.data.accessToken;

                cookieWrapper.set('accessToken', newAccessToken);

                axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);

                cookieWrapper.delete('accessToken');
                cookieWrapper.delete('refreshToken');

                window.location.href = '/auth/login';

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
