import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from 'types/reducers'

export const categoriesAPI = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query<ICategory, void>({
      query: () => ({
        url: '/categories/',
      }),
      providesTags: ['Categories'],
    }),
  }),
})
