import React from "react";
import { connect } from "react-redux";

import styles from "./styles.scss";

import classnames from "classnames";

import Emoji from "Components/report/Emoji";
import { ResponsiveReportCircularChart as ReportCircularChart } from "Components/report/CircularChart";
import FeedbackSummary from "Components/report/FeedbackSummary";
import TopSummary from "Components/report/TopSummary";
import CultureResult from "Components/report/CultureResult";
import LineChart from "Components/report/LineChart";
import SentimentResult from "Components/report/SentimentResult";

import TopNav from "Containers/TopNav";

const donutData = [
  { name: "Pie1", count: 15 },
  { name: "Pie2", count: 20 },
  { name: "Pie3", count: 35 },
  { name: "Pie3", count: 30 },
];

const sentimentResult = [
  [
    { name: "Pie1", count: 35 },
    { name: "Pie2", count: 65 },
  ],
  [
    { name: "Pie1", count: 45 },
    { name: "Pie2", count: 55 },
  ],
  [
    { name: "Pie1", count: 20 },
    { name: "Pie2", count: 80 },
  ],
  [
    { name: "Pie1", count: 70 },
    { name: "Pie2", count: 30 },
  ],
  [
    { name: "Pie1", count: 64 },
    { name: "Pie2", count: 36 },
  ],
];

const summary = {
  column: [
    "GROUP",
    "ENGAGEMENT",
    "INFLUENCE",
    "INTEREST",
    "SENTIMENT",
    "CONFIDENCE",
  ],
  data: [
    ["Team Members Overall", 7.2, 2.2, 6.0, 6.0, 7.9],
    ["Stakeholder Overall", 3.1, 8.4, 1.8, 4.7, 8.1],
    ["Most Influential People", 7.2, 2.2, 6.0, 6.0, 7.9],
    ["Decision Makers", 3.1, 2.2, 6.0, 6.0, 7.9],
    ["Working on Critical Path", 3.1, 5.2, 1.0, 9.0, 7.9],
  ],
};

const lineChartData = [
  { a: 1, b: 3 },
  { a: 2, b: 6 },
  { a: 3, b: 2 },
  { a: 4, b: 12 },
  { a: 5, b: 8 },
];

const positive = [
  "Working on Critical Path",
  "Safety",
  "Acme Ltd",
  "Electical",
  "Engineering Team",
];

const negative = [
  "Working on Critical Path",
  "Safety",
  "Acme Ltd",
  "Electical",
  "Engineering Team",
];

const cultureResult = [
  { culture: "Safe to Speak", result: 0.8 },
  { culture: "Planning", result: 0.7 },
  { culture: "Preparation", result: 0.3 },
  { culture: "Collaboration", result: 0.9 },
  { culture: "Workload", result: 0.4 },
  { culture: "Innovation", result: 0.7 },
  { culture: "Agility", result: 0.6 },
  { culture: "Experience", result: 0.5 },
  { culture: "Diversity", result: 0.8 },
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
                <div className={styles.content}>
                  <LineChart
                    key="linechart"
                    data={lineChartData}
                    width={400}
                    height={180}
                    margin={20}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Feedback Summary</span>
                <div className={styles.content}>
                  <FeedbackSummary data={summary} />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}></span>
                <div className={styles.content}>
                  <div className={styles.row}>
                    <div className={styles.block}>
                      <span className={styles["block__title"]}>
                        Top Positive
                      </span>
                      <div className={styles.content}>
                        <TopSummary data={positive} type="positive" />
                      </div>
                    </div>
                    <div className={styles.block}>
                      <span className={styles["block__title"]}>
                        Top Negative
                      </span>
                      <div className={styles.content}>
                        <TopSummary data={negative} type="negative" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Culture Results</span>
                <div className={styles.content}>
                  <CultureResult data={cultureResult} />
                </div>
              </div>
            </div>
          </div>
          <div className={classnames(styles.right)}>
            <div className={classnames("row", styles["donut-container"])}>
              <h2 className={styles.title}>Overall Sentiment</h2>
              <Emoji satisfaction={71} />
            </div>
            <div className={classnames("row", styles["sentiment-result"])}>
              <SentimentResult data={sentimentResult} />
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
