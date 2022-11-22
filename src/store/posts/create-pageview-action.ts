import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIRoutePath } from '~/constants/api-routes'
import IPost from '~/interfaces/post-interface'
import { axiosInstance } from '~/utilities/axios-config'
import { PostActions } from './post-reducer'

export const createPageViewAction = createAsyncThunk('post/create', async (post: IPost, { dispatch }) => {
  dispatch(PostActions.setIsPending(true))

  await axiosInstance.post(APIRoutePath.post.pageView, { post_id: post._id, user_id: post.user_id }).finally(async () => {
    dispatch(PostActions.setIsPending(false))
  })
})
