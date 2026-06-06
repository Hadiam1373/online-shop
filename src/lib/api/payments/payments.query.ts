import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { processPayment } from "./payments.api";
import { IPaymentProcess } from "./payments.dto";

export const processPaymentOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IPaymentProcess>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["process-payment"] as const,
  mutationFn: (payload: IPaymentProcess) => processPayment(payload),
  ...(props?.mutationOptions || {}),
});

export const useProcessPayment = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IPaymentProcess>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(processPaymentOptions(props));
