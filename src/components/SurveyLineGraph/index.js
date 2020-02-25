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
      <label className={styles["self-title"]}>Your Answers</label>
      <LineGraph
        className={styles["line-graph-self"]}
        flipped
        keySelector={keySelector}
        labelSelector={questionNameSelector}
        valueSelector={yourAnswerSelector}
        data={data}
      />
      <div className={styles.separator} />
      <label className={styles["team-title"]}>Team's Answers</label>
      <LineGraph
        className={styles["line-graph-team"]}
        keySelector={keySelector}
        labelSelector={questionNameSelector}
        valueSelector={teamsAnswerSelector}
        data={data}
      />
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


