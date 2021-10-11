import React from 'react'
import styles from './styles.scss'

const Counter = ({ count, description, type = "normal" }) => {
    return (
        <div className={styles.counter}>
            <span className={`${styles[type]}`}>{count}</span>
            <span className={styles.description}>{description}</span>
        </div>
    )
}

export default Counter