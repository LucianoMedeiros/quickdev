export interface IDashboardPost {
  _id: string
  post_title: string
  comments: number
  likes: number
  dislikes: number
  views: number
}

export interface IDashboardInitialState {
  current: IDashboardPost[]
  isPending: boolean
}
