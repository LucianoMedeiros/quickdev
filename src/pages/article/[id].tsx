import { Button, Form, Input, Typography } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Author from '~/components/author-article'
import CommentForm from '~/components/comment-form'
import CommentItem from '~/components/comment-item'
import CommentList from '~/components/comment-list'
import Ractions from '~/components/reactions'
import { getAllComments } from '~/controllers/comment-controller'
import { IComment } from '~/interfaces/comment-interface'
import { getArticleAction } from '~/store/article/get-article-action'
import { getAllCommentsAction } from '~/store/comment/get-all-comments-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import styles from '~/styles/Article.module.css'
import TemplateOnline from '~/template/online'

const { Title, Paragraph } = Typography

const ArticlePage = () => {
  const dispatch = useAppDispatch()
  const article = useAppSelector((state: RootState) => state.article.current)
  const comments = useAppSelector((state: RootState) => state.posts.currentComments)
  const user = useAppSelector((state: RootState) => state.user.current)

  const route = useRouter()
  const { id } = route.query

  useEffect(() => {
    if (id) {
      dispatch(getArticleAction(id as string))
    }
  }, [id])

  useEffect(() => {
    if (id && user) {
      dispatch(getAllCommentsAction({ post_id: id, user_id: user.id } as IComment))
    }
  }, [id, user])

  return (
    <TemplateOnline>
      <Title>{article.title}</Title>
      <Author name={article.user_name} date={article.updateAt} />
      {article.featureImageURL && <img src={article.featureImageURL} alt="imagem de destaque" height={'300px'} width={'100%'} />}
      <Paragraph className={styles.descriptionIntern}>{article.description}</Paragraph>
      <Ractions />

      <CommentForm />
      <CommentList />
    </TemplateOnline>
  )
}

export default ArticlePage
