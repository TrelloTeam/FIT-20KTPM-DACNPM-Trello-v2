import { configureStore } from '@reduxjs/toolkit'
import { exampleSlice } from './reducers'
import { BoardApiRTQ, WorkspaceApiRTQ } from '~/api'

export const store = configureStore({
  reducer: {
    exampleReducer: exampleSlice.reducer,
    [BoardApiRTQ.BoardApiSlice.reducerPath]: BoardApiRTQ.BoardApiSlice.reducer,
    [WorkspaceApiRTQ.WorkspaceApiSlice.reducerPath]: WorkspaceApiRTQ.WorkspaceApiSlice.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(BoardApiRTQ.BoardApiSlice.middleware, WorkspaceApiRTQ.WorkspaceApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
