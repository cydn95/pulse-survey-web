import React, { Fragment } from 'react'
import styles from './styles.scss'

const OrderComponent = ({ items, title, addText = "Add New" }) => {
  return (
    <Fragment>
      {title && <span className={styles.description}>{title}</span>}
      <div className={styles.wrapper}>
        {(items && items.length > 0) ? items.map((item, idx) => {
          return (
            <div className={styles.itemWrapper} key={`${idx}-order`}>
              <span className={styles.image}><img src={`${!title ? item.icon.split('.').map((d, idx, list) => idx === list.length - 2 ? d + '-dark' : d).join('.') : item.icon.split(':')[0] === 'https' ? item.icon : `https://pulse.projectai.com/media/${item.icon}`}`} alt="item" /></span>
              <span className={styles.description}>{!title ? item.driverName : item.SHCategoryName}</span>
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