import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import { IComment } from '~/interfaces/comment-interface'
import { createCommentAction } from '~/store/comment/create-comment-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'

const { useForm, Item } = Form
const { TextArea } = Input
const { Group } = Button

const CommentForm = () => {
  const route = useRouter()
  const { id } = route.query
  const dispatch = useAppDispatch()
  const [form] = useForm<IComment>()
  const user = useAppSelector((state: RootState) => state.user.current)

  const handleSubmit = async () => {
    const data = form.getFieldsValue()
    data.post_id = id as string
    data.user_id = user.id
    data.user_name = (user.name as string) || (user.email as string)

    const { payload } = await dispatch(createCommentAction(data))

    if (payload) {
      form.resetFields()
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Item>
        <Item name="description" label="Deixe seu comentário" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <TextArea rows={4} />
        </Item>
        <Group>
          <Button htmlType="reset">limpar</Button>
          <Button type="primary" htmlType="submit">
            enviar comentário
          </Button>
        </Group>
      </Item>
    </Form>
  )
}

export default CommentForm
