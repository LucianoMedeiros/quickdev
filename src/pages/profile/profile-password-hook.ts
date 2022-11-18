import { Form } from 'antd'
import { useState } from 'react'
import { IAuthUser } from '~/interfaces/user-interface'
import { useAppDispatch } from '~/store/store-config'
import { updatePasswordAction } from '~/store/user/update-password-action'
import { notificationSuccess } from '~/utilities/notification'

const { useForm } = Form

const useProfilePassword = () => {
  const dispatch = useAppDispatch()

  const [formPassword] = useForm<IAuthUser>()
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false)
  const changeModeEditionPassword = () => setIsEditPassword(!isEditPassword)

  const handleChangePassword = (formData: IAuthUser) => {
    dispatch(updatePasswordAction(formData.password as string))
    notificationSuccess('Sucesso', 'Senha alterada com sucesso', 'top')
    formPassword.resetFields()
    changeModeEditionPassword()
  }

  return { isEditPassword, formPassword, changeModeEditionPassword, handleChangePassword }
}

export default useProfilePassword
