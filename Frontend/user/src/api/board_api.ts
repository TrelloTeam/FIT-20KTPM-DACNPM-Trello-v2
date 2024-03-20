import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const BoardApiSlice = createApi({
  reducerPath: 'BoardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:10000' }),
  endpoints: (builder) => ({
    createBoard: builder.mutation<TrelloApi.BoardApi.CreateBoardResponse, TrelloApi.BoardApi.CreateBoard>({
      query: (data) => ({
        url: '/api/board/createBoard',
        body: data,
        method: 'POST'
      })
    }),
    getAllBoard: builder.query<TrelloApi.BoardApi.GetallBoardResponse, void>({
      query: () => ({
        url: '/api/board',
        method: 'GET'
      })
    })
  })
})

export { BoardApiSlice }
