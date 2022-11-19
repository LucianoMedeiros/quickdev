import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {
  const { id } = req.query
  const data: IPost = { id: id as string, user_id: 'string,', title: 'string', description: 'string', featureImageURL: 'string', status: false }

  res.status(200).json(data)
}
