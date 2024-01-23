import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../'

export interface ExampleState {
  title: string
}

const initialState: ExampleState = {
  title: ''
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state, action) => {
      state.title = action.payload
    }
  }
})

export const { setExample } = exampleSlice.actions

export const selectExample = (state: RootState) => state.exampleReducer

export default exampleSlice.reducer
