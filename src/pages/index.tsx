import { Spin } from 'antd'
import { useEffect } from 'react'
import ArticleItem from '~/components/article-item'
import { IArticle } from '~/interfaces/article-interface'
import { getAllArticlesAction } from '~/store/article/get-all-articles-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'

export default function Home() {
  const dispatch = useAppDispatch()
  const isPending = useAppSelector((state: RootState) => state.article.isPending)
  const articleList = useAppSelector((state: RootState) => state.article.list)

  useEffect(() => {
    dispatch(getAllArticlesAction())
  }, [])

  return (
    <TemplateOnline>
      <Spin spinning={isPending}>
        {articleList.map((item, key) => (
          <ArticleItem key={item._id} item={item as IArticle} iterator={key} />
        ))}
      </Spin>
    </TemplateOnline>
  )
}
