import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import connectDB from '~/middleware/mongodb'
import { Post, PostInput } from '~/model/post-model'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllPosts(req, res)
      break
    case 'POST':
      createPost(req, res)
      break
  }
}

export default connectDB(handler)

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.status(200).json(['createPost', req.method])
  try {
    const { user_id, title, description, featureImageURL } = req.body
    console.log('req.body', req.body)
    if (!user_id || !title || !description || featureImageURL == undefined || featureImageURL == null) {
      return res.status(422).json({ message: 'Os campos user_id, title, description, featureImageURL são obrigatórios.' })
    }

    const postInput: PostInput = {
      user_id,
      title,
      description,
      featureImageURL,
      status: true,
    }

    const postCreated = await Post.create(postInput)

    return res.status(201).json({ data: postCreated })
  } catch (error: any) {
    console.error(error)
    return res.status(422).json(error)
  }
}
const getAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.status(200).json(['getAllPosts', req.method])
  try {
    const posts: IPost[] = await Post.find().sort({ updateAt: 'desc' }).exec()
    return res.status(200).json(posts)
  } catch (error: any) {
    console.error(error)
    return res.status(422).json(error)
  }
}
