import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { notificationError } from '~/utilities/notification'
import { ArticleActions } from './article-reducer'

export const getAllArticlesAction = createAsyncThunk('post/getAll', async (_, { dispatch }) => {
  dispatch(ArticleActions.setIsPending(true))

  const url = APIRoutePath.article.getAll

  axios
    .get(url)
    .then(async (result: AxiosResponse) => {
      dispatch(ArticleActions.setAll(result.data))
    })
    .catch(error => {
      console.error('getAllArticlesAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(ArticleActions.setIsPending(false))
    })
})
