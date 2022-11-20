import { Button, Table, Typography } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RoutePath } from '~/constants/portal-routes'
import { getAllPostsAction } from '~/store/posts/get-all-posts-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'
import usePostColumns from './colums-post-hook'

const { Title } = Typography

const PostsPage = () => {
  const route = useRouter()
  const dispatch = useAppDispatch()
  const postList = useAppSelector((state: RootState) => state.posts.list)
  const user = useAppSelector((state: RootState) => state.user.current)

  const columns = usePostColumns()

  useEffect(() => {
    dispatch(getAllPostsAction(user.id))
  }, [])

  return (
    <TemplateOnline>
      <Title>Artigos</Title>

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={postList}
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
