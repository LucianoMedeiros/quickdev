import { Document, Model, model, models, Schema } from 'mongoose'
import IPost from '~/interfaces/post-interface'

type PostDocument = Document & IPost

type PostInput = {
  title: PostDocument['title']
  description: PostDocument['description']
  featureImageURL: PostDocument['featureImageURL']
  version: PostDocument['version']
  isActive: PostDocument['isActive']
  user_id: PostDocument['user_id']
  user_name: PostDocument['user_name']
}

const postSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
    },
    description: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
    },
    featureImageURL: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
    },
    version: {
      type: Schema.Types.Number,
      index: true,
      default: 1,
    },
    isActive: {
      type: Schema.Types.Boolean,
      index: true,
      default: true,
    },
    user_id: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
      index: true,
    },
    user_name: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
      index: true,
    },
  },
  {
    collection: 'post',
    timestamps: true,
  }
)

const Post: Model<PostDocument> = models.Post || model<PostDocument>('Post', postSchema)

export type { PostInput, PostDocument }
export { Post }
