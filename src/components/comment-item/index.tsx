import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import moment from 'moment'
import { ActionCommentType, IComment } from '~/interfaces/comment-interface'
import { deactivateCommentAction } from '~/store/comment/deactivate-comment-action'
import { getAllCommentsAction } from '~/store/comment/get-all-comments-action'
import { RootState, useAppDispatch, useAppSelector } from '~/store/store-config'
import styles from '~/styles/Comment.Item.module.css'

type Props = {
  data: IComment
}

const CommentItem = ({ data }: Props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user.current)

  const removeComment = async (id: string, post_id: string) => {
    if (confirm('Tem certeze que deseja remover? Esta ação não poderá ser desfeita.')) {
      const commentParams = { post_id: post_id, user_id: user.id, _id: id } as ActionCommentType
      await dispatch(deactivateCommentAction(commentParams))
      await dispatch(getAllCommentsAction(commentParams))
    }
  }

  return (
    <div className={styles.container}>
      {data.isActive ? (
        <p className={styles.comment}>{data.description}</p>
      ) : (
        <p className={styles.commentRemoved}>
          <ExclamationCircleOutlined /> Comentário removido pelo autor do post ou pelo autor do comentário.
        </p>
      )}
      <div className={styles.commentFooter}>
        comentado por:
        <Tag className={styles.commentFooterTag}>{data.user_name}</Tag>
        em: <Tag className={styles.commentFooterTag}>{moment(data.updatedAt).format('DD/MM/YYYY [às] HH:MM:SS')}</Tag>
        {user.id === data.user_id && data.isActive ? (
          <Button type="link" icon={<DeleteOutlined />} className={styles.commentFooterDelete} onClick={() => removeComment(data._id, data.post_id)}>
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
