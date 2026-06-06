import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { validateCoupon, createCoupon } from "./coupons.api";
import { ICouponInput } from "./coupons.dto";

export const validateCouponOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["validate-coupon"] as const,
  mutationFn: (code: string) => validateCoupon(code),
  ...(props?.mutationOptions || {}),
});

export const useValidateCoupon = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(validateCouponOptions(props));

export const createCouponOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICouponInput>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["create-coupon"] as const,
  mutationFn: (payload: ICouponInput) => createCoupon(payload),
  ...(props?.mutationOptions || {}),
});

export const useCreateCoupon = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICouponInput>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(createCouponOptions(props));
