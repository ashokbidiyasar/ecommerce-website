import { Product_URL } from "../../Base_urls/Base_urls";
import apiSlice from "./apiSlice";

const product_slice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: Product_URL,
      }),
      providesTags: ["Product"],
    }),

    getProductDetail: builder.query({
      query: (id) => ({
        url: `${Product_URL}/${id}`, 
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = product_slice;
export default product_slice;
