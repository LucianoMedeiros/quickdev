export default interface IUser {
  id: string
  name: string | null
  email: string | null
  emailVerified: boolean
}

export interface IUserInitialState {
  current: IUser
  isPending: boolean
}

export interface IAuthUser {
  email: string
  password: string
}
