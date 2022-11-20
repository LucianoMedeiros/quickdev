import { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import { Post, PostInput } from '~/model/post-model'

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id, user_name, title, description, featureImageURL, version } = req.body
    console.log('req.body', req.body)
    if (!user_id || !title || !description) {
      return res.status(422).json({ message: 'Os campos user_id, title, description, featureImageURL são obrigatórios.' })
    }

    const postInput: PostInput = {
      user_id,
      title,
      description,
      featureImageURL,
      version,
      user_name,
      isActive: true,
    }

    let postCreated = await Post.create(postInput)
    postCreated.toJSON()

    return res.status(201).json(postCreated.id)
  } catch (error: any) {
    console.error('API-createPost', error)
    return res.status(422).json(error)
  }
}

export const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
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

export const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ message: `Post com o id "${id}" não encontrado.` })
    }

    return res.status(200).json(post)
  } catch (error: any) {
    console.error('API-getPost', error)
    return res.status(422).json(error)
  }
}

export const getAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.query
    const posts: IPost[] = await Post.find({ user_id: user_id })
    return res.status(200).json(posts)
  } catch (error: any) {
    console.error('API-getAllPosts', error)
    return res.status(422).json(error)
  }
}
