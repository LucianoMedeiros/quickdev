import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Form, Input, Tag, Typography } from 'antd'
import moment from 'moment'
import React from 'react'
import CommentItem from '~/components/comment-item'
import Ractions from '~/components/reactions'
import TemplateOnline from '~/template/online'

const { Title, Paragraph } = Typography
const { useForm, Item } = Form
const { TextArea } = Input

const ArticlePage = () => {
  const commentList = [
    { autor: 'nome do autor 1', id: '1', comment: 'sss', isActive: false, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 2', id: '2', comment: 'fff', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 3', id: '3', comment: 'ddd', isActive: false, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 4', id: '4', comment: '333', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
    { autor: 'nome do autor 5', id: '5', comment: 'dddd', isActive: true, createAt: '2022-11-17T18:51:19.347Z' },
  ]
  return (
    <TemplateOnline>
      <Title>Título</Title>
      <img src="" alt="imagem de destaque" />
      <Paragraph>Conteudo</Paragraph>
      <Ractions />
      <Form>
        <Item label="Deixe seu comentário">
          <TextArea></TextArea>
        </Item>
      </Form>
      <CommentItem data={commentList} />
    </TemplateOnline>
  )
}

export default ArticlePage
