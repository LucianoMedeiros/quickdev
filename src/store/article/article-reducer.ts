import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'

const slice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
    setAll: (state, { payload }) => {
      state.list = payload
    },
    setArticle: (state, { payload }) => {
      state.current = payload
    },
  },
})

export const ArticleActions = slice.actions

export const articleReducer = slice.reducer
