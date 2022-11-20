import type { NextApiRequest, NextApiResponse } from 'next'
import { createPost } from '~/controllers/post-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      createPost(req, res)
      break
  }
}

export default connectDB(handler)
