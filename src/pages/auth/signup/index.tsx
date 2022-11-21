import { Button, Form, Input, Spin } from 'antd'
import { useRouter } from 'next/router'
import FormFooter from '~/components/offline/form-footer'
import OfflineTitle from '~/components/offline/title'
import { RoutePath } from '~/constants/portal-routes'
import { IAuthUser } from '~/interfaces/user-interface'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import { createUserAction } from '~/store/user/create-user-action'
import styles from '~/styles/Offline.module.css'
import TemplateOffline from '~/template/offline'

const { Item, useForm } = Form
const { Password } = Input

const SignupPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [form] = useForm<IAuthUser>()
  const isPending = useAppSelector((state: RootState) => state.user.isPending)

  const handleSubmit = async () => {
    const user = form.getFieldsValue()
    const { payload } = await dispatch(createUserAction(user))
    if (payload) {
      router.push(RoutePath.app.home)
    }
  }

  return (
    <TemplateOffline>
      <Spin spinning={isPending}>
        <Form form={form} layout="vertical" className={styles.loginBox} onFinish={handleSubmit}>
          <OfflineTitle>Nova Conta</OfflineTitle>
          <Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Campo obrigatório' },
              { type: 'email', message: 'Email inválido' },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: 'Campo obrigatório' },
              { min: 6, message: 'Sua senha precisa ter 6 dígitos no mínimo' },
            ]}
          >
            <Password minLength={6} />
          </Item>

          <Button type="primary" size="large" className={styles.fullWidth} htmlType="submit">
            Cadastrar
          </Button>

          <FormFooter showLogin />
        </Form>
      </Spin>
    </TemplateOffline>
  )
}

export default SignupPage
