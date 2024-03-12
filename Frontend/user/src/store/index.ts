import { configureStore } from '@reduxjs/toolkit'

import { exampleSlice } from './reducers'
import { BoardApiRTQ, CardApiRTQ, CardlistApiRTQ } from '~/api'

export const store = configureStore({
  reducer: {
    exampleReducer: exampleSlice.reducer,
    [BoardApiRTQ.BoardApiSlice.reducerPath]: BoardApiRTQ.BoardApiSlice.reducer,
    [CardApiRTQ.CardApiSlice.reducerPath]: CardApiRTQ.CardApiSlice.reducer,
    [CardlistApiRTQ.CardListApiSlice.reducerPath]: CardlistApiRTQ.CardListApiSlice.reducer
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(BoardApiRTQ.BoardApiSlice.middleware)
      .concat(CardApiRTQ.CardApiSlice.middleware)
      .concat(CardlistApiRTQ.CardListApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
