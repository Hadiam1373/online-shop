import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { startZarinpalPayment, verifyZarinpalPayment } from './zarinpal.api';
import {
    IStartZarinpalPaymentRequest,
    IStartZarinpalPaymentResponse,
    IVerifyZarinpalPaymentRequest,
    IVerifyZarinpalPaymentResponse,
} from './zarinpal.dto';

export const startZarinpalPaymentOptions = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IStartZarinpalPaymentResponse, unknown, IStartZarinpalPaymentRequest>,
        'mutationKey' | 'mutationFn'
    >;
}) => ({
    mutationKey: ['start-zarinpal-payment'] as const,
    mutationFn: (payload: IStartZarinpalPaymentRequest) => startZarinpalPayment(payload),
    ...(props?.mutationOptions || {}),
});

export const useStartZarinpalPayment = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IStartZarinpalPaymentResponse, unknown, IStartZarinpalPaymentRequest>,
        'mutationKey' | 'mutationFn'
    >;
}) => useMutation(startZarinpalPaymentOptions(props));

export const verifyZarinpalPaymentOptions = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IVerifyZarinpalPaymentResponse, unknown, IVerifyZarinpalPaymentRequest>,
        'mutationKey' | 'mutationFn'
    >;
}) => ({
    mutationKey: ['verify-zarinpal-payment'] as const,
    mutationFn: (payload: IVerifyZarinpalPaymentRequest) => verifyZarinpalPayment(payload),
    ...(props?.mutationOptions || {}),
});

export const useVerifyZarinpalPayment = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IVerifyZarinpalPaymentResponse, unknown, IVerifyZarinpalPaymentRequest>,
        'mutationKey' | 'mutationFn'
    >;
}) => useMutation(verifyZarinpalPaymentOptions(props));
