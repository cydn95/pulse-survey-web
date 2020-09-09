import React from "react";
import { connect } from "react-redux";

import styles from "./styles.scss";

import classnames from "classnames";

import { ResponsiveDonut as Donut } from "Components/Donut";
import { ResponsiveReportCircularChart as ReportCircularChart } from "Components/report/CircularChart";
import SurveyLineGraph from "Components/SurveyLineGraph";

import TopNav from "Containers/TopNav";

const donutData = [
  { name: "Pie1", count: 15 },
  { name: "Pie2", count: 20 },
  { name: "Pie3", count: 35 },
  { name: "Pie3", count: 30 },
];

const surveyData = [
  { name: "Question 1", yourAnswer: 15, teamAnswer: 20 },
  { name: "Question 2", yourAnswer: 20, teamAnswer: 80 },
  {
    name: "A very long Question, must break at 200px ",
    yourAnswer: 80,
    teamAnswer: 45,
  },
  { name: "Question 3", yourAnswer: 15, teamAnswer: 20 },
  { name: "Question 4", yourAnswer: 20, teamAnswer: 80 },
  {
    name: "A very long Question, must break at 200px ",
    yourAnswer: 80,
    teamAnswer: 45,
  },
];

class ReportPeople extends React.Component {
  render() {
    const { history, projectTitle } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle="People Dashboard">
            <div className={styles.section}>
              <h2 className={styles["page-title"]}>My Profile</h2>
              <h2 className={styles["project-name"]}>{projectTitle}</h2>
            </div>
          </TopNav>
        </div>
        <div className={styles["main-content"]}>
          <div className={styles.left}>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Paticipation</span>
                <div
                  className={classnames(
                    styles["block__content"],
                    styles.participation
                  )}
                >
                  <div className={styles.donuts}>
                    <div className={styles.donut}>
                      <ReportCircularChart
                        className={styles.donut}
                        keySelector={(d) => d.name}
                        valueSelector={(d) => d.count}
                        sentiment={"happy"}
                        width={150}
                        height={150}
                        data={donutData}
                      />
                    </div>
                    <div className={styles.donut}>
                      <ReportCircularChart
                        className={styles.donut}
                        keySelector={(d) => d.name}
                        valueSelector={(d) => d.count}
                        width={150}
                        height={150}
                        sentiment={"happy"}
                        data={donutData}
                      />
                    </div>
                  </div>
                  <div className={styles.info}></div>
                </div>
              </div>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Overall Trends</span>
                <div className={styles.content}></div>
              </div>
            </div>
            <div className="row">
              <div className="panel">
                <div className={styles.linegraph}>
                  <SurveyLineGraph
                    keySelector={(d) => d.name}
                    questionNameSelector={(d) => d.name}
                    yourAnswerSelector={(d) => d.yourAnswer}
                    teamsAnswerSelector={(d) => d.teamAnswer}
                    data={surveyData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classnames(styles.right)}>
            <div className={classnames("row", styles["donut-container"])}>
              <h2 className={styles.title}>My Profile</h2>

              <Donut
                className={styles.donut}
                keySelector={(d) => d.name}
                valueSelector={(d) => d.count}
                sentiment={"happy"}
                data={donutData}
              />
              <div className={styles.info}>
                <h3>Total Questions Answered</h3>
                <h2>80%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { projectTitle } = authUser;

  return {
    projectTitle,
  };
};

export default connect(mapStateToProps, {})(ReportPeople);
