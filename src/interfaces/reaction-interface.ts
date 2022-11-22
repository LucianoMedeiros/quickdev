/* eslint-disable no-unused-vars */
export interface IReactionPost {
  likes: number
  dislikes: number
  myReaction: number
}

export interface IReaction {
  _id: string
  post_id: string
  user_id: string
  reaction: ReactionsEnum
}
export enum ReactionsEnum {
  DISLIKE = -1,
  NOREACT = 0,
  LIKE = 1,
}
