import { NextApiRequest, NextApiResponse } from 'next'
import IPost from '~/interfaces/post-interface'
import { Post } from '~/model/post-model'

export const getArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const article = await Post.findById(id)

    if (!article) {
      return res.status(404).json({ message: `Artigo com o id "${id}" não encontrado.` })
    }

    return res.status(200).json(article)
  } catch (error: any) {
    console.error('API-getArticle', error)
    return res.status(422).json(error)
  }
}

export const getAllArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const articles: IPost[] = await Post.find().sort({ updatedAt: -1 }).exec()
    return res.status(200).json(articles)
  } catch (error: any) {
    console.error('API-getAllArticles', error)
    return res.status(422).json(error)
  }
}
