import React, { useState } from 'react'
import Button from 'Components/Button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames'
import styles from './styles.scss'
import Reorder from '../../../../assets/img/admin/reorder.png'

const Item = ({ item, index, current }) =>
  <Draggable draggableId={`${index}`} index={index}>
    {provided =>
      <div
        className={classnames(styles.item, index === current && styles.active)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <span className={styles.text}>
          {item.text}
        </span>
        <span><img src={Reorder} alt="reorder" /></span>
      </div>
    }
  </Draggable>

const ReorderModal = ({ items, setItems, onClose, text }) => {
  const [list, setList] = useState(items)
  const [current, setCurrent] = useState(-1)
  return (
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Reorder {text}</h2>
          <span className={styles.close} onClick={onClose}>X</span>
        </div>
        <DragDropContext
          onDragStart={data => {
            setCurrent(data.source.index)
          }}
          onDragEnd={result => {
            if (!result.destination) {
              return;
            }
            if (
              result.destination.droppableId === result.source.droppableId &&
              result.destination.index === result.source.index
            ) {
              return;
            }
            let temp = [...list];
            let fromIndex = result.source.index
            let toIndex = result.destination.index
            temp.splice(toIndex, 0, temp.splice(fromIndex, 1)[0]);
            console.log('list', temp)
            setCurrent(-1)
            setList(temp)
          }}
        >
          <Droppable droppableId="items">
            {provided =>
              <div className={styles.body} {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((item, idx) =>
                  <Item item={item} index={idx} key={`item-${idx}`} current={current} />
                )}
                {provided.placeholder}
              </div>
            }
          </Droppable>
        </DragDropContext>
        <div className={styles.footer}>
          <Button onClick={onClose} className={styles.cancel}>Cancel</Button>
          <Button onClick={() => { setItems(list); onClose(); }}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default ReorderModal