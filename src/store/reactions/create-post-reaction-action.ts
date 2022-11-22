import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIRoutePath } from '~/constants/api-routes'
import { IReaction } from '~/interfaces/reaction-interface'
import { axiosInstance } from '~/utilities/axios-config'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from '../posts/post-reducer'
import { getPostReactionsAction } from './get-post-reaction-action'

export const createPostReactionAction = createAsyncThunk('post/createReaction', async (reaction: IReaction, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  axiosInstance
    .post(APIRoutePath.user.reaction.create, reaction)
    .then(async () => {
      notificationSuccess('Avaliação recebida!', 'Obrigado.', 'top')
      await dispatch(getPostReactionsAction(reaction))
    })
    .catch(error => {
      console.error('createPostAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(PostActions.setIsPending(false))
    })
})
