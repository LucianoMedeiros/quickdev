import { IComment } from './comment-interface'
import { ITimestamp } from './common-interface'
import { IReactionPost } from './reaction-interface'

export default interface IPost extends ITimestamp {
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

export interface IPostViews {
  views: number
}

export interface IPostInitialState {
  versionList: IPostVersion
  currentReactions: IReactionPost
  currentComments: IComment[]
  current: IPost
  list: IPost[]
  isPending: boolean
}
