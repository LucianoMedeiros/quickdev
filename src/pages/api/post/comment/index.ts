import type { NextApiRequest, NextApiResponse } from 'next'
import { createComment, updateComment } from '~/controllers/comment-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      createComment(req, res)
      break
  }
}

export default connectDB(handler)
