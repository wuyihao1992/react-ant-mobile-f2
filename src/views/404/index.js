import React from 'react'
import styles from './styles.less'

export default function() {
  return (
    <div className={styles.normal}>
      <h2 className={styles.title}>404</h2>
      <p className={styles.desc}>很抱歉，您访问的页面不存在!</p>
    </div>
  )
}