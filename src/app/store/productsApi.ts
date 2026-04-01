import { api } from "@app/store/api";
import type {
  ProductSortField,
  ProductSortOrder,
} from "@app/store/productTableSlice";
import type { ProductParams, ProductsResponse } from "@shared/types/products";

type GetProductsParams = ProductParams & {
  sortBy?: ProductSortField;
  order?: ProductSortOrder;
};

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, GetProductsParams | undefined>({
      query: (params) => {
        const query = params?.q?.trim();

        return {
          url: query ? "/products/search" : "/products",
          params: {
            ...params,
            q: query || undefined,
          },
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
