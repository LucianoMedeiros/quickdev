import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import styles from '~/styles/Reaction.module.css'

const { Paragraph } = Typography

const Ractions = () => {
  return (
    <div className={styles.container}>
      <Paragraph>Avalie este conteúdo:</Paragraph>
      <Button type="link" icon={<LikeOutlined />} className={styles.like}>
        34
      </Button>
      <Button type="link" icon={<DislikeOutlined />} className={styles.dislike}>
        34
      </Button>
    </div>
  )
}

export default Ractions
