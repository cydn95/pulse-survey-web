import React from "react";
import { connect } from "react-redux";

import {
  HeatMapComponent,
  Tooltip,
  Inject,
} from "@syncfusion/ej2-react-heatmap";

// import * as data from "./cell-seletion-data.json";
import { SampleBase } from "../common/sample-base";
import { PropertyPane } from "../common/property-pane";
import {
  ChartComponent,
  Legend,
  ColumnSeries,
  Category,
  DataLabel,
  Tooltip as chartTooltip,
} from "@syncfusion/ej2-react-charts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import HeatMap from "Components/report/HeatMap";

import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
// import classnames from "classnames";

const data = {
  "Engagement": ["Engineering", "Project Controls", "Drilling & Completions", "External Stakeholders"],
  "Response Rate": ["80%", "100%", "50%", "30%"],
  "Actual Engagement": [4.4, 6.5, 4.3, 6.4],
  "Necessary Engagement": [4.4, 6.5, 4.3, 6.4],
  "Communication Volume": [5.6, 3.9, 3.9, 6.2],
  "Communication Trust": [3.4, 8, 5.4, 3.9],
  "Project Understanding": [5.2, 4.8, 4.6, 4.3],
  "Team Understanding": [2.9, 6.6, 5.1, 5.2],
};

class ReportEngagement extends SampleBase {
  render() {
    const { history, projectTitle } = this.props;
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
        <div className={styles["main-content"]}>
          <HeatMap data={data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyId, surveyUserId } = authUser;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {})(ReportEngagement);
