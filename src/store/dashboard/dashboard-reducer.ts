import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
    set: (state, { payload }) => {
      state.current = payload
    },
  },
})

export const DashboardActions = slice.actions

export const dashboardReducer = slice.reducer
