import { NotificationPlacement } from 'antd/lib/notification'
import { notification } from 'antd'

export const notificationError = (title: string, message: string, placement: NotificationPlacement) => {
  notification.error({
    message: title,
    description: message,
    placement,
  })
}
export const notificationSuccess = (title: string, message: string, placement: NotificationPlacement) => {
  notification.success({
    message: title,
    description: message,
    placement,
  })
}
