import styles from '~/styles/Offline.module.css'

type Props = {
  children: string
}

const OfflineTitle = ({ children }: Props) => {
  return <h1 className={styles.title}>{children}</h1>
}

export default OfflineTitle
