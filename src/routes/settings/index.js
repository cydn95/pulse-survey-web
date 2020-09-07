import React from "react";
import { connect } from "react-redux";

import TopNav from "Containers/TopNav";

import Account from "./account";

import styles from "./styles.scss";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    const { tab } = props.match.params;

    this.state = {
      tab: tab == undefined || tab == null ? "account" : tab,
    };
  }

  render() {
    const { history, projectTitle } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle="Profile">
            <div className={styles.section}>
              <h2 className={styles["project-name"]}>{projectTitle}</h2>
            </div>
          </TopNav>
        </div>
        <div className={styles["setting-container"]}>
          <Account />
          {/* <TabPanel
            selectedTab={tab}
            data={[
              {
                title: "Account",
                name: "account",
                type: "default",
                content: <Account />,
              },
              {
                title: "Projects",
                name: "projects",
                type: "default",
                content: <Project history={history} />,
              },
            ]}
          ></TabPanel> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyTitle } = authUser;

  return {
    projectTitle,
    surveyTitle,
  };
};

export default connect(mapStateToProps, {})(Settings);
