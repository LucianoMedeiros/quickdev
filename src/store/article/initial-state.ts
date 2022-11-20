import { IArticleInitialState } from '~/interfaces/article-interface'

export const initialState: IArticleInitialState = {
  current: {
    _id: '',
    title: '',
    description: '',
    featureImageURL: '',
    isActive: false,
    user_id: '',
    version: 0,
  },
  list: [],
  isPending: false,
}
