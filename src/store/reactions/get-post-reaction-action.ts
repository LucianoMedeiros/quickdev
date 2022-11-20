import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { IReaction } from '~/interfaces/reaction-interface'
import { notificationError } from '~/utilities/notification'
import { PostActions } from '../posts/post-reducer'

export const getPostReactionsAction = createAsyncThunk('post/getReactions', async ({ post_id, user_id }: IReaction, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  const url = APIRoutePath.user.reaction.getByPost.replace(':post_id', post_id).replace(':user_id', user_id)

  await axios
    .get(url)
    .then(async (result: AxiosResponse) => {
      dispatch(PostActions.setReactions(result.data))
    })
    .catch(error => {
      console.error('getPostAction', error)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(PostActions.setIsPending(false))
    })
})
