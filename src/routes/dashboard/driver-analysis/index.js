import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import { engagementTrend } from "Redux/actions";

import HeatMap from "Components/report/HeatMap";
import CardMap from "Components/report/CardMap";
import TopNav from "Containers/TopNav";

import { isMobile } from "react-device-detect";

import styles from "./styles.scss";
// import classnames from "classnames";

const ReportDriverAnalysis = ({
  history,
  projectTitle,
  actionEngagementTrend,
  surveyId,
  surveyUserId
}) => {
  const [chartWidth, setChartWidth] = useState(100);

  const [driverName, setDriverName] = useState("Engagement");
  const [chartType, setChartType] = useState("SHGroup");

  const [engagementData, setEngagementData] = useState({
    [driverName]: [],
  });

  useEffect(() => {
    setEngagementData({ [driverName]: [] })
    console.log('params', surveyId, surveyUserId);
    actionEngagementTrend(chartType, driverName, surveyId, surveyUserId, "", "", callback);
  }, [surveyId, surveyUserId, actionEngagementTrend, driverName, chartType]);

  const callback = (ret) => {
    // console.log(ret);
    setEngagementData({ ...ret });
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="Driver Analysis">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div
        className={styles["main-content"]}
        ref={(el) => {
          if (!el) return;

          const keyData = driverName in engagementData ? engagementData[driverName] : [];
          const width = keyData.length === 0 ? 0 : (el.getBoundingClientRect().width - 40) / (keyData.length + 1) - 10;
          setChartWidth(width);
        }}
      >
        <p>
          <button onClick={(e) => setChartType('SHGroup')}>SHGroup</button>{` `}
          <button onClick={(e) => setChartType('Team')}>Team</button>{` `}
          <button onClick={(e) => setChartType('Organization')}>Organization</button>{` `}
        </p>
        <p>
          <button onClick={(e) => setDriverName('Engagement')}>Engagement</button>{` `}
          <button onClick={(e) => setDriverName('Culture')}>Culture</button>{` `}
          <button onClick={(e) => setDriverName('Sentiment')}>Sentiment</button>{` `}
          <button onClick={(e) => setDriverName('Interest')}>Interest</button>{` `}
          <button onClick={(e) => setDriverName('Confidence')}>Confidence</button>{` `}
          <button onClick={(e) => setDriverName('Relationships')}>Relationships</button>{` `}
          <button onClick={(e) => setDriverName('Improvement')}>Improvement</button>
        </p>
        {!isMobile && <HeatMap data={engagementData} chartWidth={chartWidth} />}
        {isMobile &&
          Object.keys(engagementData).map((key) => {
            if (key === driverName || key === "Response Rate") {
              return null;
            }

            return (
              <CardMap
                key={`card-map-${key}`}
                title={key}
                data={engagementData[key]}
                field={engagementData[driverName]}
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
})(ReportDriverAnalysis);
