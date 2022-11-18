import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initial-state'
import { userConversorType } from './user-conversor'

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsPending: (state, { payload }) => {
      state.isPending = payload
    },
    setUser: (state, { payload }) => {
      const user = userConversorType(payload)
      state.current = user
    },
  },
})

export const UserActions = slice.actions

export const userReducer = slice.reducer
