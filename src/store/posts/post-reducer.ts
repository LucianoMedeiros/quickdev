import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
  },
})

export const PostActions = slice.actions

export const postReducer = slice.reducer
