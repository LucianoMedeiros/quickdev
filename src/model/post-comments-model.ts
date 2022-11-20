import { Document, Model, model, models, Schema } from 'mongoose'
import { IComment } from '~/interfaces/comment-interface'

type CommentDocument = Document & IComment

type CommentInput = {
  description: CommentDocument['description']
  post_id: CommentDocument['post_id']
  user_id: CommentDocument['user_id']
  user_name: CommentDocument['user_name']
  isActive: CommentDocument['isActive']
}

const commentSchema = new Schema(
  {
    description: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
    },
    user_name: {
      type: Schema.Types.String,
      require: [true, 'Campo obrigatório'],
    },
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
    isActive: {
      type: Schema.Types.Boolean,
      index: true,
      default: true,
    },
  },
  {
    collection: 'comments',
    timestamps: true,
  }
)

const Comment: Model<CommentDocument> = models.Comment || model<CommentDocument>('Comment', commentSchema)

export type { CommentInput, CommentDocument }
export { Comment }
