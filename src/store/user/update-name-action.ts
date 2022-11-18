import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, updateProfile, User } from 'firebase/auth'
import { fbApp } from '~/firebase/config'
import { notificationError } from '~/utilities/notification'
import { UserActions } from './user-reducer'

export const updateUserAction = createAsyncThunk('user/updateUser', async (name: string, { dispatch }) => {
  const auth = getAuth(fbApp)
  dispatch(UserActions.setIsPending(true))

  const user = auth.currentUser as User

  await updateProfile(user, { displayName: name })
    .then(() => {
      dispatch(UserActions.setUser(auth.currentUser))
    })
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(UserActions.setIsPending(false))
    })
})
