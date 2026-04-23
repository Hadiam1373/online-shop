import {
    useMutation
} from "@tanstack/react-query";
import { login, register } from "./auth.api";
import { ILoginParams, IRegisterParams } from "./auth.dto";

export const uselogin = () => {
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
