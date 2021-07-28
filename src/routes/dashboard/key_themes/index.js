import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

import TableContainer from "./TableContainer";
import CarouselContainer from "./CarouselContainer";

import NoDashboard from "Components/report/NoDashboard";

import { getKeyThemeMenuCnt } from "Redux/actions";

const tabMenu = {
  risks: {
    label: "Risks",
    question: "",
    img_white: "/assets/img/report/tab-risks-white.png",
    img_grey: "/assets/img/report/tab-risks-grey.png",
    component: <TableContainer tab={1} label="Risks" />,
  },
  "overall-sentiment": {
    label: "Own Words",
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

const ReportKeyThemes = ({
  history,
  projectTitle,
  status,
  surveyId,
  surveyUserId,
  actionGetKeyThemeMenuCnt,
}) => {
  const [tab, setTab] = useState("");
  const [availableMenu, setAvailableMenu] = useState([]);

  useEffect(() => {
    actionGetKeyThemeMenuCnt(surveyId, surveyUserId, (data) => {
      const menuCnt = {};

      menuCnt["risks"] = data.risks;
      menuCnt["overall-sentiment"] = data.overall_sentiment;
      menuCnt["unspoken-problem"] = data.unspoken_problem;
      menuCnt["project-interest"] = data.project_interest;
      menuCnt["personal-interest"] = data.personal_interest;
      menuCnt["improvement"] =
        data.improvement_change +
        data.improvement_keep +
        data.improvement_start +
        data.improvement_stop;

      setAvailableMenu(menuCnt);

      const keys = Object.keys(menuCnt);
      for (let i = 0; i < keys.length; i++) {
        if (menuCnt[keys[i]] > 0) {
          setTab(keys[i]);
          break;
        }
      }
    });
  }, [surveyId, surveyUserId, actionGetKeyThemeMenuCnt]);

  const handleSelectTab = (t) => {
    setTab(t);
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav
          history={history}
          menuTitle="Key Themes"
          style={{ background: "#f5f5f5" }}
        >
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      {status && tab !== "" ? (
        <div className={styles["main-content"]}>
          <div className={styles["keytheme-tab-container"]}>
            <div className={styles["keythemes-tab-menu"]}>
              {Object.keys(tabMenu).map((key) => {
                if (!(key in availableMenu)) {
                  return null;
                }

                if (availableMenu[key] === 0) {
                  return null;
                }

                return (
                  <div
                    key={`keythemes-tab-${key}`}
                    className={classnames(styles["keythemes-tab-item"], {
                      [styles.active]: key === tab,
                    })}
                    role="button"
                    onClick={(e) => handleSelectTab(key)}
                  >
                    <img
                      src={
                        key === tab
                          ? tabMenu[key].img_white
                          : tabMenu[key].img_grey
                      }
                    />
                    {tabMenu[key].label}
                  </div>
                );
              })}
            </div>
          </div>
          {tabMenu[tab].component}
        </div>
      ) : (
        <div className={styles["main-content"]}>
          <NoDashboard />
        </div>
      )}
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
  actionGetKeyThemeMenuCnt: getKeyThemeMenuCnt,
})(ReportKeyThemes);
``;
