import { Button, Col, Form, Input, Row, Typography, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RoutePath } from '~/constants/portal-routes'
import IPost from '~/interfaces/post-interface'
import { createPostAction } from '~/store/posts/create-post-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'

const { Title } = Typography
const { Item, useForm } = Form
const { TextArea } = Input

const { Group } = Button

const PostsPage = () => {
  const [file, setFile] = useState<string | ArrayBuffer | null>()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user.current)

  const route = useRouter()
  const [form] = useForm<IPost>()

  const convertToBase64 = (file: RcFile) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      setFile(this.result)
    }
    reader.readAsDataURL(file)

    // Prevent upload
    return false
  }

  const handleSubmit = async () => {
    const data = form.getFieldsValue()
    data.user_id = user.id
    data.featureImageURL = file

    const { payload } = await dispatch(createPostAction(data))
    if (payload) {
      form.resetFields()
      route.push(RoutePath.user.posts)
    }
  }
  return (
    <TemplateOnline>
      <Title>Novo Artigo</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={20}>
          {file && (
            <Col>
              <img src={file as string} alt="" width={200} style={{ marginBottom: '20px' }} />
            </Col>
          )}
          <Col>
            <Item name="featureImageURL" label="Imagem de destaque">
              <Upload
                maxCount={1}
                beforeUpload={convertToBase64}
                onRemove={() => setFile('')}
                progress={{
                  strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  },
                  strokeWidth: 3,
                  format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
                }}
              >
                <Button type="dashed">adicionar imagem</Button>
              </Upload>
            </Item>
          </Col>
        </Row>

        <Item name="title" label="Título" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <Input />
        </Item>
        <Item name="description" label="Corpo do artigo" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <TextArea rows={10} />
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
