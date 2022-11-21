import { ITimestamp } from './common-interface'

export interface IComment extends ITimestamp {
  _id: string
  user_id: string
  user_name: string
  post_id: string
  description: string
  isActive: boolean
}

export type ActionCommentType = {
  _id: string
  post_id: string
  user_id: string
}
