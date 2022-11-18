import { IPostInitialState } from '~/interfaces/post-interface'

export const initialState: IPostInitialState = {
  current: {
    id: '',
    user_id: '',
    title: '',
    description: '',
    featureImageURL: '',
    status: false,
  },
  list: [],
  isPending: false,
}
