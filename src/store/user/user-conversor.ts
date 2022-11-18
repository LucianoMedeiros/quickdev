import { User } from 'firebase/auth'
import IUser from '~/interfaces/user-interface'

export const userConversorType = (firebaseUser: User): IUser => {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
  }
}
