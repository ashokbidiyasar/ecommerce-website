import { EmptyCart } from "./cartSlice";
import apiSlice from "./apiSlice";
import {Order_URL} from "../../Base_urls/Base_urls.js"
const order_slice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateOrder: builder.mutation({
      query: (order) => ({
        url: Order_URL,
        method :"POST",
        body : {...order}
      }),
      providesTags : ['Order']
    }),
  }),
});

export const {useCreateOrderMutation} = order_slice;
