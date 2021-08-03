import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import ReactLoading from "react-loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

import {
  engagementTrend,
  getAMQuestionCnt,
  driverAnalysisCnt,
} from "Redux/actions";

import HeatMap from "Components/report/HeatMap";
import CardMap from "Components/report/CardMap";
import NoDashboard from "Components/report/NoDashboard";
import TopNav from "Containers/TopNav";

import { isMobile } from "react-device-detect";

import styles from "./styles.scss";
import classnames from "classnames";

const filters = ["SHGroup", "Team", "Organization"];
const drivers = [
  "Engagement",
  "Culture",
  "Sentiment",
  "Interest",
  "Confidence",
  "Relationships",
  "Improvement",
];

const ReportDriverAnalysis = ({
  history,
  projectTitle,
  actionEngagementTrend,
  actionDriverAnalysisCnt,
  surveyId,
  surveyUserId,
  projectId,
  userId,
  status,
}) => {
  console.log("dashboard status", status);

  const [loading, setLoading] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(0);

  const [chartWidth, setChartWidth] = useState(100);

  const [driverList, setDriverList] = useState([]);
  const [driverName, setDriverName] = useState("");
  // const [chartType, setChartType] = useState(filters[0]);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalStakeholderCnt, setTotalStakeholdercnt] = useState(0);
  const [engagementData, setEngagementData] = useState({
    [driverName]: [],
  });
  const [shGroup, setShGroup] = useState([]);

  const handleSelectFilter = (index) => {
    setFilterValue(index);
    setFilterOpen(false);
  };

  useEffect(() => {
    actionDriverAnalysisCnt(
      surveyId,
      surveyUserId,
      "2019-01-01",
      "2021-12-31",
      (result) => {
        const driverList = [];

        drivers.forEach((d) => {
          if (d in result && result[d] > 0) {
            driverList.push(d);
          }
        });

        if (driverList.length > 0) {
          setDriverName(driverList[0]);
        }

        setDriverList([...driverList]);
      }
    );
  }, [surveyId, surveyUserId, actionDriverAnalysisCnt]);

  useEffect(() => {
    setLoading(true);
    setEngagementData({ [driverName]: [] });

    actionEngagementTrend(
      filters[filterValue],
      driverName,
      surveyId,
      surveyUserId,
      projectId,
      userId,
      "2019-01-01",
      "2021-12-31",
      callback
    );
  }, [surveyId, surveyUserId, actionEngagementTrend, driverName, filterValue]);

  const callback = (ret) => {
    setLoading(false);
    console.log('shgroup ret', ret);
    setTotalAnswered(ret.totalAnswered);
    setTotalStakeholdercnt(ret.shCnt);
    setEngagementData({ ...ret.data });
    if ("shGroup" in ret) {
      setShGroup(ret.shGroup);
    }
  };

  const renderReport = () => {
    if (driverList.length === 0) {
      return (
        <div className={styles["main-content"]}>
          <NoDashboard code="400" />
        </div>
      );
    }

    if (status.code.toString() !== 200 && status.code.toString() !== "201") {
      <div className={styles["main-content"]}>
        <NoDashboard code={status.code.toString()} />
      </div>
    }
    
    return (
      <Fragment>
        <div className={styles["main-content"]}>
          <div className={styles["filter-content"]}>
            <div className={styles["filter-select"]}>
              <div
                className={styles["filter-select-button"]}
                role="button"
                onClick={(e) => setFilterOpen(!filterOpen)}
              >
                Filter by
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              {filterOpen && (
                <div className={styles["filter-panel"]}>
                  <div className={styles["filter-panel-triangle"]}></div>
                  <div className={styles["filter-panel-content"]}>
                    {filters.map((f, index) => (
                      <div
                        className={styles["filter-panel-item"]}
                        onClick={(e) => handleSelectFilter(index)}
                        key={`filter-item-${f}`}
                      >
                        {f}{" "}
                        <FontAwesomeIcon
                          className={classnames({
                            [styles.hide]: filterValue !== index,
                          })}
                          icon={faCheck}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles["filter-value"]}>{filters[filterValue]}</div>
          </div>
          <div className={styles["show-panel"]}>
            <span>Show: </span>
            <div className={styles["show-select"]}>
              {driverList.map((d) => (
                <div
                  key={`driver-name-${d}`}
                  className={classnames(styles["show-select-item"], {
                    [styles.active]: driverName === d,
                  })}
                  onClick={(e) => setDriverName(d)}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles["main-content"]}
          ref={(el) => {
            if (!el) return;

            const keyData =
              driverName in engagementData ? engagementData[driverName] : [];
            const width =
              keyData.length === 0
                ? 0
                : (el.getBoundingClientRect().width - 40) /
                    (keyData.length + 1) -
                  10;
            setChartWidth(width);
          }}
        >
          <div style={{ width: "100%" }}>
            {loading ? (
              <ReactLoading
                className={styles["driver-analysis-loading"]}
                type={"bars"}
                color={"grey"}
              />
            ) : (
              <div style={{ width: "100%" }}>
                {!isMobile && (
                  <HeatMap
                    data={engagementData}
                    admin={status.code && status.code.toString() === "201"}
                    totalAnswered={totalAnswered}
                    thresholdCnt={status.thresholdCnt ? status.thresholdCnt : 0}
                    shCnt={totalStakeholderCnt}
                    chartWidth={chartWidth}
                    shGroup={shGroup}
                    filter={filters[filterValue]}
                  />
                )}
                {isMobile &&
                  Object.keys(engagementData).map((key) => {
                    if (key === driverName) {
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
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav
          history={history}
          menuTitle="Driver Analysis"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      {renderReport()}
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyId, surveyUserId, projectId, user } = authUser;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
    projectId,
    userId: user.userId,
  };
};

export default connect(mapStateToProps, {
  actionEngagementTrend: engagementTrend,
  actionGetAMQuestionCnt: getAMQuestionCnt,
  actionDriverAnalysisCnt: driverAnalysisCnt,
})(ReportDriverAnalysis);
