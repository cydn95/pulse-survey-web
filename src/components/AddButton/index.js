import React from 'react'
import styles from './styles.scss'

const AddButton = ({ text, ...others }) => {
  return (
    <div className={styles.add} {...others}>
      <span className={styles.plus}>+</span>
      <span>Add {text && `New ${text}`}</span>
    </div>
  )
}

export default AddButton