import React, { useRef, useState, useEffect } from "react";
import { PropTypes } from "prop-types";

import * as d3 from "d3-interpolate";

import styles from "./styles.scss";
import classnames from "classnames";

function Slider(props) {
  const { percent } = props;

  const [answered, setAnswered] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [touchStart, setTouchStart] = useState(false);
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
      setAnswered(true);
      changeSliderToMousePos(e.clientX);
    };
    const mouseUp = (e) => {
      setMouseDown(false);
    };

    // set resize listener
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [mouseDown]);

  useEffect(() => {
    const touchMove = (e) => {
      if (!touchStart) return;
      setAnswered(true);
      changeSliderToMousePos(e.touches[0].clientX);
    };

    const touchEnd = (e) => {
      setTouchStart(false);
    };
    // set resize listener
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
    };
  }, [touchStart]);

  const fillStart = "#e66864";
  const fillEnd = "#00b7a2";
  const fillMid = "#53A7F5";
  const piecewiseColor = d3.piecewise(d3.interpolateRgb, [
    fillStart,
    fillMid,
    fillEnd,
  ]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div
          ref={rangeRef}
          className={styles["range-gradient"]}
          onMouseDown={(e) => changeSliderToMousePos(e.clientX)}
        />
        <div
          style={{ left: `${percent}%` }}
          className={styles["range-mask"]}
          onMouseDown={(e) => changeSliderToMousePos(e.clientX)}
        />
        <div
          style={{
            left: `${percent}%`,
            borderColor: piecewiseColor(percent / 100),
          }}
          className={classnames(styles.marker, {
            [styles["no-answered"]]: !answered,
          })}
          tabIndex={0}
          onMouseDown={(e) => setMouseDown(true)}
          onTouchStart={(e) => setTouchStart(true)}
        />
      </div>
    </div>
  );
}

Slider.propTypes = {
  percent: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
