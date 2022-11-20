import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import moment from 'moment'
import { IComment } from '~/interfaces/comment-interface'
import { RootState, useAppSelector } from '~/store/store-config'
import styles from '~/styles/Comment.Item.module.css'

export interface CommentType extends IComment {
  updateAt: string
  createAt: string
}

type Props = {
  data: CommentType
}

const CommentItem = ({ data }: Props) => {
  const user = useAppSelector((state: RootState) => state.user.current)

  return (
    <div className={styles.container}>
      {data.isActive ? (
        <p className={styles.comment}>{data.description}</p>
      ) : (
        <p className={styles.commentRemoved}>
          <ExclamationCircleOutlined /> Comentário removido pelo autor do post ou do comentário
        </p>
      )}
      <div className={styles.commentFooter}>
        comentado por:
        <Tag className={styles.commentFooterTag}>{data.user_name}</Tag>
        em: <Tag className={styles.commentFooterTag}>{moment(data.updateAt).format('DD/MM/YYYY [às] HH:MM:SS')}</Tag>
        {user.id === data.user_id ? (
          <Button type="link" icon={<DeleteOutlined />} className={styles.commentFooterDelete}>
            remover
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CommentItem
