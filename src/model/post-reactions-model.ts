import { Document, Model, model, models, Schema } from 'mongoose'
import { IReaction } from '~/interfaces/post-interface'

type ReactionDocument = Document & IReaction

type ReactionInput = {
  post_id: ReactionDocument['post_id']
  user_id: ReactionDocument['user_id']
  reaction: ReactionDocument['reaction']
}

const reactionSchema = new Schema(
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
    reaction: {
      type: Schema.Types.Number,
      require: [true, 'Campo obrigatório'],
    },
  },
  {
    collection: 'post_reactions',
  }
)

const Reaction: Model<ReactionDocument> = models.Reaction || model<ReactionDocument>('Reaction', reactionSchema)

export type { ReactionInput, ReactionDocument }
export { Reaction }
