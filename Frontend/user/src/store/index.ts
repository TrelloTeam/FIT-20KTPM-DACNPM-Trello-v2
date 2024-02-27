import { configureStore } from '@reduxjs/toolkit'

import { exampleSlice, boardListSlice, createBoardDialogSlice, starredBoardListSlice } from './reducers'

export const store = configureStore({
  reducer: {
    exampleReducer: exampleSlice.reducer,
    boardListReducer: boardListSlice.reducer,
    starredBoardListReducer: starredBoardListSlice.reducer,
    createBoardDialogReducer: createBoardDialogSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
