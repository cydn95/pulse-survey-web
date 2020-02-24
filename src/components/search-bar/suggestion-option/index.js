import React from "react";

import styles from './styles.scss';

function SuggestionOption(props) {
  const { name, description } = props;
  return (
    <div className={styles.main}>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}

export default SuggestionOption;
