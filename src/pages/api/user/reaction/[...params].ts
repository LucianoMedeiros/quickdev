import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostReactions } from '~/controllers/reaction-controller'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      getPostReactions(req, res)
      break
  }
}
