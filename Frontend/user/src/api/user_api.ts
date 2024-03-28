import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const UserApiSlice = createApi({
  reducerPath: 'UserdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:10000' }),
  endpoints: (builder) => ({
    updateUser: builder.mutation<TrelloApi.UserApi.UpdateUserResponse, TrelloApi.UserApi.UpdateUserRequest>({
      query: (data) => ({
        url: `/api/user/${data.email}`,
        body: data,
        method: 'PUT'
      })
    }),
    getUserByEmail: builder.query<TrelloApi.UserApi.GetUserResponse, { email: string }>({
      query: ({ email }) => ({
        url: `/api/user/${email}`,
        method: 'GET'
      })
    }),
    getActivities: builder.query<TrelloApi.UserApi.GetallActivitiesResponse, { email: string }>({
      query: ({ email }) => ({
        url: `/api/user/${email}`,
        method: 'GET'
      })
    }),
    getWorkspaceById: builder.query<TrelloApi.UserApi.GetUserResponse, { email: string }>({
      query: ({ email }) => ({
        url: `/api/user/workspace/${email}`,
        method: 'GET'
      })
    })
  })
})

export { UserApiSlice }
