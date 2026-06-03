import { queryOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserProfile } from './users.api';

type ResponseType = Awaited<ReturnType<typeof getUserProfile>>;


export const getProfileUserOptions = (props: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return queryOptions({
        queryKey: ['user-profile'],
        queryFn: () => getUserProfile(),
    });
};

export const useGetProfile = (props: { queryOptions?: Omit<UseQueryOptions<ResponseType>, 'queryKey'> }) => {
    return useQuery(getProfileUserOptions(props));
};

