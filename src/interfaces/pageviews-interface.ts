import { ITimestamp } from './common-interface'

export interface IPageView extends ITimestamp {
  _id: string
  user_id: string
  post_id: string
}
