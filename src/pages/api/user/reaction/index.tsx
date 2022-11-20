import type { NextApiRequest, NextApiResponse } from 'next'
import { addReaction } from '~/controllers/reaction-controller'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      addReaction(req, res)
      break
  }
}
