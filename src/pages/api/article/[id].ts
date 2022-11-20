import type { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import { Post } from '~/model/post-model'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPost>) {
  switch (req.method) {
    case 'GET':
      getArticle(req, res)
      break
  }
}

const getArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const article = await Post.findById(id)

    if (!article) {
      return res.status(404).json({ message: `Artigo com o id "${id}" não encontrado.` })
    }

    return res.status(200).json(article)
  } catch (error: any) {
    console.error(error)
    return res.status(422).json(error)
  }
}
