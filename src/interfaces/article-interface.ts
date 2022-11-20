import IPost from './post-interface'

export interface IArticle extends IPost {
  updateAt: string
}

export interface IArticleInitialState {
  current: IArticle
  list: IArticle[]
  isPending: boolean
}
