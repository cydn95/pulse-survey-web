import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import Input from 'Components/Input';

import styles from './styles.scss';

function EditableOption(props) {
  const { 
    topic, 
    comment,
    changeTopic,
    changeComment,
    topicPlaceholder,
    commentPlaceholder,
    onFocus,
    onBlur
  } = props;

  return (
    <div className={classnames(styles.main, styles.editable)}>
      <div className={styles.bullet}></div>
      <div className={styles.data}>
        <Input
          onFocus={(e) => onFocus()}
          onBlur={(e) => onBlur()}
          className={styles.topic}
          onChange={(value, e) => changeTopic(value)}
          placeholder={
            topicPlaceholder === "" ? "Specify your topic" : topicPlaceholder
          }
          value={topic}
        />
        <Input
          onFocus={(e) => onFocus()}
          onBlur={(e) => onBlur()}
          className={styles.comment}
          onChange={(value, e) => changeComment(value)}
          placeholder={
            commentPlaceholder === ""
              ? "Specify your comment"
              : commentPlaceholder
          }
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

