import React, { useState } from "react";
import { connect } from "react-redux";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

import TableContainer from "./TableContainer";
import CarouselContainer from "./CarouselContainer";

const tabMenu = {
  risks: {
    label: "Risks",
    question: "",
    img_white: "/assets/img/report/tab-risks-white.png",
    img_grey: "/assets/img/report/tab-risks-grey.png",
    component: <TableContainer tab={1} label="Risks" />,
  },
  "overall-sentiment": {
    label: "Overall Sentiment",
    img_white: "/assets/img/report/tab-sentiment-white.png",
    img_grey: "/assets/img/report/tab-sentiment-grey.png",
    component: (
      <CarouselContainer
        tab={2}
        label="How do you think the project is going - in your words:"
      />
    ),
  },
  "unspoken-problem": {
    label: "Unspoken Problem",
    img_white: "/assets/img/report/tab-unspoken-white.png",
    img_grey: "/assets/img/report/tab-unspoken-grey.png",
    component: (
      <CarouselContainer
        tab={3}
        label="Is there a problem that people aren't discussing openly?"
      />
    ),
  },
  "project-interest": {
    label: "Project Interest",
    img_white: "/assets/img/report/tab-project-white.png",
    img_grey: "/assets/img/report/tab-project-grey.png",
    component: (
      <TableContainer
        tab={4}
        label="What do you care about the most on this project?"
      />
    ),
  },
  "personal-interest": {
    label: "Personal Interest",
    img_white: "/assets/img/report/tab-personal-white.png",
    img_grey: "/assets/img/report/tab-personal-grey.png",
    component: (
      <TableContainer
        tab={5}
        label="What do you personally want to get out of this project?"
      />
    ),
  },
  improvement: {
    label: "Improvement",
    img_white: "/assets/img/report/tab-improvement-white.png",
    img_grey: "/assets/img/report/tab-improvement-grey.png",
    component: (
      <div style={{ width: "100%" }}>
        <TableContainer tab={6} label="Keep / What's Going Well?" />
        <TableContainer tab={7} label="Start" />
        <TableContainer tab={8} label="Change" />
        <TableContainer tab={9} label="Stop" />
      </div>
    ),
  },
};

const ReportKeyThemes = ({ history, projectTitle }) => {
  const [tab, setTab] = useState("risks");
  // const [tab, setTab] = useState("unspoken-problem");

  const handleSelectTab = (t) => {
    setTab(t);
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="Key Themes" style={{ background: '#f5f5f5' }}>
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>
        {/* <div className={styles["keythemes-select-menu"]}>
          <Select
            style={{width: '100%'}}
            value={tab}
            onChange={(e) => handleSelectTab(e.target.value)}
          >
            {Object.keys(tabMenu).map((key) => (
              <MenuItem key={`keythemes-tab-${key}`} value={key}>
                {tabMenu[key].label}
              </MenuItem>
            ))}
          </Select>
        </div> */}
        <div className={styles["keytheme-tab-container"]}>
          <div className={styles["keythemes-tab-menu"]}>
            {Object.keys(tabMenu).map((key) => (
              <div
                key={`keythemes-tab-${key}`}
                className={classnames(styles["keythemes-tab-item"], {
                  [styles.active]: key === tab,
                })}
                role="button"
                onClick={(e) => handleSelectTab(key)}
              >
                <img src={key === tab ? tabMenu[key].img_white : tabMenu[key].img_grey} />
                {tabMenu[key].label}
              </div>
            ))}
          </div>
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
