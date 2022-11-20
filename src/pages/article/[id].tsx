import { Form, Input, Typography } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Author from '~/components/author-article'
import CommentItem from '~/components/comment-item'
import Ractions from '~/components/reactions'
import { getArticleAction } from '~/store/article/get-article-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import styles from '~/styles/Article.module.css'
import TemplateOnline from '~/template/online'

const { Title, Paragraph } = Typography
const { useForm, Item } = Form
const { TextArea } = Input

const ArticlePage = () => {
  const dispatch = useAppDispatch()
  const article = useAppSelector((state: RootState) => state.article.current)

  const route = useRouter()
  const { id } = route.query

  useEffect(() => {
    if (id) {
      dispatch(getArticleAction(id as string))
    }
  }, [id])

  const commentList = [
    { autor: 'nome do autor 1', id: '1', comment: 'sss', isActive: false, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 2', id: '2', comment: 'fff', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 3', id: '3', comment: 'ddd', isActive: false, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 4', id: '4', comment: '333', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 5', id: '5', comment: 'dddd', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
  ]
  return (
    <TemplateOnline>
      <Title>{article.title}</Title>
      <Author name={article.user_name} date={article.updateAt} />
      {article.featureImageURL && <img src={article.featureImageURL} alt="imagem de destaque" height={'300px'} width={'100%'} />}
      <Paragraph className={styles.descriptionIntern}>{article.description}</Paragraph>
      <Ractions />
      <Form>
        <Item label="Deixe seu comentário">
          <TextArea></TextArea>
        </Item>
      </Form>
      {/* <CommentItem data={commentList} /> */}
    </TemplateOnline>
  )
}

export default ArticlePage
