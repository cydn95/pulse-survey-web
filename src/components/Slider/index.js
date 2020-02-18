import React, { useRef, useState, useEffect } from 'react';
import * as d3 from "d3-interpolate";

import styles from './styles.scss';

function Slider(props) {
  const { percent } = props;

  const [mouseDown, setMouseDown] = useState(false);
  const rangeRef = useRef(null);

  const changeSliderToMousePos = (clientX) => {
    const rangeBounds = rangeRef.current.getBoundingClientRect();
    const offset = clientX - rangeBounds.left;
    const percent = 100 * Math.min(1, Math.max(offset / rangeBounds.width, 0));
    props.onChange(percent);
  };

  useEffect(() => {
    const mouseMove = (e) => {
      if (!mouseDown) return;
      changeSliderToMousePos(e.clientX);
    };
    const mouseUp = (e) => {
      setMouseDown(false);
    };
    // set resize listener
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }
  }, [mouseDown]);

  const fillStart = "#e66864";
  const fillEnd = "#00b7a2";
  const fillMid = "#53A7F5";
  const piecewiseColor = d3.piecewise(d3.interpolateRgb, [fillStart, fillMid, fillEnd]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div 
          ref={rangeRef} 
          className={styles["range-gradient"]}
          onMouseDown={(e) => changeSliderToMousePos(e.clientX)}
        />
        <div 
          style={
            { left: `${percent}%` }
          }
          className={styles['range-mask']}
          onMouseDown={(e) => changeSliderToMousePos(e.clientX)}
        />
        <div 
          style={{ 
            left: `${percent}%`,
            borderColor: piecewiseColor(percent / 100)
          }}
          className={styles.marker} 
          tabIndex={0}
          onMouseDown={(e) => setMouseDown(true)} 
        />
      </div>
    </div>
  );
}

export default Slider;
