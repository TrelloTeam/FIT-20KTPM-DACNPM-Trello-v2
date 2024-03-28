import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const UserApiSlice = createApi({
  reducerPath: 'UserdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:10000' }),
  endpoints: (builder) => ({
    updateUser: builder.mutation<TrelloApi.UserApi.UpdateUserResponse, TrelloApi.UserApi.UpdateUserRequest>({
      query: (data) => ({
        url: '/api/api/user',
        body: data,
        method: 'POST'
      })
    }),
    getUser: builder.query<TrelloApi.UserApi.GetUserResponse, void>({
      query: () => ({
        url: '/api/user',
        method: 'GET'
      })
    }),
    getActivity: builder.query<TrelloApi.UserApi.GetallActivitiesResponse, void>({
      query: (email) => ({
        url: '/api/user/',
        method: 'GET',
        params: { email }
      })
    })
  })
})

export { UserApiSlice }
