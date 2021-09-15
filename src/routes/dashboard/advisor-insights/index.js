import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import ReactLoading from "react-loading";
import TopNav from "Containers/TopNav";
import { advisorReport } from "Redux/actions";

import NoDashboard from "Components/report/NoDashboard";

import styles from "./styles.scss";
import classnames from "classnames";

const AdvisorInsights = ({
  projectTitle,
  userId,
  surveyId,
  surveyUserId,
  actionAdvisorReport,
  status,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [more, setMore] = useState(false);

  const callback = (res) => {
    setLoading(false);
    setData(res);
  };

  useEffect(() => {
    setLoading(true);
    actionAdvisorReport(surveyId, surveyUserId, callback);
  }, [actionAdvisorReport, surveyId, surveyUserId]);

  const renderReport = () => {
    if (status.code.toString() !== "200" && status.code.toString() !== "201") {
      return (
        <div className={styles["main-content"]}>
          <NoDashboard code={status.code.toString()} threshold={status.thresholdCnt} />
        </div>
      );
    }

    return (
      <Fragment>
        {loading || data === null ? (
          <ReactLoading
            className={styles["advisor-insight-loading"]}
            type={"bars"}
            color={"grey"}
          />
        ) : (
          <div className={styles["advisor-insight-content"]}>
            <div className={styles["content-left"]}>
              <div className={styles["content-header"]}>
                <div className={styles["header-content"]}>
                  <div className={styles["sub-title"]}>
                    What are the key takeaways from this analysis?
                  </div>
                  <br />
                </div>
              </div>
              {/* <div className={styles["content-header"]}>
                  <div className={styles["header-image"]}>
                    <img src="/assets/img/report/people.png" height="30" />
                  </div>
                  <div className={styles["header-content"]}>
                    <div className={styles["sub-title"]}>Respondents</div>
                    <div className={styles["header-category"]}>
                      {Object.keys(data.respondents).map((key) => (
                        <div
                          key={`header-shcategory-${key}`}
                          className={styles["category-item"]}
                        >
                          {`${data.respondents[key]} ${shCategories[key]}`}
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
              <div className={styles["content-data"]}>
                {Object.keys(data.detailedData).map((key) => (
                  <div
                    key={`content-item-${key}`}
                    className={styles["content-item"]}
                  >
                    <div className={styles["content-item-question"]}>
                      The teams / groups that feel the {" "}
                      <strong>{key}</strong> about the project are:
                    </div>
                    <div className={styles["content-item-data"]}>
                      {Object.keys(data.detailedData[key]).map((key2) => {
                        if (!data.detailedData[key][key2].name) {
                          return null;
                        }

                        return (
                          <div
                            className={styles["content-item-value"]}
                            key={`content-item-${key}-${key2}`}
                          >
                            <div className={styles["content-item-shgroup"]}>
                              {data.detailedData[key][key2].name}
                            </div>
                            <div
                              className={
                                styles["content-item-percent-container"]
                              }
                            >
                              <div
                                className={styles["content-item-percent-bar"]}
                                style={{
                                  width: `${
                                    (data.detailedData[key][key2].score / 10) *
                                    100
                                  }%`,
                                }}
                              ></div>
                              <div className={styles["content-item-value"]}>
                                {data.detailedData[key][key2].score.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["content-right"]}>
              <div className={styles["content-summary"]}>
                <div className={styles["sub-title"]}>Summary</div>
                <div className={styles["content-summary-item"]}>
                  <div
                    className={classnames(
                      styles["content-summary-value"],
                      styles.red
                    )}
                  >{`${Math.round(
                    data.summary.responseRateFromInvitedTeamMembers
                  )}%`}</div>
                  <div className={styles["content-summary-data"]}>
                    <div className={styles["content-summary-title"]}>
                      Response Rate From Invited Team
                    </div>
                    <div className={styles["content-summary-description"]}>
                      Members
                    </div>
                  </div>
                </div>
                <div className={styles["content-summary-item"]}>
                  <div
                    className={classnames(
                      styles["content-summary-value"],
                      styles.green
                    )}
                  >{`${Math.round(
                    data.summary.responseRateFromInvitedStakeholders
                  )}%`}</div>
                  <div className={styles["content-summary-data"]}>
                    <div className={styles["content-summary-title"]}>
                      Response Rate From Invited
                    </div>
                    <div className={styles["content-summary-description"]}>
                      Stakeholders
                    </div>
                  </div>
                </div>
                <div className={styles["content-summary-item"]}>
                  <div
                    className={classnames(
                      styles["content-summary-value"],
                      styles.blue
                    )}
                  >{`${data.summary.totalDepartments}`}</div>
                  <div className={styles["content-summary-data"]}>
                    <div className={styles["content-summary-title"]}>
                      Departments in Total
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["content-summary"]}>
                <div className={styles["sub-title"]}>Catch-up with ...</div>
                {data.catchupProjectUsers
                  .filter(
                    (item) => item.user.id.toString() !== userId.toString()
                  )
                  .map((d, index) => {
                    if (index > 2 && !more) {
                      return null;
                    }

                    if (index > 19) {
                      return null;
                    }

                    const color = !d.user.avatar
                      ? index % 3 === 0
                        ? styles.red
                        : index % 3 === 1
                        ? styles.green
                        : styles.blue
                      : null;
                    const avatar = d.user.avatar
                      ? `https://pulse.projectai.com${d.user.avatar.name}`
                      : "";

                    const nameA = `${d.user.first_name
                      .substring(0, 1)
                      .toUpperCase()}${d.user.last_name
                      .substring(0, 1)
                      .toUpperCase()}`;

                    return (
                      <div
                        key={`content-recommend-${index}`}
                        className={styles["content-summary-item"]}
                      >
                        <div
                          className={classnames(
                            styles["content-summary-avatar"],
                            color
                          )}
                        >
                          {avatar !== "" ? <img src={avatar} /> : nameA}
                        </div>
                        <div className={styles["content-summary-data"]}>
                          <div className={styles["content-summary-title"]}>
                            {`${d.user.first_name} ${d.user.last_name}`}
                          </div>
                          <div
                            className={styles["content-summary-description"]}
                          >
                            {d.team ? d.team.name : ""}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {data.catchupProjectUsers.filter(
                  (item) => item.user.id.toString() !== userId.toString()
                ).length > 3 && (
                  <div className={styles["content-more"]}>
                    <button
                      className={styles["content-more-button"]}
                      onClick={(e) => setMore(!more)}
                    >
                      {more ? "See Less" : "See More"}
                    </button>
                  </div>
                )}
              </div>
              <div className={styles["content-summary"]}>
                <div className={styles["sub-title"]}>
                  Rate these stakeholders
                </div>
                {data.recommendedProjectUsers
                  .filter(
                    (item) => item.user.id.toString() !== userId.toString()
                  )
                  .map((d, index) => {
                    const color = !d.user.avatar
                      ? index % 3 === 0
                        ? styles.red
                        : index % 3 === 1
                        ? styles.green
                        : styles.blue
                      : null;
                    const avatar = d.user.avatar
                      ? `https://pulse.projectai.com${d.user.avatar.name}`
                      : "";

                    const nameA = `${d.user.first_name
                      .substring(0, 1)
                      .toUpperCase()}${d.user.last_name
                      .substring(0, 1)
                      .toUpperCase()}`;

                    return (
                      <div
                        key={`content-recommend-${index}`}
                        className={styles["content-summary-item"]}
                      >
                        <div
                          className={classnames(
                            styles["content-summary-avatar"],
                            color
                          )}
                        >
                          {avatar !== "" ? <img src={avatar} /> : nameA}
                        </div>
                        <div className={styles["content-summary-data"]}>
                          <div className={styles["content-summary-title"]}>
                            {`${d.user.first_name} ${d.user.last_name}`}
                          </div>
                          <div
                            className={styles["content-summary-description"]}
                          >
                            {d.team ? d.team.name : ""}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };
  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav
          history={history}
          menuTitle="Advisor/Insights"
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
  const { surveyId, surveyUserId, user, projectTitle } = authUser;
  const { userId } = user;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
    userId,
  };
};

export default connect(mapStateToProps, {
  actionAdvisorReport: advisorReport,
})(AdvisorInsights);
