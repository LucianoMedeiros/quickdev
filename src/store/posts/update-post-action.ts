import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { APIRoutePath } from '~/constants/api-routes'
import { saveOnFirebase } from '~/firebase/file-save'
import IPost from '~/interfaces/post-interface'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from './post-reducer'

export const updatePostAction = createAsyncThunk('post/update', async (post: IPost, { dispatch }) => {
  let isSuccess = false
  dispatch(PostActions.setIsPending(true))

  const url = APIRoutePath.post.update.replace(':id', post._id)

  if (post.featureImageURL !== undefined && post.featureImageURL !== '' && !post.featureImageURL.includes('https://')) {
    post.featureImageURL = await saveOnFirebase(post.featureImageURL, nanoid(10), 'featurePosts')
  }

  await axios
    .patch(url, post)
    .then(async (result: AxiosResponse) => {
      notificationSuccess('Sucesso!', 'Post gravado com sucesso.', 'top')
      isSuccess = true
    })
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(async () => {
      if (isSuccess) {
        await versioningExistPost(post._id)
      }
      await dispatch(PostActions.setIsPending(false))
    })

  return isSuccess
})

const versioningExistPost = async (id: string) => {
  const url = APIRoutePath.post.version.create.replace(':post_id', id)

  const urlGET = APIRoutePath.post.get.replace(':id', id)
  await axios.get(urlGET).then(async (result: AxiosResponse) => {
    axios
      .post(url, { newPostVersion: { ...result.data } })
      .then(async (result: AxiosResponse) => {
        console.log('success', result)
      })
      .catch(error => {
        console.error('createPostAction - VersioningExistPost', error)
      })
  })
}
