import React, { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import styles from './styles.scss';
import DriverComponent from "./Component";

function DriverPanel(props) {
  const {
    className,
    data
  } = props;

  const [selectedDriver, selectDriver] = useState(null)

  const dragRef = useRef(null)
  const root = useRef(null)
  let dragStart;
  let dragEnd;

  let oldScroll;
  let dragStartTimestamp;

  return (
    <div 
      ref={root}
      draggable
      className={classnames(styles["driver-panel"], className)}
      onDragStart={e => {
        e.dataTransfer.setDragImage(dragRef.current, 0, 0);
        dragStart = e.pageX;
        dragStartTimestamp = Date.now()
        oldScroll = root.current.scrollLeft
      }}
      onDragOver={e => {
        dragEnd = e.pageX;
        const distance = dragEnd - dragStart;
        root.current.scrollLeft = oldScroll - distance
      }}
      onDragEnd={e => {
        const distance = dragEnd - dragStart;
        const dragEndTimestamp = Date.now()
        const timeDelta = dragEndTimestamp - dragStartTimestamp;
        const factor = timeDelta > 800 ? 1 : Math.min(2000 / timeDelta, 10);
        const finalScroll = oldScroll - distance * factor
        root.current.scrollTo({
          left: finalScroll,
          behavior: 'smooth'
        })
      }}
    >
      <div ref={dragRef} style={{ position: 'fixed', width: "1px", height: "1px" }} />
      <div className={styles.container}>
        {
          data.map(d => (
            <DriverComponent
              iconAlign="left"
              key={d.driverId}
              selected={d.driverId === selectedDriver}
              onClick={selectDriver}
              {...d}
            />
          ))
        }
      </div>
    </div>
  )
}

DriverPanel.defaultProps = {
  onClick: () => null,
}

DriverPanel.propTypes = {
  onClick: PropTypes.func,
}

export default DriverPanel;

