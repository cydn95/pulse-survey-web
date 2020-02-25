import React from 'react';
import PropTypes from "prop-types";

import classnames from "classnames";

import styles from './styles.scss';

// take a circlular div
// cut it halfway to the right (only half remains to the right )
// rotate the cut rectangle to correspond to the percent
// if angle < 180, need to clip as during negative rotation div overflows
// if angle > 180, need two divs

const getClass = (percentage) => {
  const type = percentage > 80 ? "high": (percentage > 30 ? "medium": "low")
  return styles[type]
}

function CircularProgressBar(props) {
  const { 
    className, 
    percent,
    style,
  } = props;
  
  const angle = percent * 3.6;
  const extcls = style === 'smooth' ? styles.smooth : (getClass(percent))

  return (
    <div className={classnames(styles.main, extcls, className)}>
      <div style={
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          clipPath: angle < 180 ? null : `inset(0 50% 0 0)`,
        }
      }>
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
  style: 'smooth',
}

CircularProgressBar.propTypes = {
  percent: PropTypes.number,
  style: PropTypes.oneOf(["smooth", "discrete"]),
}

export default CircularProgressBar;