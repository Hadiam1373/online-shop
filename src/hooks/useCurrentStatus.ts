export const currentOrderStatus = (status: string) => {
    console.log('currentOrderStatus', status);
    switch (status) {
        case 'SUCCESS':
            return 'موفق';
        case 'PENDING':
            return 'در انتظار پرداخت';
        case 'PAID':
            return 'پرداخت شده';
        case 'SHIPED':
            return 'ارسال شده';
        case 'DELIVERED':
            return 'تحویل داده شده';
        case 'CANCELLED':
            return 'لغو شده';
        case 'FAILURE':
            return 'ناموفق';
        default:
            return status;
    }
};
