'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { cookieWrapper } from '@/lib/cookie';
import axiosInstance from '@/lib/axios';

function decodeJwtPayload(token?: string) {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    try {
        const payload = parts[1];
        // base64url -> base64
        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
        const decoded = atob(padded);
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

export default function AdminDebugPage() {
    const [token, setToken] = React.useState<string | undefined>(undefined);
    const [payload, setPayload] = React.useState<any | null>(null);
    const [result, setResult] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    const load = async () => {
        const t = cookieWrapper.get<string>('accessToken');
        setToken(t);
        setPayload(decodeJwtPayload(t));

        setLoading(true);
        setResult(null);
        try {
            const res = await axiosInstance.get('/api/admin/dashboard/stats');
            setResult({ status: res.status, data: res.data });
        } catch (err: any) {
            setResult({ error: true, status: err?.response?.status, data: err?.response?.data, message: err.message });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            load();
        }
    }, []);

    const masked = (t?: string) => {
        if (!t) return '(no token)';
        if (t.length < 20) return t;
        return `${t.slice(0, 10)}...${t.slice(-10)}`;
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='Debug: Admin Auth' />
            <div className='mt-4'>
                <p>
                    Access Token: <strong>{masked(token)}</strong>
                </p>
                <p>Decoded payload:</p>
                <pre className='p-2 bg-muted rounded'>{payload ? JSON.stringify(payload, null, 2) : 'No payload'}</pre>
                <div className='mt-3'>
                    <button className='btn' onClick={load} disabled={loading}>
                        {loading ? 'در حال بررسی...' : 'تست دوباره API'}
                    </button>
                </div>
                <div className='mt-4'>
                    <h4 className='font-semibold'>نتیجه درخواست نمونه</h4>
                    <pre className='p-2 bg-muted rounded'>{result ? JSON.stringify(result, null, 2) : 'هیچ نتیجه‌ای هنوز'}</pre>
                </div>
                <div className='mt-4'>
                    <p className='text-sm text-muted-foreground'>
                        توضیح: این صفحه توکن ذخیره‌شده و پاسخ سرور را نشان می‌دهد تا مشکل 403 را تشخیص دهیم.
                    </p>
                </div>
            </div>
        </div>
    );
}
