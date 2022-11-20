import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllArticles } from '~/controllers/article-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getAllArticles(req, res)
      break
  }
}

export default connectDB(handler)
