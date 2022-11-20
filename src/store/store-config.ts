import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { articleReducer } from './article/article-reducer'
import { dashboardReducer } from './dashboard/dashboard-reducer'
import { postReducer } from './posts/post-reducer'
import { userReducer } from './user/user-reducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    dashboard: dashboardReducer,
    article: articleReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Appthunk = ThunkAction<void, RootState, null, Action<string>>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
