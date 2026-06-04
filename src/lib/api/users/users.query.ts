import { queryOptions, useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from './users.api';
import { IUpdateUserProfile } from './users.dto';

type ResponseType = Awaited<ReturnType<typeof getUserProfile>>;

export const getProfileUserOptions = (props: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return queryOptions({
        queryKey: ['user-profile'],
        queryFn: () => getUserProfile(),
        ...props.queryOptions,
    });
};

export const useGetProfile = (props: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return useQuery(getProfileUserOptions(props));
};
export const useUpdateUserProfile = () => {
    return useMutation({
        mutationKey: ['update-profile'],
        mutationFn: (params: IUpdateUserProfile) => updateUserProfile(params),
    });
};
