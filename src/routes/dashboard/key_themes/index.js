import React, { useState } from "react";
import { connect } from "react-redux";

import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

import TableContainer from "./TableContainer";
import CarouselContainer from "./CarouselContainer";

const tabMenu = {
  "risks": { label: "Risks", component: <TableContainer tab={1} label="Risks" /> },
  "overall-sentiment": { label: "Overall Sentiment", component: <CarouselContainer tab={2} label="Overall Sentiment" /> },
  "unspoken-problem": { label: "Unspoken Problem", component: <CarouselContainer tab={3} label="Unspoken Problem" /> },
  "project-interest": { label: "Project Interest", component: <TableContainer tab={4} label="Project Interest" /> },
  "personal-interest": { label: "Personal Interest", component: <TableContainer tab={5} label="Personal Interest" /> },
  "improvement": { label: "Improvement", component: <TableContainer tab={6} label="Improvement" /> }
};

const ReportKeyThemes = ({
  history,
  projectTitle
}) => {
  const [tab, setTab] = useState("risks");

  const handleSelectTab = (t) => {
    setTab(t);
  }

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="KeyThemes">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>
        <div className={styles["keythemes-tab-menu"]}>
          {Object.keys(tabMenu).map((key) => (
            <div
              key={`keythemes-tab-${key}`}
              className={classnames(styles["keythemes-tab-item"], {[styles.active]: key === tab })}
              role="button"
              onClick={(e) => handleSelectTab(key)}
            >
              {tabMenu[key].label}
            </div>
          ))}
        </div>
        {tabMenu[tab].component}
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

export default connect(mapStateToProps, {})(ReportKeyThemes);
