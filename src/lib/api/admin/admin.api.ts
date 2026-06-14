import axiosInstance from '@/lib/axios';
import {
    IAdminDashboardStatsResponse,
    IAdminUserListResponse,
    IAdminUserDetailResponse,
    IAdminUserRoleUpdateRequest,
    IAdminUserRoleUpdateResponse,
    IAdminUserBanResponse,
    IAdminReportSalesQueryParams,
    IAdminReportSalesResponse,
    IAdminReportProductsQueryParams,
    IAdminReportProductsResponse,
    IAdminReportInventoryQueryParams,
    IAdminReportInventoryResponse,
    IAdminReportCustomersResponse,
} from './admin.dto';

const Base = '/api/admin';

export const getDashboardStats = async (): Promise<IAdminDashboardStatsResponse> => {
    const res = await axiosInstance.get(`${Base}/dashboard/stats`);
    return res.data;
};

export const getAdminUsers = async (params?: URLSearchParams): Promise<IAdminUserListResponse> => {
    const res = await axiosInstance.get(`${Base}/users${params ? `?${params.toString()}` : ''}`);
    return res.data;
};

export const getAdminUser = async (userId: string): Promise<IAdminUserDetailResponse> => {
    const res = await axiosInstance.get(`${Base}/users/${userId}`);
    return res.data;
};

export const changeUserRole = async (userId: string, payload: IAdminUserRoleUpdateRequest): Promise<IAdminUserRoleUpdateResponse> => {
    const res = await axiosInstance.put(`${Base}/users/${userId}/role`, payload);
    return res.data;
};

export const banUser = async (userId: string, payload: { banned: boolean }): Promise<IAdminUserBanResponse> => {
    const res = await axiosInstance.post(`${Base}/users/${userId}/ban`, payload);
    return res.data;
};

export const getReportSales = async (params?: IAdminReportSalesQueryParams): Promise<IAdminReportSalesResponse> => {
    const res = await axiosInstance.get(`${Base}/reports/sales`, { params });
    return res.data;
};

export const getReportProducts = async (params?: IAdminReportProductsQueryParams): Promise<IAdminReportProductsResponse> => {
    const res = await axiosInstance.get(`${Base}/reports/products`, { params });
    return res.data;
};

export const getReportInventory = async (params?: IAdminReportInventoryQueryParams): Promise<IAdminReportInventoryResponse> => {
    const res = await axiosInstance.get(`${Base}/reports/inventory`, { params });
    return res.data;
};

export const getReportCustomers = async (): Promise<IAdminReportCustomersResponse> => {
    const res = await axiosInstance.get(`${Base}/reports/customers`);
    return res.data;
};
