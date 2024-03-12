import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
export const CardApiSlice = createApi({
  reducerPath: 'CardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:10000' }),
  endpoints: (build) => ({
    createCard: build.mutation<TrelloApi.CardApi.CreateCardRespond, TrelloApi.CardApi.CreateCardRequest>({
      query: (data) => ({
        url: '/api/card/',
        method: 'POST',
        body: {
          ...data
          // cardlist_id: 'demo_cardlist'
        }
      })
    })
  })
})
