import type { NextApiRequest, NextApiResponse } from 'next'
import { createPageView } from '~/controllers/pageview-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      createPageView(req, res)
      break
  }
}

export default connectDB(handler)
