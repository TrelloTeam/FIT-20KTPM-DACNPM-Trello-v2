import { configureStore } from '@reduxjs/toolkit'

import { exampleSlice } from './reducers'
import { BoardApiRTQ } from '~/api'

export const store = configureStore({
  reducer: {
    exampleReducer: exampleSlice.reducer,
    [BoardApiRTQ.BoardApiSlice.reducerPath]: BoardApiRTQ.BoardApiSlice.reducer
  },
  middleware: (getDefault) => getDefault().concat(BoardApiRTQ.BoardApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
