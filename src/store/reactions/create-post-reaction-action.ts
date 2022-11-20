import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { IReaction } from '~/interfaces/reaction-interface'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { getPostReactionsAction } from './get-post-reaction-action'
import { PostActions } from '../posts/post-reducer'

export const createPostReactionAction = createAsyncThunk('post/createReaction', async (reaction: IReaction, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  axios
    .post(APIRoutePath.user.reaction.create, reaction)
    .then(async (result: AxiosResponse) => {
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
