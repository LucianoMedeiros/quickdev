import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import connectDB from '~/middleware/mongodb'
import { Post, PostInput } from '~/model/post-model'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      createPost(req, res)
      break
  }
}

export default connectDB(handler)

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
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
    console.error('createPost', error)
    return res.status(422).json(error)
  }
}
