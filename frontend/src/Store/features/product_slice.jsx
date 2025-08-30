
import { Product_URL } from "../../Base_urls/Base_urls";
import apiSlice from "./apiSlice";

const product_slice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: Product_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    getProductDetail: builder.query({
      query: (id) => ({
        url: `${Product_URL}/${id}`,
      }),
      providesTags: ["Product"],
    }),

    CreateProduct: builder.mutation({
      query: () => ({
        url: Product_URL,
        method: "POST",
      }),
      providesTags: ["Product"],
      invalidatesTags: ["Product"],
    }),

    UpdateProduct: builder.mutation({
      query: (data) => ({
        url: `${Product_URL}/${data.product_Id}`,
        method: "PUT",
      }),
      providesTags: ["Product"],
      invalidatesTags: ["Products"],
    }),

    UploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${Product_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${Product_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getTopProducts: builder.query({
      query: () => `${Product_URL}/top`,
      
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation,useGetTopProductsQuery} = product_slice;
export default product_slice;
