import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
const DATABASE_URL = `mongodb+srv://AdminDB:APnQTKdb25OlcJbL@cluster0.mqmb761.mongodb.net/?retryWrites=true&w=majority`

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  mongoose.connect(DATABASE_URL, {
    dbName: 'blogDB',
  })
  return handler(req, res)
}

export default connectDB
