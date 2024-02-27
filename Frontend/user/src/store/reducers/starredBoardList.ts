import { createSlice } from '@reduxjs/toolkit'
import { BoardSubset } from '~/pages'
import { RootState } from '..'

export interface StarredBoardListState {
  boards: BoardSubset[]
}

const initialState: StarredBoardListState = {
  boards: []
}

export const starredBoardListSlice = createSlice({
  name: 'starredBoardList',
  initialState,
  reducers: {
    addStarredBoard: (state, action) => {
      state.boards.push(action.payload)
    },
    removeStarredBoard: (state, action) => {
      const boardIdToRemove = action.payload
      state.boards = state.boards.filter((board) => board._id !== boardIdToRemove)
    },
  }
})

export const { addStarredBoard, removeStarredBoard } = starredBoardListSlice.actions

export const selectStarredBoardList = (state: RootState) => state.starredBoardListReducer

export default starredBoardListSlice.reducer
