import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import FormFooter from '~/components/offline/form-footer'
import OfflineTitle from '~/components/offline/title'
import { RoutePath } from '~/constants/routes'
import styles from '~/styles/Offline.module.css'
import TemplateOffline from '~/template/offline'

const { Item } = Form

const LoginPage = () => {
  const router = useRouter()

  return (
    <TemplateOffline>
      <Form layout="vertical" className={styles.loginBox}>
        <OfflineTitle>Login</OfflineTitle>
        <Item label="Email">
          <Input />
        </Item>
        <Item label="Senha">
          <Input />
        </Item>
        <Button type="primary" size="large" className={styles.fullWidth} onClick={() => router.push(RoutePath.app.home)}>
          Entrar
        </Button>
        <FormFooter showForgot showSignup />
      </Form>
    </TemplateOffline>
  )
}

export default LoginPage
