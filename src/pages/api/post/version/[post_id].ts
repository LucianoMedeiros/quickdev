import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '~/middleware/mongodb'
import { Post } from '~/model/post-model'
import { PostVersion, PostVersionInput } from '~/model/post-version-model'

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

const getPostVersions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { post_id } = req.query

    const version = await PostVersion.findOne({ post_id: post_id })

    return res.status(200).json(version)
  } catch (error: any) {
    console.error('API-getPostVersions', error)
    return res.status(422).json(error)
  }
}
const createPostVersion = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { post_id } = req.query
    const { isNewPost, newPostVersion } = req.body
    // const version = await PostVersion.findOne({ post_id: post_id })
    if (isNewPost) {
      const post = await Post.findById(post_id)
      const postVersionInput: PostVersionInput = {
        post_id: post_id as string,
        versions: post ? [post.toJSON()] : [],
      }

      await PostVersion.create(postVersionInput)
      return res.status(200).json({ data: 'version created' })
    } else {
      const version = await PostVersion.findOne({ post_id: post_id })
      const currentVersion = version?.toJSON()
      currentVersion?.versions.push(newPostVersion)

      await PostVersion.updateOne({ _id: currentVersion?._id }, { ...currentVersion })
      return res.status(200).json({ data: 'version incremented' })
    }
  } catch (error: any) {
    console.error('API-createPostVersion', error)
    return res.status(422).json(error)
  }
}
