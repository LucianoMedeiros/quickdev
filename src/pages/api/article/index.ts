import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import connectDB from '~/middleware/mongodb'
import { Post } from '~/model/post-model'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllArticles(req, res)
      break
  }
}

export default connectDB(handler)

const getAllArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const articles: IPost[] = await Post.find().sort({ updatedAt: -1 }).exec()
    return res.status(200).json(articles)
  } catch (error: any) {
    console.error('getAllArticles', error)
    return res.status(422).json(error)
  }
}
