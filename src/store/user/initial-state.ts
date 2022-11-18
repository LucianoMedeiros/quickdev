import { IUserInitialState } from '~/interfaces/user-interface'

export const initialState: IUserInitialState = {
  current: {
    id: '',
    name: null,
    email: '',
    emailVerified: false,
  },
  isPending: false,
}
