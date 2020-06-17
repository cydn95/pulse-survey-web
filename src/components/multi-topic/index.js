import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "Components/Button";

import Option, { EditableOption } from "./option";

import styles from "./styles.scss";

function MultiTopic(props) {
  const { title, options } = props;
  const [newTopic, setNewTopic] = useState("");
  const [newComment, setNewComment] = useState("");

  const addNewTopic = () => {
    props.addNewTopic(newTopic, newComment);
    setNewTopic("");
    setNewComment("");
  };

  return (
    <div className={styles.main}>
      <h2>{title}</h2>
      {options.map((d) => (
        <Option key={d.topic} topic={d.topic} comment={d.comment} />
      ))}
      <EditableOption
        topic={newTopic}
        comment={newComment}
        changeTopic={setNewTopic}
        changeComment={setNewComment}
      />
      <div>
        <Button className={styles["add-new-topic"]} onClick={addNewTopic}>
          Add New Topic
        </Button>
      </div>
    </div>
  );
}

MultiTopic.defaultProps = {
  title: "",
  addNewTopic: () => null,
};

MultiTopic.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(Option.propTypes)),
  addNewTopic: PropTypes.func,
};

export default MultiTopic;
