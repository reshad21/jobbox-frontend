import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUser } from '../app/authSlice';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // endpoints: (builder) => ({})
  tagTypes: ['jobs'],
  endpoints: (builder) => ({
    // auth api
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(getUser(data.email));
        } catch (err) {
          //hudai
        }
      },
    }),

    // job post api
    postJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['jobs'],
    }),

    applyJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // invalidatesTags: ['jobs'],
    }),
    question: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/query",
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // invalidatesTags: ['jobs'],
    }),

    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),

    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ['jobs'],
    }),

    jobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
    }),

  }),
})

export const { useRegisterMutation, usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useApplyJobMutation, useGetAppliedJobsQuery, useQuestionMutation } = apiSlice;