import React from 'react';
import classnames from "classnames";
import { PropTypes } from 'prop-types';

import LineGraph from "Components/LineGraph";

import styles from './styles.scss';

function SurveyLineGraph(props) {
  const { 
    data,
    keySelector,
  } = props;

  return (
    <div className={classnames(styles.main)}>
      <div className={styles["answer-self"]}>
        <label>Your Answers</label>
        <LineGraph
          className={styles["line-graph-self"]}
          flipped
          keySelector={d => d.name}
          data={data}
        />
      </div>
      <div className={styles.separator} />
      <div className={styles["answer-team"]}>
        <label>Team's Answers</label>
        <LineGraph 
          className={styles["line-graph-team"]}
          keySelector={d => d.name}
          data={data}
        />
      </div>
    </div>
  );
}

SurveyLineGraph.defaultProps = {
};

SurveyLineGraph.propTypes = {
};

export default SurveyLineGraph;


