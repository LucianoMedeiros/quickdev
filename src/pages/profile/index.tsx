import { Button, Card, Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import TemplateOnline from '~/template/online'

const { Title, Paragraph } = Typography
const { Item } = Form
const { Password } = Input

interface IUser {
  email: string
  password: string
}

const ProfilePage = () => {
  const [user, setUser] = useState<IUser>({ email: 'lucianomla@gmail.com', password: '123456' })
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const changeModeEdition = () => setIsEdit(!isEdit)

  return (
    <TemplateOnline>
      <Title>Perfil</Title>
      <Card>
        <Form>
          <Item label="Email">{isEdit ? <Input type="text" value={user.email} /> : <Paragraph>{user.email}</Paragraph>}</Item>
          <Item label="Senha">{isEdit ? <Password value={user.password} /> : <Paragraph>**********</Paragraph>}</Item>
        </Form>
      </Card>
      {isEdit ? (
        <Button type="primary" onClick={changeModeEdition}>
          Salvar alterações
        </Button>
      ) : (
        <Button type="primary" onClick={changeModeEdition}>
          Editar meus dados
        </Button>
      )}
    </TemplateOnline>
  )
}

export default ProfilePage
