import { IArticleInitialState } from '~/interfaces/article-interface'

export const initialState: IArticleInitialState = {
  current: {
    _id: '',
    title: '',
    description: '',
    featureImageURL: '',
    isActive: false,
    user_id: '',
    user_name: '',
    version: 0,
  },
  list: [],
  isPending: false,
}
