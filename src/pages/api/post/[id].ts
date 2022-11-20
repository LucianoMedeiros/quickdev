import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import { Post } from '~/model/post-model'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {
  switch (req.method) {
    case 'GET':
      getPost(req, res)
      break
    case 'PATCH':
      updatePost(req, res)
      break
    case 'PUT':
      break
  }
}

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { user_id, user_name, title, description, featureImageURL, version } = req.body

    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ message: `Post com o id "${id}" não encontrado.` })
    }

    if (!user_id && !title && !description && !featureImageURL) {
      return res.status(422).json({ message: 'Você precisa de pelo menos um campo para alteração' })
    }

    await Post.updateOne({ _id: id }, { user_id, title, description, featureImageURL, version, user_name })

    const postUpdated = await Post.findById(id)

    return res.status(200).json({ data: postUpdated })
  } catch (error: any) {
    console.error(error)
    return res.status(422).json(error)
  }
}

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ message: `Post com o id "${id}" não encontrado.` })
    }

    return res.status(200).json(post)
  } catch (error: any) {
    console.error(error)
    return res.status(422).json(error)
  }
}
