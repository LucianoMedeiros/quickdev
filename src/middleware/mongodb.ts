import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { cors, runMiddleware } from './cors'

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    await runMiddleware(req, res, cors)
    return handler(req, res)
  }

  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
    dbName: process.env.NEXT_PUBLIC_MONGODB_DATABASE_NAME,
  })

  await runMiddleware(req, res, cors)
  return handler(req, res)
}

export default connectDB
