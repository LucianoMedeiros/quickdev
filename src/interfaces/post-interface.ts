export default interface IPost {
  id: string
  user_id: string
  title: string
  description: string
  featureImageURL: any
  status: boolean
}
export interface IReactionPost {
  likes: ReactionPostType
  dislikes: ReactionPostType
}

type ReactionPostType = {
  count: number
  hasClicked: boolean
}

export interface IReaction {
  id: string
  post_id: string
  user_id: string
  reaction: ReactionsEnum
}

export enum ReactionsEnum {
  DISLIKE = -1,
  NOREACT = 0,
  LIKE = 1,
}

export interface IPostViews {
  views: number
}

export interface IPost_React_Views extends IReactionPost, IPost, IPostViews {}

export interface IPostInitialState {
  current: IPost
  list: IPost_React_Views[]
  isPending: boolean
}
