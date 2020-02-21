import React from 'react';
import classnames from "classnames";
import { PropTypes } from 'prop-types';

import Input from 'Components/Input';

import styles from './styles.scss';

function EditableOption(props) {
  const { 
    topic, 
    comment,
    changeTopic,
    changeComment,
  } = props;

  return (
    <div className={classnames(styles.main, styles.editable)}>
      <div className={styles.bullet}></div>
      <div className={styles.data}>
        <Input 
          className={styles.topic} 
          onChange={changeTopic}
          placeholder={"Specify topic"} 
          value={topic} 
        />
        <Input 
          className={styles.comment} 
          onChange={changeComment}
          placeholder={"Specify your comment"} 
          value={comment} 
        />
      </div>
    </div>
  );
}

EditableOption.defaultProps = {
};

EditableOption.propTypes = {
  topic: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  changeTopic: PropTypes.func.isRequired,
  changeComment: PropTypes.func.isRequired,
};

export default EditableOption;

