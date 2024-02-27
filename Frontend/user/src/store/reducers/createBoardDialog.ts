import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface CreateBoardDialogState {
  isOpen: boolean
}

const initialState: CreateBoardDialogState = {
  isOpen: false
}

export const createBoardDialogSlice = createSlice({
  name: 'createBoardDialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true
    },
    closeDialog: (state) => {
      state.isOpen = false
    }
  }
})

export const { openDialog, closeDialog } = createBoardDialogSlice.actions

export const selectCreateBoardDialog = (state: RootState) => state.createBoardDialogReducer

export default createBoardDialogSlice.reducer
