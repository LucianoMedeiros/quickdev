import type { NextApiRequest, NextApiResponse } from 'next'
import { getDashboard } from '~/controllers/dashboard-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getDashboard(req, res)
      break
  }
}

export default connectDB(handler)
