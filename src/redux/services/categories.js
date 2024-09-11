import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categories = createApi({
  reducerPath: "query/categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    listcategories: builder.query({
      query: () => `/category`,
    }),
    getCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
  }),
});

export const { useListcategoriesQuery, useGetCategoryQuery } = categories;
