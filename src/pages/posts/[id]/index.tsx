import { Button, Form, Input, Typography, Upload } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RoutePath } from '~/constants/routes'
import TemplateOnline from '~/template/online'

const { Title } = Typography
const { Item, useForm } = Form
const { TextArea } = Input

interface IPost {
  image: string
  contentText: string
}
const initialValues = {
  image: '',
  contentText: '',
  title: '',
}

const { Group } = Button

const PostsPage = () => {
  const route = useRouter()
  const [form] = useForm<IPost>()
  const [content, setContent] = useState('')
  const handleSubmit = () => {
    console.log('form', form.getFieldsValue())
  }
  return (
    <TemplateOnline>
      <Title>Artigo Lorem ipsum</Title>

      <Form form={form} layout="vertical">
        <Item name="image" label="Imagem de destaque">
          <Upload>
            <Button type="dashed">adicionar imagem</Button>
          </Upload>
        </Item>
        <Item name="title" label="Título">
          <Input />
        </Item>
        <Item name="contentText" label="Corpo do artigo">
          <TextArea />
        </Item>
        <Group>
          <Button onClick={() => route.push(RoutePath.user.posts)}>voltar</Button>
          <Button htmlType="reset">limpar</Button>
          <Button type="primary" onClick={handleSubmit}>
            salvar
          </Button>
        </Group>
      </Form>
    </TemplateOnline>
  )
}

export default PostsPage
