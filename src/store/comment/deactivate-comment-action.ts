import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { ActionCommentType } from '~/interfaces/comment-interface'
import { axiosInstance } from '~/utilities/axios-config'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from '../posts/post-reducer'
import { getAllCommentsAction } from './get-all-comments-action'

export const deactivateCommentAction = createAsyncThunk('comment/deactivate', async (comment: ActionCommentType, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  const url = APIRoutePath.post.comment.deactivate.replace(':id', comment._id)

  await axiosInstance
    .patch(url)
    .then(async (result: AxiosResponse) => {
      notificationSuccess('Sucesso!', 'Comentário removido com sucesso.', 'top')
      dispatch(getAllCommentsAction(comment))
    })
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(async () => {
      await dispatch(PostActions.setIsPending(false))
    })
})
