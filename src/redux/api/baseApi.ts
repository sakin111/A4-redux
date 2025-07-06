

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://a4-server-redux.vercel.app/api/" }),

    tagTypes: ["books", "borrows"],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => "/books",
            providesTags: ["books"],

        }),
        createBooks: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),

        updateBooks: builder.mutation({
            query: ({ id, ...bookData }) => ({
                url: `/edit-book/${id}`,
                method: "PUT",
                body: bookData,
            }),
            invalidatesTags: ["books"],
        }),
        deleteBooks: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"

            }),
            invalidatesTags: ["books"],
        }),
        borrowBooks: builder.mutation({
            query: ({ bookId, quantity, dueDate }) => ({
                url: `/borrow/${bookId}`,
                method: "POST",
                body: { quantity, dueDate },
            }),
            invalidatesTags: ["books", "borrows"],
        }),

        getBookById: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ["books"],
        }),

        borrowSummery : builder.query({
            query: () => "/borrow",
            providesTags: ["borrows"],
        })

    })

});

export const { useGetAllBooksQuery, useCreateBooksMutation, useUpdateBooksMutation, useDeleteBooksMutation, useBorrowBooksMutation, useGetBookByIdQuery, useBorrowSummeryQuery } = baseApi