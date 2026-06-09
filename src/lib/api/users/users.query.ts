import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { changePassword, getUserProfile, updateUserProfile } from './users.api';
import { IChangePasswordParams, IUpdateUserProfile, IUserProfileResponse } from './users.dto';

type ResponseType = IUserProfileResponse;
type UpdateVariables = IUpdateUserProfile;

export const getProfileUserOptions = (props?: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return queryOptions({
        queryKey: ['user-profile'] as const,
        queryFn: () => getUserProfile(),
        ...(props?.queryOptions || {}),
    });
};

export const useGetProfile = (props?: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return useQuery(getProfileUserOptions(props));
};

export const updateUserProfileOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<ResponseType, unknown, UpdateVariables>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['update-profile'] as const,
    mutationFn: (params: UpdateVariables) => updateUserProfile(params),
    ...(props?.mutationOptions || {}),
});

export const useUpdateUserProfile = (props?: {
    mutationOptions?: Omit<UseMutationOptions<ResponseType, unknown, UpdateVariables>, 'mutationKey' | 'mutationFn'>;
}) => {
    return useMutation(updateUserProfileOptions(props));
};

export const changePasswordOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, IChangePasswordParams>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['change-password'] as const,
    mutationFn: (params: IChangePasswordParams) => changePassword(params),
    ...(props?.mutationOptions || {}),
});

export const useChangePassword = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, IChangePasswordParams>, 'mutationKey' | 'mutationFn'>;
}) => {
    return useMutation(changePasswordOptions(props));
};
