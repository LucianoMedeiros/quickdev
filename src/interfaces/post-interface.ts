export default interface IPost {
  _id: string
  title: string
  description: string
  featureImageURL: any
  version: number
  isActive: boolean
  user_id: string
  user_name: string
}

export interface IPostVersion {
  _id: string
  post_id: string
  versions: IPost[]
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

export interface IPostInitialState {
  versionList: IPostVersion
  current: IPost
  list: IPost[]
  isPending: boolean
}
