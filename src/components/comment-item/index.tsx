import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import moment from 'moment'
import styles from '~/styles/Comment.Item.module.css'

type Props = {
  data: any[]
}

const CommentItem = ({ data }: Props) => {
  return data.map(item => (
    <div key={item.id} className={styles.container}>
      {item.isActive ? (
        <p className={styles.comment}>{item.comment}</p>
      ) : (
        <p className={styles.commentRemoved}>
          <ExclamationCircleOutlined /> Comentário removido pelo autor do post ou do comentário
        </p>
      )}
      <div className={styles.commentFooter}>
        comentado por:
        <Tag className={styles.commentFooterTag}>{item.autor}</Tag>
        em: <Tag className={styles.commentFooterTag}>{moment(item.createAt).format('DD/MM/YYYY [às] HH:MM:SS')}</Tag>
        <Button type="link" icon={<DeleteOutlined />} className={styles.commentFooterDelete}>
          remover
        </Button>
      </div>
    </div>
  ))
}

export default CommentItem
