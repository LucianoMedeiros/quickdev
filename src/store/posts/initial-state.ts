import { IPostInitialState } from '~/interfaces/post-interface'

export const initialState: IPostInitialState = {
  current: {
    _id: '',
    user_id: '',
    title: '',
    description: '',
    featureImageURL: '',
    version: 1,
    isActive: false,
  },
  versionList: {
    _id: '',
    post_id: '',
    versions: [],
  },
  list: [],
  isPending: false,
}
