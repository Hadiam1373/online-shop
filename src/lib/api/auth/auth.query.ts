import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  register,
  login,
  requestOtp,
  verifyOtp,
  completeRegistration,
  refreshToken,
  requestPasswordReset,
  resetPassword,
} from "./auth.api";
import {
  IRegisterParams,
  IAuthLoginParams,
  ICompleteRegistration,
  IAuthLoginResponse,
} from "./auth.dto";

export const registerOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IRegisterParams>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["register"] as const,
  mutationFn: (params: IRegisterParams) => register(params),
  ...(props?.mutationOptions || {}),
});

export const useRegister = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IRegisterParams>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(registerOptions(props));

export const loginOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<IAuthLoginResponse, unknown, IAuthLoginParams>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["login"] as const,
  mutationFn: (params: IAuthLoginParams) => login(params),
  ...(props?.mutationOptions || {}),
});

export const useLogin = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<IAuthLoginResponse, unknown, IAuthLoginParams>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(loginOptions(props));

export const requestOtpOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, { phone: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["request-otp"] as const,
  mutationFn: (params: { phone: string }) => requestOtp(params),
  ...(props?.mutationOptions || {}),
});

export const useRequestOtp = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, { phone: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(requestOtpOptions(props));

export const verifyOtpOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      IAuthLoginResponse,
      unknown,
      { phone: string; code: string }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["verify-otp"] as const,
  mutationFn: (params: { phone: string; code: string }) => verifyOtp(params),
  ...(props?.mutationOptions || {}),
});

export const useVerifyOtp = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      IAuthLoginResponse,
      unknown,
      { phone: string; code: string }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(verifyOtpOptions(props));

export const completeRegistrationOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICompleteRegistration>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["complete-registration"] as const,
  mutationFn: (params: ICompleteRegistration) => completeRegistration(params),
  ...(props?.mutationOptions || {}),
});

export const useCompleteRegistration = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICompleteRegistration>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(completeRegistrationOptions(props));

export const refreshTokenOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<IAuthLoginResponse, unknown, { refreshToken: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["refresh-token"] as const,
  mutationFn: (params: { refreshToken: string }) => refreshToken(params),
  ...(props?.mutationOptions || {}),
});

export const useRefreshToken = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<IAuthLoginResponse, unknown, { refreshToken: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(refreshTokenOptions(props));

export const requestPasswordResetOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, { phone: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["request-password-reset"] as const,
  mutationFn: (params: { phone: string }) => requestPasswordReset(params),
  ...(props?.mutationOptions || {}),
});

export const useRequestPasswordReset = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, { phone: string }>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(requestPasswordResetOptions(props));

export const resetPasswordOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, any>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["reset-password"] as const,
  mutationFn: (params: any) => resetPassword(params),
  ...(props?.mutationOptions || {}),
});

export const useResetPassword = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, any>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(resetPasswordOptions(props));
