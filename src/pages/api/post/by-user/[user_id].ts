import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import connectDB from '~/middleware/mongodb'
import { Post } from '~/model/post-model'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllPosts(req, res)
      break
  }
}

export default connectDB(handler)

const getAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.query
    const posts: IPost[] = await Post.find({ user_id: user_id })
    return res.status(200).json(posts)
  } catch (error: any) {
    console.error('getAllPosts', error)
    return res.status(422).json(error)
  }
}
