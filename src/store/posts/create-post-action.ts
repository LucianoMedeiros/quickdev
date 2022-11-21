import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { APIRoutePath } from '~/constants/api-routes'
import { saveOnFirebase } from '~/firebase/file-save'
import IPost from '~/interfaces/post-interface'
import { notificationError, notificationSuccess } from '~/utilities/notification'
import { PostActions } from './post-reducer'
import axios, { AxiosResponse } from 'axios'

export const createPostAction = createAsyncThunk('post/create', async (post: IPost, { dispatch }) => {
  const ret = { isSuccess: false, id: '' }
  dispatch(PostActions.setIsPending(true))

  if (post.featureImageURL !== undefined && post.featureImageURL !== '' && !post.featureImageURL.includes('https://')) {
    post.featureImageURL = await saveOnFirebase(post.featureImageURL, nanoid(10), 'featurePosts')
  }

  await axios
    .post(APIRoutePath.post.create, post)
    .then(async (result: AxiosResponse) => {
      notificationSuccess('Sucesso!', 'Post gravado com sucesso.', 'top')
      ret.isSuccess = true
      ret.id = result.data
    })
    .catch(error => {
      console.error('createPostAction', error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(async () => {
      if (ret.isSuccess) {
        await versioningNewPost(ret.id)
      }
      dispatch(PostActions.setIsPending(false))
    })
  return ret.isSuccess
})

const versioningNewPost = async (id: string) => {
  const url = APIRoutePath.post.version.create.replace(':post_id', id)

  axios.post(url, { isNewPost: true }).catch(error => {
    console.error('createPostAction - VersioningNewPost', error)
  })
}
