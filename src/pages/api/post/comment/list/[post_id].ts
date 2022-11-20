import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllComments } from '~/controllers/comment-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllComments(req, res)
      break
  }
}

export default connectDB(handler)
