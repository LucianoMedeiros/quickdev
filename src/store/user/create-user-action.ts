import { createAsyncThunk } from '@reduxjs/toolkit'
import { fbApp } from '~/firebase/config'
import { IAuthUser } from '~/interfaces/user-interface'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UserActions } from './user-reducer'
import { notificationError } from '~/utilities/notification'

export const createUserAction = createAsyncThunk('user/signup', async ({ email, password }: IAuthUser, { dispatch }) => {
  const auth = getAuth(fbApp)
  let isSuccess = false
  dispatch(UserActions.setIsPending(true))

  await createUserWithEmailAndPassword(auth, email, password)
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
