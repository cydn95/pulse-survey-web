import React from 'react';
import classnames from "classnames";
import { PropTypes } from 'prop-types';

import { ResponsiveLineGraph as LineGraph } from "Components/LineGraph";

import styles from './styles.scss';

function SurveyLineGraph(props) {
  const { 
    data,
    keySelector,
    questionNameSelector,
    yourAnswerSelector,
    teamsAnswerSelector,
  } = props;

  return (
    <div className={classnames(styles.main)}>
      <div className={styles["answer-self"]}>
        <label>Your Answers</label>
        <LineGraph
          className={styles["line-graph-self"]}
          flipped
          keySelector={keySelector}
          labelSelector={questionNameSelector}
          valueSelector={yourAnswerSelector}
          data={data}
        />
      </div>
      <div className={styles.separator} />
      <div className={styles["answer-team"]}>
        <label>Team's Answers</label>
        <LineGraph
          className={styles["line-graph-team"]}
          keySelector={keySelector}
          labelSelector={questionNameSelector}
          valueSelector={teamsAnswerSelector}
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
  questionNameSelector: PropTypes.func.isRequired,
  teamsAnswerSelector: PropTypes.func.isRequired,
  yourAnswerSelector: PropTypes.func.isRequired,
};

export default SurveyLineGraph;


