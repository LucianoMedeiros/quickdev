import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { NextRouter } from 'next/router'
import { RoutePath } from '~/constants/routes'
import { fbApp } from '~/firebase/config'
import { AppDispatch } from '../store-config'
import { UserActions } from './user-reducer'

export const getAuthUserOnReload = (dispatch: AppDispatch, route: NextRouter) => {
  dispatch(UserActions.setIsPending(true))
  const auth = getAuth(fbApp)

  onAuthStateChanged(auth, user => {
    if (user) {
      dispatch(UserActions.setUser(user))
    } else {
      route.push(RoutePath.auth.login)
    }
    dispatch(UserActions.setIsPending(false))
  })
}
