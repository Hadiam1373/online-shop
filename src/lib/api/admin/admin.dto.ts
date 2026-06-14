export interface IAdminDashboardOverview {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
    totalCategories: number;
    pendingOrders: number;
    averageOrderValue: string;
}

export interface IAdminDashboardTopProduct {
    product: {
        id: string;
        name: string;
    };
    quantity: number;
}

export interface IAdminDashboardStatsResponse {
    overview: IAdminDashboardOverview;
    topProducts: IAdminDashboardTopProduct[];
}

export interface IPaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface IAdminUserListItem {
    id: string;
    email: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
    _count: { orders: number };
}

export interface IAdminUserListResponse {
    data: IAdminUserListItem[];
    pagination: IPaginationMeta;
}

export interface IAdminUserOrderItem {
    id: string;
    total: number;
    status: string;
    createdAt: string;
}

export interface IAdminUserDetailResponse {
    id: string;
    email: string | null;
    phone: string;
    address: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
    orders: IAdminUserOrderItem[];
    _count: {
        orders: number;
        reviews: number;
    };
}

export interface IAdminUserRoleUpdateRequest {
    role: string;
}

export interface IAdminUserRoleUpdateResponse {
    id: string;
    email: string | null;
    role: string;
}

export interface IAdminUserBanRequest {
    banned: boolean;
}

export interface IAdminUserBanResponse {
    message: string;
    userId: string;
    status: string;
}

export interface IAdminReportSalesPeriod {
    startDate?: string;
    endDate?: string;
}

export interface IAdminReportSalesSummary {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: string;
}

export interface IAdminReportSalesDaily {
    date: string;
    revenue: number;
    orders: number;
}

export interface IAdminReportSalesResponse {
    period: IAdminReportSalesPeriod;
    summary: IAdminReportSalesSummary;
    statusBreakdown: Record<string, number>;
    dailySales: IAdminReportSalesDaily[];
}

export interface IAdminReportProductItem {
    id: string;
    name: string;
    price: number;
    stock: number;
    orderCount: number;
    reviewCount: number;
    averageRating: string | number;
}

export interface IAdminReportProductsResponse {
    data: IAdminReportProductItem[];
    pagination: IPaginationMeta;
}

export interface IAdminReportInventoryProduct {
    id: string;
    name: string;
    stock: number;
    price: number;
}

export interface IAdminReportInventoryOutOfStock {
    id: string;
    name: string;
    price: number;
}

export interface IAdminReportInventoryTopStock {
    id: string;
    name: string;
    stock: number;
}

export interface IAdminReportInventorySummary {
    totalLowStock: number;
    totalOutOfStock: number;
}

export interface IAdminReportInventoryResponse {
    lowStockThreshold: number;
    lowStock: IAdminReportInventoryProduct[];
    outOfStock: IAdminReportInventoryOutOfStock[];
    topStock: IAdminReportInventoryTopStock[];
    summary: IAdminReportInventorySummary;
}

export interface IAdminReportCustomersTopCustomer {
    id: string;
    email: string | null;
    _count: { orders: number };
}

export interface IAdminReportCustomersRecentCustomer {
    id: string;
    email: string | null;
    createdAt: string;
}

export interface IAdminReportCustomersResponse {
    topCustomers: IAdminReportCustomersTopCustomer[];
    recentCustomers: IAdminReportCustomersRecentCustomer[];
    activeCustomersLast30Days: number;
    totalCustomers: number;
}

export interface IAdminUsersQueryParams {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
}

export interface IAdminReportSalesQueryParams {
    startDate?: string;
    endDate?: string;
}

export interface IAdminReportProductsQueryParams {
    page?: number;
    limit?: number;
}

export interface IAdminReportInventoryQueryParams {
    threshold?: number;
}
