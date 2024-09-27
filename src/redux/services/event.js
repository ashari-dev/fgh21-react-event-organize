import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const events = createApi({
  reducerPath: "query/events",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://103.93.58.89:21216",
  }),
  endpoints: (builder) => ({
    listEvents: builder.query({
      query: (search) => `/event?search=${search}`,
    }),
    getEvent: builder.query({
      query: (id) => `/event/${id}`,
    }),
  }),
});

export const { useListEventsQuery, useGetEventQuery } = events;
