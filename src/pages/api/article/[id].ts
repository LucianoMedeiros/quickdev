import type { NextApiRequest, NextApiResponse } from 'next'
import { getArticle } from '~/controllers/article-controller'
import IPost from '~/interfaces/post-interface'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {
  switch (req.method) {
    case 'GET':
      getArticle(req, res)
      break
  }
}
