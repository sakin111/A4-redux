

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    tagTypes: ["books"],
    endpoints: (builder) =>({
        getAllBooks: builder.query({
            query: () => "/books",
            providesTags:["books"]
        }),
        createBooks: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags:["books"]
        }),

    })

});

export const {useGetAllBooksQuery, useCreateBooksMutation} = baseApi