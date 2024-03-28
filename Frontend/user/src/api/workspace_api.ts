import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TrelloApi } from '@trello-v2/shared'
const token = ''
interface InviteMembers2WorkspaceRequestWithId extends TrelloApi.WorkspaceApi.InviteMembers2WorkspaceRequest {
  id: string | undefined
}

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
    getAllWorkspaceByEmail: builder.query<TrelloApi.WorkspaceApi.WorspaceListByEmailResponse, { email: string }>({
      query: ({ email }) => ({
        url: `/api/workspace/all/${email}`,
        method: 'GET'
      })
    }),
    getOwnerWorkspacebyEmail: builder.query<TrelloApi.WorkspaceApi.WorspaceResponse, { email: string }>({
      query: ({ email }) => ({
        url: `/api/workspace/role/owner/${email}`,
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
      query: () => ({
        url: '/api/workspace',
        method: 'GET'
      })
    }),
    inviteMember2Workspace: builder.mutation<
      TrelloApi.WorkspaceApi.WorspaceResponse,
      InviteMembers2WorkspaceRequestWithId
    >({
      query: (data) => {
        // Omit the id field from the data object
        const { id, ...requestData } = data

        return {
          url: `/api/workspace/invite/${id}`,
          method: 'POST',
          body: { data: requestData }
        }
      }
    }),
    changeWorkspaceVisibility: builder.mutation<void, TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequest>({
      query: (data) => ({
        url: `/api/workspace/visibility`,
        method: 'PUT',
        body: { data }
      })
    }),
    deleteWorkspace: builder.mutation<TrelloApi.WorkspaceApi.WorspaceResponse, { workspace_id: string }>({
      query: (data) => ({
        url: `/api/workspace/${data.workspace_id}`,
        method: 'DELETE'
      })
    })
  })
})

export { WorkspaceApiSlice }
