import { CheckCircleOutlined, CloseCircleOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/router'
import { RoutePath } from '~/constants/portal-routes'
import IPost from '~/interfaces/post-interface'
import { sortIsoDate } from '~/utilities/sort-iso-date'

const usePostColumns = () => {
  const route = useRouter()

  const columns: ColumnsType<IPost> = [
    { title: 'Título', dataIndex: 'title', key: 'title' },
    { title: 'Conteudo', dataIndex: 'description', key: 'description', render: (value: string, record: IPost) => `${value.substring(0, 50)}...` },
    {
      title: 'Destaque',
      dataIndex: 'featureImageURL',
      key: 'featureImageURL',
      render: (value: string, record: IPost) => (value ? <img src={value} alt={record.title} width={100} /> : <p>Sem imagem</p>),
    },

    {
      title: 'Atualizado em',
      align: 'center',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      defaultSortOrder: 'descend',
      sorter: (a: IPost, b: IPost) => sortIsoDate(a, b),
      render: (value: string, record: IPost) => moment(value).format('DD/MM/YYYY HH:MM:SS SSS'),
    },
    {
      align: 'center',
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (value: string, record: IPost) => {
        return (
          <>
            <Tooltip placement="topRight" title="editar">
              <Button
                type="link"
                icon={<EditOutlined />}
                size="large"
                style={{ color: 'blue' }}
                onClick={() => route.push(RoutePath.user.post.replace(':id', record._id))}
              />
            </Tooltip>
            <Tooltip placement="topRight" title="comentários">
              <Button
                type="link"
                icon={<CommentOutlined />}
                size="large"
                style={{ color: 'orange' }}
                onClick={() => route.push(RoutePath.user.comments.replace(':id', record._id))}
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

  return columns
}

export default usePostColumns
