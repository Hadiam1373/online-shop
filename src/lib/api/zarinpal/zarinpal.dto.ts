export interface IStartZarinpalPaymentRequest {
    orderId: string;
}

export interface IStartZarinpalPaymentResponse {
    paymentUrl: string;
    authority?: string;
}

export interface IVerifyZarinpalPaymentRequest {
    authority: string;
    orderId: string;
}

export interface IVerifyZarinpalPaymentResponse {
    success: boolean;
    message: string;
    refId?: string;
}
