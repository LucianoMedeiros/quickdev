import { NextApiRequest, NextApiResponse } from 'next'
import { IDashboardPost } from '~/interfaces/dashboard-interface'
import { IReaction } from '~/interfaces/reaction-interface'
import { Post } from '~/model/post-model'

export const getDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.query

    const data = await Post.aggregate([
      { $match: { user_id: user_id } },
      {
        $project: {
          description: 0,
          featureImageURL: 0,
          version: 0,
          isActive: 0,
          user_id: 0,
          user_name: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },

      {
        $lookup: {
          from: 'reactions',
          localField: '_id', //post
          foreignField: 'post_id', //reactions
          as: 'reactions',
        },
      },
      {
        $project: {
          'reactions._id': 0,
          'reactions.post_id': 0,
          'reactions.user_id': 0,
          'reactions.__v': 0,
        },
      },

      {
        $lookup: {
          from: 'comments',
          localField: '_id', //post
          foreignField: 'post_id', //comments
          as: 'comments',
        },
      },
      {
        $project: {
          'comments._id': 0,
          'comments.description': 0,
          'comments.user_name': 0,
          'comments.user_id': 0,
          'comments.isActive': 0,
          'comments.createdAt': 0,
          'comments.updatedAt': 0,
          'comments.__v': 0,
        },
      },
      {
        $lookup: {
          from: 'pageview',
          localField: '_id', //post
          foreignField: 'post_id', //pageview
          as: 'views',
        },
      },
      {
        $project: {
          'views._id': 0,
          'views.user_id': 0,
          'views.createdAt': 0,
          'views.updatedAt': 0,
          'views.__v': 0,
        },
      },
    ])

    const results: IDashboardPost[] = data.map(item => {
      return {
        _id: item._id,
        post_title: item.title,
        comments: item.comments.length,
        likes: item.reactions.filter((r: IReaction) => r.reaction === 1).length,
        dislikes: item.reactions.filter((r: IReaction) => r.reaction === -1).length,
        views: item.views.length,
      } as IDashboardPost
    })

    return res.status(200).json(results)
  } catch (error: any) {
    console.error('API-getDashboard', error)
    return res.status(422).json(error)
  }
}
