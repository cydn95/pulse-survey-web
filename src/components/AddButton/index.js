import React from 'react'
import classnames from 'classnames'
import styles from './styles.scss'

const AddButton = ({ text, className, ...others }) => {
  return (
    <div className={classnames(styles.add, className)} {...others}>
      <span className={styles.plus}>+</span>
      <span>Add {text && `New ${text}`}</span>
    </div>
  )
}

export default AddButton