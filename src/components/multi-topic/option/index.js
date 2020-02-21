import React from 'react';
import classnames from "classnames";
import { PropTypes } from 'prop-types';

import EditableOption from './EditableOption';

import styles from './styles.scss';

function Option(props) {
  const { topic, comment } = props;
  return (
    <div className={classnames(styles.main)}>
      <div className={styles.bullet}></div>
      <div className={styles.data}>
        <div className={styles.topic}>{topic}</div>
        <div className={styles.comment}>{comment}</div>
      </div>
    </div>
  );
}

Option.defaultProps = {
};

Option.propTypes = {
  topic: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Option;
export { EditableOption };