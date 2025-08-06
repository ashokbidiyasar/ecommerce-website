import { EmptyCart } from "./cartSlice";
import apiSlice from "./apiSlice";
import { Order_URL, Stripe_URL } from "../../Base_urls/Base_urls.jsx";

const order_slice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateOrder: builder.mutation({
      query: (order) => ({
        url: Order_URL,
        method: "POST",
        body: { ...order },
      }),
      providesTags: ["Order"],
    }),
    GetOrderDetail: builder.query({
      query: (order) => ({
        url: `${Order_URL}/${order}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${Order_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
      providesTags: ["Order"],
    }),
    createStripeSession: builder.mutation({
      query: ({ orderId, orderItems, totalPrice }) => ({
        url: `${Stripe_URL}/create-checkout-session/${orderId}`,
        method: "POST",
        body: { orderItems, totalPrice },
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${Order_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders : builder.query({
      query : ()=>({
        url :  Order_URL
      }),
      providesTags : ['Order']
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${Order_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailQuery, usePayOrderMutation, useCreateStripeSessionMutation,useGetOrdersQuery,useGetAllOrdersQuery,useDeliverOrderMutation } =
  order_slice;
