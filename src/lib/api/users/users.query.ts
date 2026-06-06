import {
  queryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "./users.api";
import { IUpdateUserProfile, IUserProfileResponse } from "./users.dto";

type ResponseType = IUserProfileResponse;
type UpdateVariables = IUpdateUserProfile;

export const getProfileUserOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<ResponseType>, "queryKey">;
}) => {
  return queryOptions({
    queryKey: ["user-profile"] as const,
    queryFn: () => getUserProfile(),
    ...(props?.queryOptions || {}),
  });
};

export const useGetProfile = (props?: {
  queryOptions?: Omit<UseQueryOptions<ResponseType>, "queryKey">;
}) => {
  return useQuery(getProfileUserOptions(props));
};

export const updateUserProfileOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<ResponseType, unknown, UpdateVariables>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["update-profile"] as const,
  mutationFn: (params: UpdateVariables) => updateUserProfile(params),
  ...(props?.mutationOptions || {}),
});

export const useUpdateUserProfile = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<ResponseType, unknown, UpdateVariables>,
    "mutationKey" | "mutationFn"
  >;
}) => {
  return useMutation(updateUserProfileOptions(props));
};
