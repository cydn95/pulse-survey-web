import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './styles.scss'

const Select = ({ selected = "", setSelected, items = [], org_items=[], field_name='', className, noSelected = "Select", keyValue = "default", onClose = null }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false);
  }, [selected])
  return (
    <div key={keyValue} className={styles.select_wrapper} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
      <div className={classnames(styles.select, open && styles.open)}>
        <div className={classnames(styles.select__trigger, className)}>
          <span>{(selected === "" || selected === undefined) ? noSelected : (field_name === '' ? selected : (((org_items || []).length === 0 ? items: org_items).filter(d => d.id === selected)[0] || {})[field_name])}</span>
          <div className={styles.sign}>
            <span className={open ? styles.open : styles.close}>{`>`}</span>
            {onClose && <span onClick={(e) => { e.stopPropagation(); onClose(); }} className={styles.cross}><FontAwesomeIcon icon={faTimes} /></span>}
          </div>
        </div>
        {<div className={styles.custom_options}>
          <div key={`${keyValue}-default`} onClick={() => setSelected('')} className={classnames(styles.custom_option, selected === '' && styles.selected)}>None</div>
          {field_name === '' ?
           items.map((item, index) => 
            <div 
              key={`${keyValue}-${index}`}
              onClick={() => setSelected(item)} 
              className={classnames(styles.custom_option, selected === item && styles.selected)}>
                {item}
              </div>) :
            items.map((item, index) => 
              <div 
              key={`${keyValue}-${index}`}
              onClick={() => setSelected(item['id'])} 
              className={classnames(styles.custom_option, selected === item[field_name] && styles.selected)}>
                {item[field_name]}
              </div>)
          }
        </div>}
      </div>
    </div>
  )
}

export default Select