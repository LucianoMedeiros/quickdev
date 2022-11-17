import { Button, Form, Input } from 'antd'
import FormFooter from '~/components/offline/form-footer'
import OfflineTitle from '~/components/offline/title'
import styles from '~/styles/Offline.module.css'
import TemplateOffline from '~/template/offline'

const { Item } = Form

const LoginPage = () => {
  return (
    <TemplateOffline>
      <Form layout="vertical" className={styles.loginBox}>
        <OfflineTitle>Nova Conta</OfflineTitle>
        <Item label="Email">
          <Input />
        </Item>
        <Item label="Senha">
          <Input />
        </Item>
        <Button type="primary" size="large" className={styles.fullWidth}>
          Entrar
        </Button>

        <FormFooter showForgot showLogin />
      </Form>
    </TemplateOffline>
  )
}

export default LoginPage
