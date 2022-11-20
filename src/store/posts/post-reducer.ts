import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
    setAll: (state, { payload }) => {
      state.list = payload
    },
    setCurrent: (state, { payload }) => {
      state.current = payload
    },
    setVersion: (state, { payload }) => {
      state.versionList = payload
    },
    setReactions: (state, { payload }) => {
      state.currentReactions = payload
    },
  },
})

export const PostActions = slice.actions

export const postReducer = slice.reducer
