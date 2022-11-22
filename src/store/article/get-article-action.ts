import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { axiosInstance } from '~/utilities/axios-config'
import { notificationError } from '~/utilities/notification'
import { ArticleActions } from './article-reducer'

export const getArticleAction = createAsyncThunk('post/getArticle', async (id: string, { dispatch }) => {
  dispatch(ArticleActions.setIsPending(true))

  const url = APIRoutePath.article.get.replace(':id', id)

  axiosInstance
    .get(url)
    .then(async (result: AxiosResponse) => {
      dispatch(ArticleActions.setArticle(result.data))
    })
    .catch(error => {
      console.error('getAllArticlesAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(ArticleActions.setIsPending(false))
    })
})
