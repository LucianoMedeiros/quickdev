import { Table, Typography } from 'antd'
import React from 'react'
import TemplateOnline from '~/template/online'

const { Title } = Typography

const DashboardPage = () => {
  const columns = [
    { title: 'Título', dataIndex: 'title', key: 'title' },
    { title: 'Comentários', dataIndex: 'comments', key: 'comments' },
    { title: 'Visualizações', dataIndex: 'pageViews', key: 'pageViews' },
    { title: 'Curtidas', dataIndex: 'likes', key: 'likes' },
    { title: 'Não Curtidas', dataIndex: 'dislikes', key: 'dislikes' },
  ]
  return (
    <TemplateOnline>
      <Title>Relatório</Title>
      <Table columns={columns} pagination={{ pageSize: 10 }} />
    </TemplateOnline>
  )
}

export default DashboardPage

// - a. Título;
// - b. Quantos comentários eles possuem;
// - c. Quantas visualizações;
// - d. Quantas curtidas;
// - e. Quantas não curtidas;
