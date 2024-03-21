import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
export const CardListApiSlice = createApi({
  reducerPath: 'CardlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
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
