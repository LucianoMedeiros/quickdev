import { NextApiRequest, NextApiResponse } from 'next'
import { Comment, CommentInput } from '~/model/post-comments-model'

export const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { description, post_id, user_id, user_name } = req.body

    if (!description || !post_id || !user_id) {
      return res.status(422).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const commentInput: CommentInput = {
      description,
      isActive: true,
      post_id,
      user_id,
      user_name,
    }

    const postComment = await Comment.create(commentInput)

    return res.status(201).json(postComment)
  } catch (error: any) {
    console.error('API-createComment', error)
    return res.status(422).json(error)
  }
}

export const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { description } = req.body

    const comment = await Comment.findById(id)

    if (!comment) {
      return res.status(404).json({ message: `Comentários com o id "${id}" não encontrado.` })
    }

    if (!description) {
      return res.status(422).json({ message: 'Comentário é obrigatório.' })
    }

    await Comment.updateOne({ _id: id }, { description })

    const commentUpdated = await Comment.findById(id)

    return res.status(200).json({ commentUpdated })
  } catch (error: any) {
    console.error('API-updateComment', error)
    return res.status(422).json(error)
  }
}

export const getAllComments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { post_id } = req.query

    const comments = await Comment.find({ post_id: post_id }).sort({ updatedAt: -1 }).exec()

    return res.status(200).json(comments)
  } catch (error: any) {
    console.error('API-getAllPosts', error)
    return res.status(422).json(error)
  }
}
