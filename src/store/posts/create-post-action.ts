import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { getAuth } from 'firebase/auth'
import { APIRoutePath } from '~/constants/api-routes'
import { fbApp } from '~/firebase/config'
import { saveOnFirebase } from '~/firebase/file-save'
import IPost from '~/interfaces/post-interface'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from './post-reducer'

export const createPostAction = createAsyncThunk('post/create', async (post: IPost, { dispatch }) => {
  let isSuccess = false
  dispatch(PostActions.setIsPending(true))

  if (post.featureImageURL !== undefined && !post.featureImageURL.includes('https://')) {
    post.featureImageURL = await saveOnFirebase(post.featureImageURL, nanoid(10), 'featurePosts')
  }

  await fetch(APIRoutePath.post.create, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.message) {
        console.error(result.message)
        notificationError('Erro', result.message, 'top')
      }
      if (result.data) {
        dispatch(PostActions.setAll(result.data))
        notificationSuccess('Sucesso!', 'Post gravado com sucesso.', 'top')
        isSuccess = true
      }
    })
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(PostActions.setIsPending(false))
    })

  return isSuccess
})
