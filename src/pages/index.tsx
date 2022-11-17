import { Button, Typography } from 'antd'
import { useRouter } from 'next/router'
import { RoutePath } from '~/constants/routes'
import TemplateOnline from '~/template/online'
import styles from '../styles/Home.module.css'

const { Title, Paragraph } = Typography

export default function Home() {
  const route = useRouter()

  const data = [
    { id: '1', title: 'titulo 1', excerpts: 'conteudo resumido 1', featuredImageURL: '' },
    { id: '2', title: 'titulo 2', excerpts: 'conteudo resumido 2', featuredImageURL: '' },
    { id: '3', title: 'titulo 3', excerpts: 'conteudo resumido 3', featuredImageURL: '' },
    { id: '4', title: 'titulo 4', excerpts: 'conteudo resumido 4', featuredImageURL: '' },
  ]

  return (
    <TemplateOnline>
      {data.map(item => (
        <div key={item.id}>
          <Title>{item.title}</Title>
          <img src={item.featuredImageURL} alt={item.title} />
          <Paragraph>{item.excerpts}</Paragraph>
          <Button type="link" onClick={() => route.push(RoutePath.article.replace(':id', item.id))}>
            ver mais
          </Button>
        </div>
      ))}
    </TemplateOnline>
  )
}
