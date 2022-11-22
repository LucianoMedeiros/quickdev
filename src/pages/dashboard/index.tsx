import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { IDashboardPost } from '~/interfaces/dashboard-interface'
import { getDashboardAction } from '~/store/dashboard/get-dashboard-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'

const { Title } = Typography

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user.current)
  const data = useAppSelector((state: RootState) => state.dashboard.current)

  const columns: ColumnsType<IDashboardPost> = [
    { title: 'Título', dataIndex: 'post_title', key: 'post_title' },
    { title: 'Comentários', dataIndex: 'comments', key: 'comments', align: 'center' },
    { title: 'Visualizações', dataIndex: 'views', key: 'views', align: 'center' },
    { title: 'Curtidas', dataIndex: 'likes', key: 'likes', align: 'center' },
    { title: 'Não Curtidas', dataIndex: 'dislikes', key: 'dislikes', align: 'center' },
  ]

  useEffect(() => {
    dispatch(getDashboardAction(user.id))
  }, [user])

  return (
    <TemplateOnline>
      <Title>Relatório</Title>
      <Table columns={columns} pagination={{ pageSize: 10 }} dataSource={data} />
    </TemplateOnline>
  )
}

export default DashboardPage
