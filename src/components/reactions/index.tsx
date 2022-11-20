import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Spin, Typography } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IReaction, ReactionsEnum } from '~/interfaces/reaction-interface'
import { createPostReactionAction } from '~/store/posts/create-post-reaction-action'
import { getPostReactionsAction } from '~/store/posts/get-post-reaction-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import styles from '~/styles/Reaction.module.css'

const { Paragraph } = Typography

const Ractions = () => {
  const dispatch = useAppDispatch()
  const route = useRouter()
  const { id } = route.query
  const isPending = useAppSelector((state: RootState) => state.posts.isPending)
  const user = useAppSelector((state: RootState) => state.user.current)
  const reactions = useAppSelector((state: RootState) => state.posts.currentReactions)
  const [isChanged, setIsChanged] = useState(false)
  const [currentReaction, setCurrentReaction] = useState({
    post_id: id as string,
    user_id: user.id,
    reaction: reactions.myReaction,
  } as IReaction)

  const handleReaction = async (reaction: ReactionsEnum) => {
    if (reaction === currentReaction.reaction) {
      setCurrentReaction({ ...currentReaction, reaction: ReactionsEnum.NOREACT })
    } else {
      setCurrentReaction({ ...currentReaction, reaction: reaction })
    }
    setIsChanged(true)
  }
  useEffect(() => {
    if (id && user) {
      console.log('www')
      dispatch(getPostReactionsAction({ post_id: id, user_id: user.id } as IReaction))
    }
  }, [id, user])

  useEffect(() => {
    if (isChanged) {
      dispatch(createPostReactionAction(currentReaction))
      setIsChanged(false)
      console.log('almost')
    }
  }, [isChanged])

  useEffect(() => {
    setCurrentReaction({ ...currentReaction, post_id: id as string, user_id: user.id, reaction: reactions.myReaction })
  }, [])

  return (
    <Spin spinning={isPending}>
      <div className={styles.container} key={id as string}>
        <Paragraph>Avalie este conteúdo:</Paragraph>
        <button
          onClick={() => handleReaction(ReactionsEnum.LIKE)}
          className={classNames(styles.like, { [styles.likeActive]: reactions.myReaction == ReactionsEnum.LIKE })}
        >
          <LikeOutlined className={styles.likeIcon} />
          <span className={styles.likeNumber}>{reactions.likes}</span>
        </button>
        <button
          onClick={() => handleReaction(ReactionsEnum.DISLIKE)}
          className={classNames(styles.dislike, { [styles.dislikeActive]: reactions.myReaction == ReactionsEnum.DISLIKE })}
        >
          <DislikeOutlined className={styles.likeIcon} />
          <span className={styles.likeNumber}>{reactions.dislikes}</span>
        </button>
      </div>
    </Spin>
  )
}

export default Ractions
