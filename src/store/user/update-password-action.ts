import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, updatePassword, updateProfile, User } from 'firebase/auth'
import { fbApp } from '~/firebase/config'
import { notificationError } from '~/utilities/notification'
import { UserActions } from './user-reducer'

export const updatePasswordAction = createAsyncThunk('user/updatePassword', async (newPassword: string, { dispatch }) => {
  const auth = getAuth(fbApp)
  dispatch(UserActions.setIsPending(true))

  const user = auth.currentUser as User

  await updatePassword(user, newPassword)
    .then()
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
    })
    .finally(() => {
      dispatch(UserActions.setIsPending(false))
    })
})
