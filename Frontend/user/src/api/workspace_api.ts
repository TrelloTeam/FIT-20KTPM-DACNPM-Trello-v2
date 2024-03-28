import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const token = ''
const WorkspaceApiSlice = createApi({
  reducerPath: 'WorkspaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:10000',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  endpoints: (builder) => ({
    createWorkspace: builder.mutation<
      TrelloApi.WorkspaceApi.WorspaceResponse,
      TrelloApi.WorkspaceApi.CreateWorspaceRequest
    >({
      query: (data) => ({
        url: '/api/worspace',
        body: data,
        method: 'POST'
      })
    }),
    getAllWorkspace: builder.query<TrelloApi.WorkspaceApi.WorspaceListByEmailResponse, void>({
      query: () => ({
        url: '/api/workspace/all/long@gmail.com',
        method: 'GET'
      })
    }),
    updateWorkspace: builder.mutation<
      TrelloApi.WorkspaceApi.WorspaceResponse,
      TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequest
    >({
      query: (data) => ({
        url: '/api/workspace',
        method: 'PUT',
        body: data
      })
    }),
    getWorkspaceInfo: builder.query<TrelloApi.WorkspaceApi.WorspaceResponse, void>({
      query: (data) => ({
        url: '/api/workspace',
        method: 'GET',
        body: data
      })
    })
  })
})

export { WorkspaceApiSlice }
