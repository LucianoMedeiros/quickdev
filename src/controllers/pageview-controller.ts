import { NextApiRequest, NextApiResponse } from 'next'
import { PageView, PageViewInput } from '~/model/post-pageview-model'

export const createPageView = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id, post_id } = req.body

    if (!user_id || !post_id) {
      return res.status(422).json({ message: 'Todos os campos são obrigatórios.' })
    }

    const pageViewInput: PageViewInput = {
      user_id,
      post_id,
    }

    let pageViewCreated = await PageView.create(pageViewInput)
    pageViewCreated.toJSON()

    return res.status(201).json(pageViewCreated.id)
  } catch (error: any) {
    console.error('API-createPageView', error)
    return res.status(422).json(error)
  }
}
