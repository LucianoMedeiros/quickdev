import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '~/controllers/post-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllPosts(req, res)
      break
  }
}

export default connectDB(handler)
