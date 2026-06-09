
import { Product_URL, UPLOAD_URL } from "../../Base_urls/Base_urls";
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
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    // #fix: removed providesTags (only for queries), fixed invalidatesTags to "Products"
    // so the product list refreshes after a new product is created
    CreateProduct: builder.mutation({
      query: () => ({
        url: Product_URL,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),

    // #fix: added body: data so the update payload is actually sent;
    // removed providesTags (only for queries), kept invalidatesTags for both tags
    UpdateProduct: builder.mutation({
      query: (data) => ({
        url: `${Product_URL}/${data.product_Id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),

    // #fix: /api/uploads → /api/upload (matches the backend route exactly)
    UploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),

    // #fix: replaced providesTags with invalidatesTags so the list refreshes after delete
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${Product_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = product_slice;

export default product_slice;
