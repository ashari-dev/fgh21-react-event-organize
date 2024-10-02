import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const events = createApi({
  reducerPath: "query/events",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    listEvents: builder.query({
      query: (query) =>
        `/event?search=${query.search}&limit=${query.limit}&page=${query.page}`,
    }),
    getEvent: builder.query({
      query: (id) => `/event/${id}`,
    }),
  }),
});

export const { useListEventsQuery, useGetEventQuery } = events;
