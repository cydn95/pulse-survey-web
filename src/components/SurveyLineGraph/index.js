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
          keySelector={keySelector}
          valueSelector={d => d.yourAnswer}
          data={data}
        />
      </div>
      <div className={styles.separator} />
      <div className={styles["answer-team"]}>
        <label>Team's Answers</label>
        <LineGraph 
          className={styles["line-graph-team"]}
          keySelector={keySelector}
          valueSelector={d => d.teamAnswer}
          data={data}
        />
      </div>
    </div>
  );
}

SurveyLineGraph.defaultProps = {
  data: [],
  keySelector: (d, i) => i,
};

SurveyLineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  keySelector: PropTypes.func,
};

export default SurveyLineGraph;


