import { RootState, useAppSelector } from '~/store/store-config'
import CommentItem, { CommentType } from '../comment-item'

const CommentList = () => {
  const comments = useAppSelector((state: RootState) => state.posts.currentComments)

  return (
    <div>
      {comments.map(item => (
        <CommentItem key={item._id} data={item as CommentType} />
      ))}
    </div>
  )
}

export default CommentList
