import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { adminSetProjectField } from 'Redux/actions';
import AddButton from 'Components/AddButton'
import Input from 'Components/Input'
import styles from './styles.scss'

const OrderComponent = ({ items, title, addText = "Add New", field = "", setProjectField, currentProject }) => {
  const [newOne, setNewOne] = useState({})
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  
  useEffect(() => {
    switch (field) {
      case 'myMap':
      case 'projectMap':
        setName('SHCategoryName')
        setIcon('icon')
        break;
      case 'driverList':
        setName('driverName')
        setIcon('iconPath')
        break;
      default:
        break;
    }
  }, [field])
  const handleAdd = () => {
    if (newOne[icon] && newOne[name]) {
      setProjectField(field, [...(currentProject[field] || []), newOne])
      setOpen(false)
      setNewOne({})
    }
  }

  const modalContent = () => {
    if (icon && name) {
      return (
        <div className={styles.modal}>
          <input type="file" onChange={(e) => {
            let temp = { ...newOne }
            temp[icon] = URL.createObjectURL(e.target.files[0])
            temp.file = e.target.files[0]
            setNewOne(temp)
          }} />
          <Input className={styles.input} value={newOne[name]} onChange={(value, e) => {
            let temp = { ...newOne }
            temp[name] = value
            setNewOne(temp)
          }} />
        </div>
      )
    }
  }
  return (
    <Fragment>
      {title && <span className={styles.description}>{title}</span>}
      <div className={styles.wrapper}>
        {(items && items.length > 0) ? items.map((item, idx) => {
          return (
            <div className={styles.itemWrapper} key={`${idx}-order`}>
              <span className={styles.image}>
                <img src={`${!title ? item.iconPath.split(':')[0] !== 'blob' ? 
                item.iconPath.split('.').map((d, idx, list) => idx === list.length - 2 ? d + '-dark' : d).join('.')
                : item.iconPath
                  : item.icon.split(':').length > 2 ?
                    item.icon
                    : `https://pulse.projectai.com/media/${item.icon}`
                }`} alt="item" />
                </span>
              <span className={styles.description}>{!title ? item.driverName : item.SHCategoryName}</span>
            </div>
          )
        }) : <div></div>}
        <AddButton className={styles.add} plusClassName={styles.plus} handleAdd={handleAdd} content={modalContent} setOpen={() => setOpen(true)} open={open} setClose={() => setOpen(false)} />
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject,
  }
}

export default connect(mapStateToProps, {
  setProjectField: adminSetProjectField,
})(OrderComponent)