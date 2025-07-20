import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_URL } from "../../Base_urls/Base_urls";
const apiSlice = createApi({
      reducerPath : "api",
      baseQuery : fetchBaseQuery({baseUrl:Base_URL}),
      tagTypes : ['Product','Order','User'],
      endpoints : ()=>({})
});

export default apiSlice;