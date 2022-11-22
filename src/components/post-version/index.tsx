import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import IPost from '~/interfaces/post-interface'
import { RootState, useAppSelector } from '~/store/store-config'
import { sortIsoDate } from '~/utilities/sort-iso-date'

type Props = {
  onChange: (post: IPost) => void
}
const { Link } = Typography

const PostVersions = ({ onChange }: Props) => {
  const versionList = useAppSelector((state: RootState) => state.posts.versionList.versions)
  const post = useAppSelector((state: RootState) => state.posts.current)
  const columns: ColumnsType<IPost> = [
    {
      title: 'Versão',
      dataIndex: 'version',
      key: 'version',
      render: (value: string, record: IPost) => <Link onClick={() => onChange(record)}>Versão {value}</Link>,
    },
    {
      title: 'Data',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      defaultSortOrder: 'descend',
      sorter: (a: IPost, b: IPost) => sortIsoDate(a, b),
      render: (value: string) => moment(value).format('DD/MM/YY - hh:mm:ss'),
    },
    { title: 'Ativo', dataIndex: 'aaa', key: 'aaa', render: (value: string, record: IPost) => (record.version === post.version ? '✅' : '') },
  ]
  return (
    <div>
      <Table
        columns={columns}
        dataSource={versionList}
        rowClassName={record => (record.version === post.version ? 'active' : '')}
        pagination={{ pageSize: 7 }}
      />
    </div>
  )
}

export default PostVersions
