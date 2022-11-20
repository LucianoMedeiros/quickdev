import type { NextApiRequest, NextApiResponse } from 'next'
import { getPost, updatePost } from '~/controllers/post-controller'
import IPost from '~/interfaces/post-interface'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {
  switch (req.method) {
    case 'GET':
      getPost(req, res)
      break
    case 'PATCH':
      updatePost(req, res)
      break
    case 'PUT':
      break
  }
}
