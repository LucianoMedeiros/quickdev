import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { notificationError } from '~/utilities/notification'
import { DashboardActions } from './dashboard-reducer'

export const getDashboardAction = createAsyncThunk('dashboard/get', async (user_id: string, { dispatch }) => {
  dispatch(DashboardActions.setIsPending(true))

  const url = APIRoutePath.post.dashboard.replace(':user_id', user_id)

  await axios
    .get(url)
    .then(async (result: AxiosResponse) => {
      dispatch(DashboardActions.set(result.data))
    })
    .catch(error => {
      console.error('getPostAction', error)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(DashboardActions.setIsPending(false))
    })
})
