
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
    register: builder.mutation({
      query: (data) => ({
        url: `${User_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: `${User_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["User"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: `${User_URL}/users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${User_URL}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${User_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${User_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileUpdateMutation,useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation } = user_slice;
