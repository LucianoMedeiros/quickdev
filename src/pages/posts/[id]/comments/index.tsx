import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, PictureOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RoutePath } from '~/constants/portal-routes'
import { ActionCommentType, IComment } from '~/interfaces/comment-interface'
import { deactivateCommentAction } from '~/store/comment/deactivate-comment-action'
import { getAllCommentsAction } from '~/store/comment/get-all-comments-action'
import { getPostAction } from '~/store/posts/get-post-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'

const { Group } = Button
const { Title, Paragraph } = Typography

const CommentListPage = () => {
  const dispatch = useAppDispatch()
  const route = useRouter()
  const { id } = route.query
  const comments = useAppSelector((state: RootState) => state.posts.currentComments)

  const post = useAppSelector((state: RootState) => state.posts.current)
  const user = useAppSelector((state: RootState) => state.user.current)

  const removeComment = async (id: string, post_id: string) => {
    if (confirm('Tem certeze que deseja remover? Esta ação não poderá ser desfeita.')) {
      const commentParams = { post_id: post_id, user_id: user.id, _id: id } as ActionCommentType
      await dispatch(deactivateCommentAction(commentParams))
      await dispatch(getAllCommentsAction(commentParams))
    }
  }

  const columns: ColumnsType<IComment> = [
    { title: 'Comentário', dataIndex: 'description', key: 'description' },
    { title: 'Autor', dataIndex: 'user_name', key: 'user_name' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value: string, record: IComment) =>
        value ? (
          <Button type="link" icon={<CheckCircleOutlined />} size="large" style={{ color: 'green' }}>
            ativo
          </Button>
        ) : (
          <Button type="link" icon={<DeleteOutlined />} size="large" style={{ color: 'tomato' }}>
            removido
          </Button>
        ),
    },
    {
      align: 'center',
      title: 'Data',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: string, record: IComment) => moment(record.updatedAt).format('DD/MM/YYYY'),
    },
    {
      align: 'center',
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (value: string, record: IComment) => {
        return (
          <>
            {record.isActive ? (
              <Tooltip placement="topRight" title="remover">
                <Button
                  onClick={() => removeComment(record._id, record.post_id)}
                  type="link"
                  icon={<DeleteOutlined />}
                  size="large"
                  style={{ color: 'tomato' }}
                />
              </Tooltip>
            ) : (
              <Button type="link" size="large">
                {' - '}
              </Button>
            )}
          </>
        )
      },
    },
  ]

  useEffect(() => {
    if (id) {
      dispatch(getPostAction(id as string))
    }
  }, [id])

  useEffect(() => {
    if (id && user) {
      const commentParams = { post_id: id, user_id: user.id } as ActionCommentType
      dispatch(getAllCommentsAction(commentParams))
    }
  }, [id, user])

  return (
    <TemplateOnline>
      <Title>Comentários do Post</Title>
      <Row gutter={[30, 30]}>
        <Col span={8}>
          <img src={post.featureImageURL} alt={post.title} width={'100%'} style={{ maxHeight: '250px' }} />
        </Col>
        <Col span={16}>
          <Row>
            <Col>
              <Title level={2}>{post.title}</Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Paragraph>{post.description.substring(0, 400)}...</Paragraph>
              <Button type="primary" onClick={() => route.push(RoutePath.user.posts)} style={{ marginTop: '20px' }}>
                voltar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Table columns={columns} dataSource={comments} pagination={{ pageSize: 10 }} />
    </TemplateOnline>
  )
}

export default CommentListPage
