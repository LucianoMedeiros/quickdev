import { Button } from 'antd'
import { useRouter } from 'next/router'
import { RoutePath } from '~/constants/portal-routes'
import styles from '~/styles/Offline.module.css'

type Props = {
  showSignup?: boolean
  showForgot?: boolean
  showLogin?: boolean
}

const FormFooter = ({ showSignup, showForgot, showLogin }: Props) => {
  const router = useRouter()

  return (
    <div className={styles.formFooter}>
      {showLogin && (
        <Button type="link" size="large" onClick={() => router.push(RoutePath.auth.login)}>
          Login
        </Button>
      )}
      {/*
      To Do 
      {showForgot && (
        <Button type="link" size="large" onClick={() => router.push(RoutePath.auth.forgot)}>
          Esqueci minha senha
        </Button>
      )}
      */}
      {showSignup && (
        <Button type="link" size="large" onClick={() => router.push(RoutePath.auth.signup)}>
          Quero me cadastrar
        </Button>
      )}
    </div>
  )
}

export default FormFooter
