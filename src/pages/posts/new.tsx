import { Button, Form, Input, Typography, Upload } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RoutePath } from '~/constants/portal-routes'
import IPost from '~/interfaces/post-interface'
import TemplateOnline from '~/template/online'

const { Title } = Typography
const { Item, useForm } = Form
const { TextArea } = Input

const { Group } = Button

const PostsPage = () => {
  const route = useRouter()
  const [form] = useForm<IPost>()
  const handleSubmit = () => {
    console.log('form', form.getFieldsValue())
  }
  return (
    <TemplateOnline>
      <Title>Novo Artigo</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Item name="featureImageURL" label="Imagem de destaque">
          <Upload>
            <Button type="dashed">adicionar imagem</Button>
          </Upload>
        </Item>
        <Item name="title" label="Título" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <Input />
        </Item>
        <Item name="description" label="Corpo do artigo" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <TextArea />
        </Item>
        <Group>
          <Button onClick={() => route.push(RoutePath.user.posts)}>voltar</Button>
          <Button htmlType="reset">limpar</Button>
          <Button type="primary" htmlType="submit">
            salvar
          </Button>
        </Group>
      </Form>
    </TemplateOnline>
  )
}

export default PostsPage
