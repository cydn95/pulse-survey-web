import React, { Fragment, useState } from 'react'
import classnames from 'classnames'
import Button from 'Components/Button'
import styles from './styles.scss'
import {
  ModalWrapper,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalContent,
} from './addButton.styles'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddButton = ({ text, className, outlined = false, plusClassName, content, handleAdd, open, setOpen, setClose, ...others, }) => {
  return (
    <Fragment>
      <div className={classnames(styles.add, className)} {...others} onClick={setOpen}>
        <span className={classnames(styles.plus, outlined && styles.outlined, plusClassName)}>+</span>
        <span>Add {text && `New ${text}`}</span>
      </div>
      {open && <ModalWrapper onClick={setClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>Add {text && `New ${text}`}</h2>
            <span onClick={setClose}><FontAwesomeIcon icon={faTimes} color="#6d6f94" /></span>
          </ModalHeader>
          <ModalBody>{content()}</ModalBody>
          <ModalFooter>
            <span onClick={setClose}>Cancel</span>
            <Button className="btn"
              onClick={handleAdd}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>}
    </Fragment>
  )
}

export default AddButton