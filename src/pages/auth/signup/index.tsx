import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import FormFooter from '~/components/offline/form-footer'
import OfflineTitle from '~/components/offline/title'
import { IAuthUser } from '~/interfaces/user-interface'
import { useAppDispatch } from '~/store/store-config'
import styles from '~/styles/Offline.module.css'
import TemplateOffline from '~/template/offline'

const { Item, useForm } = Form
const { Password } = Input

const SignupPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [form] = useForm<IAuthUser>()

  return (
    <TemplateOffline>
      <Form form={form} layout="vertical" className={styles.loginBox}>
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
        <Item label="Senha" name="password" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <Password />
        </Item>

        <Button type="primary" size="large" className={styles.fullWidth} htmlType="submit">
          Cadastrar
        </Button>

        <FormFooter showForgot showLogin />
      </Form>
    </TemplateOffline>
  )
}

export default SignupPage
