import { configureStore } from '@reduxjs/toolkit'

import { exampleSlice, boardListSlice, createBoardDialogSlice } from './reducers'

export const store = configureStore({
  reducer: {
    exampleReducer: exampleSlice.reducer,
    boardListReducer: boardListSlice.reducer,
    createBoardDialogReducer: createBoardDialogSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
