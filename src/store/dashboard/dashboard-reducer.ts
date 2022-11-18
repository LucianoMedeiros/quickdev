import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'dashboard',
  initialState: {},
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
  },
})

export const DashboardActions = slice.actions

export const dashboardReducer = slice.reducer
