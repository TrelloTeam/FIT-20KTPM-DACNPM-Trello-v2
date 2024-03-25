import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
export const CardListApiSlice = createApi({
  reducerPath: 'CardlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:10000',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTRaRVRpQVp3OUwtN1hQQWJPN1RxclNjYW9EN1pNQVNTSUNRWEVsLTBzIn0.eyJleHAiOjE3MTEzODAyMzgsImlhdCI6MTcxMTM3OTMzOCwianRpIjoiYjJiMjAzODAtNDVlYS00NWU5LWE2ZGEtMzJiMzc5MDY1NmJhIiwiaXNzIjoiaHR0cHM6Ly8yMDEyNzA0Ny1rZXljbG9hay10cmVsbG8uYXp1cmV3ZWJzaXRlcy5uZXQvcmVhbG1zL3RyZWxsbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiZmU1MDM2NC00Yzc4LTQ5ZTctOTk5Ni0xZjllZWVlODAxOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0cmVsbG8iLCJzZXNzaW9uX3N0YXRlIjoiZmQ3NDY1MWQtZGU3Zi00NmE2LWE3ZTItMWU1MzI0NmE4ZGM3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtdHJlbGxvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZmQ3NDY1MWQtZGU3Zi00NmE2LWE3ZTItMWU1MzI0NmE4ZGM3IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJsYW0gaG9hbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMSIsImdpdmVuX25hbWUiOiJsYW0iLCJmYW1pbHlfbmFtZSI6ImhvYW5nIiwiZW1haWwiOiJtYWlsbWFpbEBnYWFtYWlsLmNvbSJ9.XJKGEDzJjc6PJTXMImSo7wjtZAUfP9lWSEwuZYG-MPUKKJc_XpEsL-T2-UlVJP9OoLPTx5jo5AMkwxJdln1WBTIIHH0JPYytNJiUJq1ldDua2R5uu3jdSe23d_EX9Av1lG7lWbsCTqH0fTwtKZ9_pbJqOnMZMrJVv_P6dKLM_8MVVhxqH9sdDrBTfMRekY6R9ahvLLiYJUtTljY_mg7vj_arx1LE8r5zZBB8Cu1518Tm0SxOEUEP8BVkW7S6daDSqikM2uTrOaETHw7R2wVvhjeoYUWz1Bp4Oh2ce2ATUy5DPPHgynde7zJAIk84pNIU4hwDdUGVtUT0GxkfesZeyg'
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
