import { createAsyncThunk } from '@reduxjs/toolkit'
import { fbApp } from '~/firebase/config'
import { IAuthUser } from '~/interfaces/user-interface'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UserActions } from './user-reducer'
import { notificationError } from '~/utilities/notification'

export const loginAction = createAsyncThunk('user/login', async ({ email, password }: IAuthUser, { dispatch }) => {
  const auth = getAuth(fbApp)
  let isSuccess = false
  dispatch(UserActions.setIsPending(true))

  await signInWithEmailAndPassword(auth, email, password)
    .then(credentials => {
      const { user } = credentials
      dispatch(UserActions.setUser(user))
      isSuccess = true
    })
    .catch(error => {
      console.error(error.message)
      notificationError('Erro', error.message, 'top')
      return false
    })
    .finally(() => {
      dispatch(UserActions.setIsPending(false))
    })

  return isSuccess
})
