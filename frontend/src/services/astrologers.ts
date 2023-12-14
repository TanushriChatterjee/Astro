import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Astrologer {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

export const astrologersApi = createApi({
  reducerPath: "astrologersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // Adjust the base URL
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addAstrologer: builder.mutation<Astrologer, Partial<Astrologer>>({
      query: (astrologer) => ({
        url: "/astrologers/register",
        method: "POST",
        body: JSON.stringify(astrologer),
      }),
    }),
    updateAstrologer: builder.mutation<Astrologer, { id: string; data: Partial<Astrologer> }>({
      query: ({ id, data }) => ({
        url: `/astrologers/${id}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
    }),
    getAstrologer: builder.query<Astrologer, string>({
      query: (id) => `/astrologers/${id}`, // Adjust the URL for getting an astrologer by ID
    }),
  }),
});

export const { useAddAstrologerMutation, useUpdateAstrologerMutation, useGetAstrologerQuery  } = astrologersApi;