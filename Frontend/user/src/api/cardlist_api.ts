import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const token =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTRaRVRpQVp3OUwtN1hQQWJPN1RxclNjYW9EN1pNQVNTSUNRWEVsLTBzIn0.eyJleHAiOjE3MTE1OTk4NzIsImlhdCI6MTcxMTU2Mzg3MiwianRpIjoiNTMxYWU5MGQtMTQxZi00OGI1LTgwNDgtYTEzZjk3MGZhNzQ4IiwiaXNzIjoiaHR0cHM6Ly8yMDEyNzA0Ny1rZXljbG9hay10cmVsbG8uYXp1cmV3ZWJzaXRlcy5uZXQvcmVhbG1zL3RyZWxsbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5MDllN2I2My1hNWFmLTQ2NmYtOTFiMy05NjNjMTg0MTMwNjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0cmVsbG8iLCJzZXNzaW9uX3N0YXRlIjoiMDJjMzlkMDAtYzNiYy00MWU3LTk0N2YtMDk1YmRjZjliNDI1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3d3dy5rZXljbG9hay5vcmciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXRyZWxsbyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjAyYzM5ZDAwLWMzYmMtNDFlNy05NDdmLTA5NWJkY2Y5YjQyNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiVHJhbiBMb25nIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibG9uZyIsImdpdmVuX25hbWUiOiJUcmFuIiwiZmFtaWx5X25hbWUiOiJMb25nIiwiZW1haWwiOiJsb25nQGdtYWlsLmNvbSJ9.OW1CDQ5vUkjuCsPqeUxK4t71rzFS37Rt3VRJK3V3zqauPzFEJ2mjZmooLKuCsas6f1T7phdXrSKyMAFeT-PCwO6SO2QE1I7PMfHrEIUSVAPZEGpi5HlPJZXFBFb_yBlHcDIBWvgYtzp6qEGbj1yddjAb1d3fc40_SmZ-IMY5MYdmdsZcXWUHoUyLBw2qabXDaReP-M23FfnxUXl-flQ87Rqw4ZIFv4F4phZhnGFk0h84p14BVT4Xlresc1uoWndft8VhIhPrP5G3Vqe16xDkPOaMF6gB-cWcn8gC264b3sDJkz2OhCvWQ4s27vYDiAZO3yt3QPV810TS7j9YzqPhIQ'
export const CardListApiSlice = createApi({
  reducerPath: 'CardlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:10000',
    headers: {
      Authorization: `Bearer ${token}`
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
    }),
    updateCardList: build.mutation<
      TrelloApi.CardlistApi.UpdateCardlistResponse,
      TrelloApi.CardlistApi.UpdateCardlistRequest
    >({
      query: (data) => ({
        method: 'PUT',
        url: '/api/cardlist/update/',
        body: {
          ...data
        }
      })
    })
  })
})
