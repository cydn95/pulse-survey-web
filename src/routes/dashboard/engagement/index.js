import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import { engagementTrend } from "Redux/actions";

import HeatMap from "Components/report/HeatMap";
import CardMap from "Components/report/CardMap";
import TopNav from "Containers/TopNav";

import { isMobile } from "react-device-detect";

import styles from "./styles.scss";
// import classnames from "classnames";

const ReportEngagement = ({
  history,
  projectTitle,
  actionEngagementTrend,
  surveyId,
}) => {
  const [chartWidth, setChartWidth] = useState(100);

  const [engagementData, setEngagementData] = useState({
    Engagement: [],
  });
  // const [engagementData, setEngagementData] = useState({
  //   Engagement: [
  //     "Engineering",
  //     "Project Controls",
  //     "Drilling & Completions",
  //     "External Stakeholders",
  //   ],
  //   "Response Rate": ["80%", "100%", "50%", "30%"],
  //   "Actual Engagement": [4.4, 6.5, 4.3, 6.4],
  //   "Necessary Engagement": [4.4, 6.5, 4.3, 6.4],
  //   "Communication Volume": [5.6, 3.9, 3.9, 6.2],
  //   "Communication Trust": [3.4, 8, 5.4, 3.9],
  //   "Project Understanding": [5.2, 4.8, 4.6, 4.3],
  //   "Team Understanding": [2.9, 6.6, 5.1, 5.2],
  // });

  useEffect(() => {
    actionEngagementTrend(surveyId, "", "", callback);
  }, [surveyId, actionEngagementTrend]);

  const callback = (ret) => {
    // console.log(ret);
    setEngagementData({ ...ret });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="Engagement Dashboard">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div
        className={styles["main-content"]}
        ref={(el) => {
          // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
          if (!el) return;

          // console.log('total', el.getBoundingClientRect().width);
          const width =
            engagementData.Engagement.length === 0
              ? 0
              : (el.getBoundingClientRect().width - 40) /
                  (engagementData.Engagement.length + 1) -
                10;
          // console.log('c wid', width);
          setChartWidth(width);
        }}
      >
        {!isMobile && <HeatMap data={engagementData} chartWidth={chartWidth} />}
        {isMobile &&
          Object.keys(engagementData).map((key) => {
            if (key === "Engagement" || key === "Response Rate") {
              return null;
            }

            return (
              <CardMap
                title={key}
                data={engagementData[key]}
                field={engagementData["Engagement"]}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyId, surveyUserId } = authUser;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionEngagementTrend: engagementTrend,
})(ReportEngagement);
