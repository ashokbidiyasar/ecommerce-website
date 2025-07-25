import { User_URL } from "../../Base_urls/Base_urls";
import apiSlice from "./apiSlice";

const user_slice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${User_URL}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${User_URL}/logout`,
        method: "POST",
      }),
      providesTags: ["User"],
    }),
    register : builder.mutation({
        query : (data)=>({
            url : `${User_URL}/register`,
            method : "POST",
            body : data
        })
    })
  }),
});

export const { useLoginMutation,useLogoutMutation,useRegisterMutation } = user_slice;
