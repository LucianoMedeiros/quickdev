import { CloseCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd'
import { RootState, useAppSelector } from '~/store/store-config'
import TemplateOnline from '~/template/online'
import useProfileName from './profile-name-hook'
import useProfilePassword from './profile-password-hook'

const { Title, Paragraph } = Typography
const { Item } = Form
const { Password } = Input

const ProfilePage = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.current)
  const isPending = useAppSelector((state: RootState) => state.user.isPending)

  const { isEditName, formName, changeModeEditionName, handleChangeName } = useProfileName()
  const { isEditPassword, formPassword, changeModeEditionPassword, handleChangePassword } = useProfilePassword()

  return (
    <TemplateOnline>
      <Title>Perfil</Title>
      <Card>
        {isEditName ? (
          <Spin spinning={isPending}>
            <Form form={formName} onFinish={handleChangeName}>
              <Item label="Nome" name="name" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                <Row gutter={20}>
                  <Col>
                    <Input type="text" style={{ width: '200px' }} />
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      alterar nome
                    </Button>
                    <Button type="link" onClick={changeModeEditionName}>
                      <CloseCircleOutlined />
                    </Button>
                  </Col>
                </Row>
              </Item>
            </Form>
          </Spin>
        ) : (
          <Row gutter={20}>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Item label="Nome">
                <b>{currentUser.name ? currentUser.name : 'Sem nome definido'}</b>
              </Item>
            </Col>
            <Col>
              <Button type="link" onClick={changeModeEditionName}>
                editar
              </Button>
            </Col>
          </Row>
        )}
        <Item label="Email">
          <Paragraph>
            <b>{currentUser.email}</b>
          </Paragraph>
        </Item>
        {isEditPassword ? (
          <Spin spinning={isPending}>
            <Form form={formPassword} onFinish={handleChangePassword}>
              <Row gutter={20}>
                <Col>
                  <Item
                    label="Senha"
                    name="password"
                    rules={[
                      { required: true, message: 'Campo obrigatório' },
                      { min: 6, message: 'Sua senha precisa ter 6 dígitos no mínimo' },
                    ]}
                  >
                    <Password style={{ width: '200px' }} />
                  </Item>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    alterar senha
                  </Button>
                  <Button type="link" onClick={changeModeEditionPassword}>
                    <CloseCircleOutlined />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        ) : (
          <Row gutter={20}>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Item label="Senha">
                <b>***********</b>
              </Item>
            </Col>
            <Col>
              <Button type="link" onClick={changeModeEditionPassword}>
                editar
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    </TemplateOnline>
  )
}

export default ProfilePage
