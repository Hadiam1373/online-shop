import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
} from "./wishlist.api";
import {
  IWishlistResponse,
  IWishlistItemResponse,
  IWishlistActionResponse,
  IAddToWishlistParams,
  IRemoveFromWishlistParams,
} from "./wishlist.dto";

// Query keys
const wishlistKeys = {
  all: ["wishlist"] as const,
  list: (page: number, limit: number) =>
    [...wishlistKeys.all, "list", page, limit] as const,
  check: (productId: string) =>
    [...wishlistKeys.all, "check", productId] as const,
};

// Options builder for getWishlist query
function getWishlistOptions(
  page = 1,
  limit = 10,
  props?: Omit<UseQueryOptions<IWishlistResponse>, "queryKey" | "queryFn">,
): UseQueryOptions<IWishlistResponse> {
  return {
    queryKey: wishlistKeys.list(page, limit),
    queryFn: () => getWishlist(page, limit),
    ...props,
  };
}

// Options builder for addToWishlist mutation
function addToWishlistOptions(
  props?: Omit<
    UseMutationOptions<
      IWishlistItemResponse,
      unknown,
      IAddToWishlistParams
    >,
    "mutationKey" | "mutationFn"
  >,
): UseMutationOptions<IWishlistItemResponse, unknown, IAddToWishlistParams> {
  return {
    mutationKey: ["addToWishlist"],
    mutationFn: addToWishlist,
    ...props,
  };
}

// Options builder for removeFromWishlist mutation
function removeFromWishlistOptions(
  props?: Omit<
    UseMutationOptions<
      IWishlistActionResponse,
      unknown,
      IRemoveFromWishlistParams
    >,
    "mutationKey" | "mutationFn"
  >,
): UseMutationOptions<
  IWishlistActionResponse,
  unknown,
  IRemoveFromWishlistParams
> {
  return {
    mutationKey: ["removeFromWishlist"],
    mutationFn: removeFromWishlist,
    ...props,
  };
}

// Options builder for clearWishlist mutation
function clearWishlistOptions(
  props?: Omit<
    UseMutationOptions<IWishlistActionResponse, unknown, void>,
    "mutationKey" | "mutationFn"
  >,
): UseMutationOptions<IWishlistActionResponse, unknown, void> {
  return {
    mutationKey: ["clearWishlist"],
    mutationFn: clearWishlist,
    ...props,
  };
}

// Hooks
export function useGetWishlist(
  page = 1,
  limit = 10,
  props?: Omit<UseQueryOptions<IWishlistResponse>, "queryKey" | "queryFn">,
) {
  return useQuery(getWishlistOptions(page, limit, props));
}

export function useAddToWishlist(
  props?: Omit<
    UseMutationOptions<
      IWishlistItemResponse,
      unknown,
      IAddToWishlistParams
    >,
    "mutationKey" | "mutationFn"
  >,
) {
  return useMutation(addToWishlistOptions(props));
}

export function useRemoveFromWishlist(
  props?: Omit<
    UseMutationOptions<
      IWishlistActionResponse,
      unknown,
      IRemoveFromWishlistParams
    >,
    "mutationKey" | "mutationFn"
  >,
) {
  return useMutation(removeFromWishlistOptions(props));
}

export function useClearWishlist(
  props?: Omit<
    UseMutationOptions<IWishlistActionResponse, unknown, void>,
    "mutationKey" | "mutationFn"
  >,
) {
  return useMutation(clearWishlistOptions(props));
}

export function useCheckWishlist(productId: string) {
  return useQuery({
    queryKey: wishlistKeys.check(productId),
    queryFn: () => checkWishlist(productId),
  });
}

// Re-export for convenience
export { wishlistKeys };
