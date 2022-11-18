/* eslint-disable @next/next/no-img-element */
import { CheckCircleOutlined, CloseCircleOutlined, CommentOutlined, EditOutlined, PictureOutlined } from '@ant-design/icons'
import { Button, Col, Grid, Row, Table, Tooltip, Typography } from 'antd'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { RoutePath } from '~/constants/portal-routes'
import TemplateOnline from '~/template/online'

const { Group } = Button
const { Title, Paragraph } = Typography

interface IPostComments {
  id: string
  comment: string
  author: string
  createAt: string
  isActive: boolean
}

const CommentListPage = () => {
  const route = useRouter()
  const { id } = route.query

  const data = [
    { isActive: true, id: '1', comment: 'Fala muito', author: 'Lorem da Silva', createAt: '2022-11-17T18:51:19.347Z' },
    { isActive: true, id: '2', comment: 'Não gostei... muito fraco', author: 'Lorem da Silva', createAt: '2022-11-17T18:51:19.347Z' },
    { isActive: false, id: '3', comment: 'Adorei!!! Mudou minha vida.', author: 'Lorem da Silva', createAt: '2022-11-17T18:51:19.347Z' },
    { isActive: false, id: '4', comment: 'Pode ser melhor', author: 'Lorem da Silva', createAt: '2022-11-17T18:51:19.347Z' },
  ]

  const columns: ColumnsType<IPostComments> = [
    { title: 'Comentário', dataIndex: 'comment', key: 'comment' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { align: 'center', title: 'Data', dataIndex: 'createAt', key: 'createAt', render: (value: string, record) => moment(value).format('DD/MM/YYYY') },
    {
      align: 'center',
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (value: string, record) => {
        return (
          <>
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
      <Title>Comentários do Post {id}</Title>
      <Row gutter={[30, 30]}>
        <Col>
          <PictureOutlined style={{ fontSize: 200 }} />
        </Col>
        <Col>
          <Row>
            <Col>
              <Title level={2}>Titulo do post</Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        footer={() => (
          <Button type="primary" onClick={() => route.push(RoutePath.user.posts)}>
            voltar
          </Button>
        )}
      />
    </TemplateOnline>
  )
}

export default CommentListPage
