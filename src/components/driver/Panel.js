import React, { useState } from "react";
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

  return (
    <div className={classnames(styles["driver-panel"], className)}>
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
  )
}

DriverPanel.defaultProps = {
  onClick: () => null,
}

DriverPanel.propTypes = {
  onClick: PropTypes.func,
}

export default DriverPanel;

