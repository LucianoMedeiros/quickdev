import type { NextApiRequest, NextApiResponse } from 'next'
import { createPostVersion, getPostVersions } from '~/controllers/post-version-controller'
import connectDB from '~/middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getPostVersions(req, res)
      break
    case 'POST':
      createPostVersion(req, res)
      break
  }
}

export default connectDB(handler)
