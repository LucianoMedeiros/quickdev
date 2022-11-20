import moment from 'moment'
import styles from '~/styles/Article.module.css'
type Props = {
  name: string
  date: string
}
const Author = ({ name, date }: Props) => {
  return (
    <div className={styles.authorContainer}>
      <span>Author:</span>
      <strong className={styles.authorName}>{name}</strong>
      <span>em</span>
      <time className={styles.authorPostUpdated}>{moment(date).format('DD/MM/YYYY')}</time>
      <span>às</span>
      <time className={styles.authorPostUpdated}>{moment(date).format('hh:mm:ss')}</time>
    </div>
  )
}

export default Author
