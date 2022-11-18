import { Form } from 'antd'
import { useState } from 'react'
import IUser from '~/interfaces/user-interface'
import { useAppDispatch } from '~/store/store-config'
import { updateUserAction } from '~/store/user/update-name-action'

const { useForm } = Form

const useProfileName = () => {
  const dispatch = useAppDispatch()

  const [formName] = useForm<IUser>()
  const [isEditName, setIsEditName] = useState<boolean>(false)
  const changeModeEditionName = () => setIsEditName(!isEditName)

  const handleChangeName = (formData: IUser) => {
    dispatch(updateUserAction(formData.name as string))
    formName.resetFields()
    changeModeEditionName()
  }

  return { isEditName, changeModeEditionName, handleChangeName, formName }
}

export default useProfileName
