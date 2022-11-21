import { Document, Model, model, models, Schema } from 'mongoose'
import { IPageView } from '~/interfaces/pageviews-interface'

type PageViewDocument = Document & IPageView

type PageViewInput = {
  user_id: PageViewDocument['user_id']
  post_id: PageViewDocument['post_id']
}

const pageViewSchema = new Schema(
  {
    post_id: {
      ref: 'Post',
      type: Schema.Types.ObjectId,
      require: [true, 'Campo obrigatório'],
      index: true,
    },
    user_id: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
      index: true,
    },
  },
  {
    collection: 'pageview',
    timestamps: true,
  }
)

const PageView: Model<PageViewDocument> = models.PageView || model<PageViewDocument>('PageView', pageViewSchema)

export type { PageViewInput, PageViewDocument }
export { PageView }
