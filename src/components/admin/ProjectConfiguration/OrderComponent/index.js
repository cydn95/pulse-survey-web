import React, { Fragment } from 'react'
import styles from './styles.scss'

const OrderComponent = ({ items, title, addText = "Add New" }) => {
  return (
    <Fragment>
      {title && <span className={styles.description}>{title}</span>}
      <div className={styles.wrapper}>
        {items ? items.map((item, idx) => {
          return (
            <div className={styles.itemWrapper} key={`${idx}-order`}>
              <span className={styles.image}><img src={item.image} alt="item" /></span>
              <span className={styles.description}>{item.text}</span>
            </div>
          )
        }) : <div></div>}
        <div className={styles.add}>
          <span className={styles.plus}>+</span>
          <span className={styles.text}>{addText}</span>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderComponent;