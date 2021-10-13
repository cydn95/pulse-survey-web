import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import styles from './styles.scss'

const Select = ({ selected, setSelected, items, className, noSelected }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false);
  }, [selected])
  return (
    <div className={styles.wrapper} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
      <div className={classnames(styles.select, className)}>
        <span>{selected === "" ? noSelected : selected}</span><span className={open ? styles.open : styles.close}>{`>`}</span>
      </div>
      {open && <div className={styles.dropdown}>
        {items.map((item, index) => <div onClick={() => setSelected(item)} className={styles.item}>{item}</div>)}
      </div>}
    </div>
  )
}

export default Select