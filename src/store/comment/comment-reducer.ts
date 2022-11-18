import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comment',
  initialState: {},
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
  },
})

export const CommentActions = slice.actions

export const commentReducer = slice.reducer
