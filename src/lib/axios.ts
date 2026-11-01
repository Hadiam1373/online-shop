import axios from 'axios';
import { cookieWrapper } from './cookie';
import { toast } from 'sonner';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
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

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const res = await axiosInstance.post('api/auth/refresh', { refreshToken });

                const newAccessToken = res.data.accessToken;

                cookieWrapper.set('accessToken', newAccessToken);

                axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

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
        toast.error(error.response?.data?.message_fa, {
            style: {
                border: '1px solid #ff4d4f',
                color: '#ff4d4f',
            },
        });

        return Promise.reject(error);
    },
);

export default axiosInstance;
