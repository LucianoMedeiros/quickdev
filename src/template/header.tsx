import { HomeOutlined, TableOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Layout, MenuProps } from 'antd'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { RoutePath } from '~/constants/routes'
import { fbApp } from '~/firebase/config'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import { UserActions } from '~/store/user/user-reducer'
import styles from '../styles/Online.module.css'

const { Header } = Layout

const HeaderTemplate = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const username = useAppSelector((state: RootState) => state.user.current.email)

  const logout = () => {
    const auth = getAuth(fbApp)
    auth.signOut()
    dispatch(UserActions.clearUser())
    router.push(RoutePath.auth.login)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => router.push(RoutePath.user.profile)}>
          Perfil
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button type="link" onClick={() => router.push(RoutePath.user.posts)}>
          Artigos
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button type="link" onClick={logout}>
          Sair
        </Button>
      ),
    },
  ]

  return (
    <Header className={styles.header}>
      <Button icon={<HomeOutlined />} onClick={() => router.push(RoutePath.app.home)} className={styles.headerButtons} size="large" type="link">
        Home Page
      </Button>

      <Button icon={<TableOutlined />} onClick={() => router.push(RoutePath.app.dashboard)} className={styles.headerButtons} size="large" type="link">
        Relatórios
      </Button>

      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button icon={<UserOutlined />} className={styles.headerButtons} size="large" type="link">
          {username}
        </Button>
      </Dropdown>
    </Header>
  )
}

export default HeaderTemplate
