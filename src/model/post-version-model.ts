import { Document, Model, model, models, Schema } from 'mongoose'
import { IPostVersion } from '~/interfaces/post-interface'
import { Post } from './post-model'

type PostVersionDocument = Document & IPostVersion

type PostVersionInput = {
  post_id: PostVersionDocument['post_id']
  versions: PostVersionDocument['versions']
}

const postVersionSchema = new Schema(
  {
    post_id: {
      ref: 'Post',
      type: Schema.Types.ObjectId,
      require: [true, 'Campo obrigatório'],
      index: true,
    },
    versions: {
      type: [Post.modelName],
      require: [true, 'Campo obrigatório'],
    },
  },
  {
    collection: 'versions',
  }
)

const PostVersion: Model<PostVersionDocument> = models.PostVersion || model<PostVersionDocument>('PostVersion', postVersionSchema)

export type { PostVersionInput, PostVersionDocument }
export { PostVersion }
