import React, { Component } from "react";
import Button from "../../Button";

import styles from "./styles.scss";

class Continue extends Component {
  handleNextQuestion = (e) => {
    const { onContinue } = this.props;
    onContinue(e);
  };

  render() {
    const { title } = this.props;

    return (
      <div className={styles.root}>
        <Button className={styles.continue} onClick={(e) => this.handleNextQuestion(e)}>{title}</Button>
      </div>
    );
  }
}

export default Continue;
