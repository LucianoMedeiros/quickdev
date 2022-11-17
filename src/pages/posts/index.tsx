import { CheckCircleOutlined, CloseCircleOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Table, Typography, Tooltip, Badge } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useRouter } from 'next/router'
import React from 'react'
import { RoutePath } from '~/constants/routes'
import TemplateOnline from '~/template/online'

interface IPostList {
  id: string
  title: string
  comments: number
  pageViews: number
  likes: number
  dislikes: number
  isActive: boolean
}

const { Group } = Button
const { Title } = Typography

const PostsPage = () => {
  const route = useRouter()
  const { id } = route.query

  const data = [
    { isActive: true, id: '1', title: 'Título 1', comments: 30, pageViews: 45, likes: 987, dislikes: 0 },
    { isActive: true, id: '2', title: 'Título 2', comments: 43, pageViews: 43, likes: 87, dislikes: 7 },
    { isActive: false, id: '3', title: 'Título 3', comments: 23, pageViews: 32, likes: 98, dislikes: 8 },
    { isActive: false, id: '4', title: 'Título 4', comments: 65, pageViews: 12, likes: 78, dislikes: 2 },
  ]

  const columns: ColumnsType<IPostList> = [
    { title: 'Título', dataIndex: 'title', key: 'title' },
    { align: 'center', title: 'Comentários', dataIndex: 'comments', key: 'comments' },
    { align: 'center', title: 'Visualizações', dataIndex: 'pageViews', key: 'pageViews' },
    { align: 'center', title: 'Curtidas', dataIndex: 'likes', key: 'likes' },
    { align: 'center', title: 'Não Curtidas', dataIndex: 'dislikes', key: 'dislikes' },
    {
      align: 'center',
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (value: string, record: IPostList) => {
        return (
          <>
            <Tooltip placement="topRight" title="editar">
              <Button
                type="link"
                icon={<EditOutlined />}
                size="large"
                style={{ color: 'blue' }}
                onClick={() => route.push(RoutePath.user.post.replace(':id', record.id))}
              />
            </Tooltip>
            <Tooltip placement="topRight" title="comentários">
              <Button
                type="link"
                icon={<CommentOutlined />}
                size="large"
                style={{ color: 'orange' }}
                onClick={() => route.push(RoutePath.user.comments.replace(':id', record.id))}
              />
            </Tooltip>
            {record.isActive ? (
              <Tooltip placement="topRight" title="desativar">
                <Button type="link" icon={<CloseCircleOutlined />} size="large" style={{ color: 'tomato' }} />
              </Tooltip>
            ) : (
              <Tooltip placement="topRight" title="ativar">
                <Button type="link" icon={<CheckCircleOutlined />} size="large" style={{ color: 'green', fontSize: '20px' }} />
              </Tooltip>
            )}
          </>
        )
      },
    },
  ]
  return (
    <TemplateOnline>
      <Title>Artigos</Title>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        footer={() => (
          <Button type="primary" onClick={() => route.push(RoutePath.user.newPost)}>
            criar novo artigo
          </Button>
        )}
      />
    </TemplateOnline>
  )
}

export default PostsPage
