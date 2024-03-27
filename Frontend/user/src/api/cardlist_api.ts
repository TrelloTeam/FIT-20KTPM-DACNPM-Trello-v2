import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
import { USER_TOKEN } from './common'
export const CardListApiSlice = createApi({
  reducerPath: 'CardlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:10000',
    headers: {
      Authorization: `Bearer ${USER_TOKEN.trim()}`
    }
  }),
  endpoints: (build) => ({
    getAllCardlist: build.query<TrelloApi.CardlistApi.GetallCardlistResponse, void>({
      query: () => ({
        url: '/api/cardlist'
      })
    }),
    createCardlist: build.mutation<
      TrelloApi.CardlistApi.CreateCardlistResponse,
      TrelloApi.CardlistApi.CreateCardlistRequest
    >({
      query: (data) => ({
        method: 'POST',
        url: '/api/cardlist/create',
        body: {
          ...data
        }
      })
    })
  })
})
