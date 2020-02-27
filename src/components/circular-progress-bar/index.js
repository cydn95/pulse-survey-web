import React from 'react';
import PropTypes from "prop-types";

import classnames from "classnames";

import cssstyles from './styles.scss';

// take a circlular div
// cut it halfway to the right (only half remains to the right )
// rotate the cut rectangle to correspond to the percent
// if angle < 180, need to clip as during negative rotation div overflows
// if angle > 180, need two divs

const getClass = (percentage, styles) => {
  const type = percentage > 80 ? "high": (percentage > 30 ? "medium": "low")
  return styles[type]
}

const conicGradientSupported = CSS.supports("background", "conic-gradient(black, red)")

function CircularProgressBar(props) {
  const { 
    className, 
    percent,
    style,
    styles,
  } = props;
  
  const angle = percent * 3.6;
  const extcls = style === 'smooth' && conicGradientSupported ? styles.smooth : (getClass(percent, styles))

  return (
    <div className={classnames(styles.main, extcls, className)}>
      <div className={classnames(styles["slider-wrapper"], angle < 180 ? null : styles.clip360overflow)}>
        <div className={styles.slider} style={{
          transform: `rotateZ(${angle}deg)`
        }}
        />
      </div>
      { angle < 180 &&
        <div className={styles["mask-greater-than-180"]} />
      }
      <div className={styles["center-mask"]} />
    </div>
  )
}


CircularProgressBar.defaultProps = {
  percent: 0,
  styles: cssstyles,
  // conic gradient vs discrete progress
  style: 'smooth',
}

CircularProgressBar.propTypes = {
  percent: PropTypes.number,
  styles: PropTypes.any,
  style: PropTypes.oneOf(["smooth", "discrete"]),
}

export default CircularProgressBar;