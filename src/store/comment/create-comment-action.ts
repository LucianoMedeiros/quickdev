import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { getAllComments } from '~/controllers/comment-controller'
import { IComment } from '~/interfaces/comment-interface'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from '../posts/post-reducer'
import { getAllCommentsAction } from './get-all-comments-action'

export const createCommentAction = createAsyncThunk('comment/create', async (comment: IComment, { dispatch }) => {
  let isSuccess = false
  dispatch(PostActions.setIsPending(true))

  await axios
    .post(APIRoutePath.post.comment.create, comment)
    .then(async (result: AxiosResponse) => {
      notificationSuccess('Sucesso!', 'Post gravado com sucesso.', 'top')
      await dispatch(getAllCommentsAction(comment))
      isSuccess = true
    })
    .catch(error => {
      console.error('createCommentAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(async () => {
      dispatch(PostActions.setIsPending(false))
    })
  return isSuccess
})
