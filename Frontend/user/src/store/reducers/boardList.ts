import { createSlice } from '@reduxjs/toolkit'
import { BoardSubset } from '~/pages'
import { RootState } from '..'

export interface BoardListState {
  boards: BoardSubset[]
}

const initialState: BoardListState = {
  boards: []
}

export const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload)
    }
  }
})

export const { addBoard } = boardListSlice.actions

export const selectBoardList = (state: RootState) => state.boardListReducer

export default boardListSlice.reducer
