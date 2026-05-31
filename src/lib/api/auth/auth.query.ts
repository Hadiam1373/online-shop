import {
  mutationOptions,
  useMutation, UseMutationOptions, UseQueryOptions
} from "@tanstack/react-query";
import {login, register, requestOTP, verifyOTP} from "./auth.api";
import {ILoginParams, IOtpBody, IRegisterParams, IVerifyOtpBody} from "./auth.dto";


export const useLogin = () => {
  return useMutation({
    mutationFn: (params: ILoginParams) => login(params),
    mutationKey: ["login"],
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (params: IRegisterParams) => register(params),
    mutationKey: ["register"],
  });
};

export const useOtpRequest = () => {
  return useMutation({
    mutationKey:['otp'],
    mutationFn:(params: IOtpBody) => requestOTP(params),
  })
}

export const useOtpVerify = () => {
  return useMutation({
    mutationKey:['otp'],
    mutationFn:(params: IVerifyOtpBody) => verifyOTP(params),
  })
}


