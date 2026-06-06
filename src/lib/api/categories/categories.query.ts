import {
  queryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories.api";
import { ICategoryInput, ICategory } from "./categories.dto";

export const getCategoriesOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<ICategory[]>, "queryKey">;
}) =>
  queryOptions({
    queryKey: ["categories"] as const,
    queryFn: () => getCategories(),
    ...(props?.queryOptions || {}),
  });

export const useGetCategories = (props?: {
  queryOptions?: Omit<UseQueryOptions<ICategory[]>, "queryKey">;
}) => {
  return useQuery(getCategoriesOptions(props));
};

export const getCategoryOptions = (
  id: string,
  props?: { queryOptions?: Omit<UseQueryOptions<ICategory>, "queryKey"> },
) => {
  return queryOptions({
    queryKey: ["category", id] as const,
    queryFn: () => getCategory(id),
    ...(props?.queryOptions || {}),
  });
};

export const useGetCategory = (
  id: string,
  props?: { queryOptions?: Omit<UseQueryOptions<ICategory>, "queryKey"> },
) => {
  return useQuery(getCategoryOptions(id, props));
};

export const createCategoryOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<ICategory, unknown, ICategoryInput>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["create-category"] as const,
  mutationFn: (payload: ICategoryInput) => createCategory(payload),
  ...(props?.mutationOptions || {}),
});

export const useCreateCategory = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<ICategory, unknown, ICategoryInput>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(createCategoryOptions(props));

export const updateCategoryOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      ICategory,
      unknown,
      { id: string; payload: Partial<ICategoryInput> }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["update-category"] as const,
  mutationFn: ({
    id,
    payload,
  }: {
    id: string;
    payload: Partial<ICategoryInput>;
  }) => updateCategory(id, payload),
  ...(props?.mutationOptions || {}),
});

export const useUpdateCategory = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      ICategory,
      unknown,
      { id: string; payload: Partial<ICategoryInput> }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(updateCategoryOptions(props));

export const deleteCategoryOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["delete-category"] as const,
  mutationFn: (id: string) => deleteCategory(id),
  ...(props?.mutationOptions || {}),
});

export const useDeleteCategory = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(deleteCategoryOptions(props));
