import type { NextApiRequest, NextApiResponse } from 'next'
import { IReaction } from '~/interfaces/reaction-interface'
import { Reaction, ReactionInput } from '~/model/post-reactions-model'

export const addReaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id, post_id, reaction } = req.body

    if (!user_id || !post_id || reaction === undefined) {
      return res.status(422).json({ message: 'Todos ss campos são obrigatórios.' })
    }

    const reactionInput: ReactionInput = {
      user_id,
      post_id,
      reaction,
    }

    const reactionsLength = await (await Reaction.find({ post_id: post_id, user_id: user_id })).length
    if (reactionsLength > 0) {
      const reactionUpdated = await Reaction.updateOne({ post_id: post_id, user_id: user_id }, reactionInput)
      return res.status(201).json(reactionUpdated)
    } else {
      const reactionCreated = await Reaction.create(reactionInput)
      return res.status(201).json(reactionCreated)
    }
  } catch (error: any) {
    console.error('API-addReaction', error)
    return res.status(422).json(error)
  }
}

export const getPostReactions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { params } = req.query

  const queryParams = params as string[]

  const post_id = queryParams[0]
  const user_id = queryParams[1]

  const reactions = await Reaction.find({ post_id: post_id })

  const likes = reactions.filter(item => item.reaction === 1).length
  const dislikes = reactions.filter(item => item.reaction === -1).length

  const myLike = reactions.filter((item: IReaction) => item.reaction === 1 && item.user_id === user_id).length
  const myDislike = reactions.filter((item: IReaction) => item.reaction === -1 && item.user_id === user_id).length

  const myReaction = getMyReaction(myLike, myDislike)

  return res.status(200).json({
    likes: likes,
    dislikes: dislikes,
    myReaction: myReaction,
  })
}

const getMyReaction = (myLike: number, myDislike: number) => {
  if (myLike) return 1
  if (myDislike) return -1
  return 0
}
