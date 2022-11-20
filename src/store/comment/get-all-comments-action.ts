import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { IComment } from '~/interfaces/comment-interface'
import { notificationError } from '~/utilities/notification'
import { PostActions } from '../posts/post-reducer'

export const getAllCommentsAction = createAsyncThunk('comment/getAll', async (comment: IComment, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  const url = APIRoutePath.post.comment.getAll.replace(':post_id', comment.post_id)

  axios
    .get(url)
    .then(async (result: AxiosResponse) => {
      dispatch(PostActions.setComments(result.data))
    })
    .catch(error => {
      console.error('getAllCommentsAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(PostActions.setIsPending(false))
    })
})
