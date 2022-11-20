import { Col, Row, Typography } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { RoutePath } from '~/constants/portal-routes'
import { IArticle } from '~/interfaces/article-interface'
import styles from '~/styles/Article.module.css'

type Props = {
  item: IArticle
  iterator: number
}
const { Title, Paragraph } = Typography

const ArticleItem = ({ item, iterator }: Props) => {
  const route = useRouter()
  return (
    <Row gutter={40} className={iterator % 2 == 0 ? styles.itemLeft : styles.itemRight}>
      <Col xs={24} sm={12}>
        <div
          onClick={() => route.push(RoutePath.article.replace(':id', item._id))}
          className={styles.boxImage}
          style={{
            backgroundImage: `url(${item.featureImageURL})`,
          }}
        ></div>
      </Col>
      <Col xs={24} sm={12}>
        <Title onClick={() => route.push(RoutePath.article.replace(':id', item._id))}>{item.title}</Title>
        <Paragraph onClick={() => route.push(RoutePath.article.replace(':id', item._id))} className={styles.description}>
          {item.description.substring(0, 300)}
        </Paragraph>
        Postado em: <time>{moment(item.updateAt).format('DD/MM/YY')}</time>
      </Col>
    </Row>
  )
}

export default ArticleItem
