import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

function calculateAge(birthday: string) {
  const ageDifMs = Date.now() - new Date(birthday).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/users/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: {
          ...userData,
          years: calculateAge(userData.birthdate),
          nameInitials: `${userData.name[0]}${userData.lastName[0]}`,
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
})

export const { useAddUserMutation } = userApi
