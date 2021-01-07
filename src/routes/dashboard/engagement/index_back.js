import React from "react";
import { connect } from "react-redux";

import {
  HeatMapComponent,
  Tooltip,
  Inject,
} from "@syncfusion/ej2-react-heatmap";
import * as data from "./cell-seletion-data.json";
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

import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
// import classnames from "classnames";

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
          <div className="col-md-9 control-section">
            <HeatMapComponent
              id="heatmap-container"
              style={{ height: "300px" }}
              ref={(t) => (this.heatmap = t)}
              titleSettings={{
                text: "Engagement Chart",
              }}
              xAxis={{
                labels: [
                  "Part of the Pulse team",
                  "Electrical Team",
                  "Structural Team",
                  "Management Team",
                  "Owner's Team",
                  "Product Team",
                  "Internal",
                ],
              }}
              yAxis={{
                labels: ["Overall Sentiment", "Desired Engagement", "Actual Engagement", "Overall Influence", "Team Culture"],
              }}
              dataSource={data.cellSelectionData}
              allowSelection={true}
              showTooltip={true}
              load={this.loads.bind(this)}
              cellSelected={this.cellSelected.bind(this)}
              paletteSettings={{
                palette: [{ color: "#3C5E62 " }, { color: "#86C843 " }],
              }}
            >
              <Inject services={[Tooltip]} />
            </HeatMapComponent>
            <ChartComponent
              id="container1"
              style={{ height: "300px" }}
              ref={(t) => (this.chart = t)}
              primaryXAxis={{
                valueType: "Category",
                interval: 1,
                majorGridLines: { width: 0 },
              }}
              chartArea={{ border: { width: 0 } }}
              primaryYAxis={{
                majorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                labelStyle: { color: "transparent" },
              }}
              series={data.chartData}
              load={this.load.bind(this)}
              tooltip={{
                enable: true,
              }}
            >
              <Inject
                services={[
                  ColumnSeries,
                  Legend,
                  DataLabel,
                  Category,
                  chartTooltip,
                ]}
              />
            </ChartComponent>
          </div>
          <div className="col-md-3 property-section">
            <PropertyPane title="Properties">
              <table
                id="property"
                title="Properties"
                className="property-panel-table"
                style={{ width: "100%" }}
              >
                <tbody>
                  <tr style={{ height: "50px" }}>
                    <td style={{ width: "40%" }}>
                      <div>
                        <ButtonComponent
                          id="clearSelection"
                          onClick={this.Change.bind(this)}
                        >
                          Clear Selection
                        </ButtonComponent>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
      </div>
    );
  }
  cellSelected(args) {
    let data = args.data;
    let length = data.length;
    let xAxis = [];
    let flag = [];
    let series = [];
    let i;
    let columnData = {};
    for (i = 0; i < length; i++) {
      if (xAxis.indexOf(data[i].xLabel) === -1) {
        xAxis.push(data[i].xLabel);
        flag.push(false);
      }
    }
    for (i = 0; i < length; i++) {
      let index = xAxis.indexOf(data[i].xLabel);
      if (!flag[index]) {
        flag[index] = true;
        let column = {};
        column.type = "Column";
        column.xName = "x";
        column.yName = "y";
        column.width = 2;
        column.name = data[i].xLabel;
        column.marker = { dataLabel: { visible: false } };
        column.dataSource = [];
        columnData = {};
        columnData.x = data[i].yLabel;
        columnData.y = data[i].value;
        column.dataSource.push(columnData);
        series.push(column);
      } else {
        columnData = {};
        columnData.x = data[i].yLabel;
        columnData.y = data[i].value;
        series[index].dataSource.push(columnData);
      }
    }
    this.chart.series = series;
    this.chart.refresh();
  }
  load(args) {
    const selectedTheme = "Material";
    args.chart.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
  }
  loads(args) {
    const selectedTheme = "Material";
    args.heatmap.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
  }
  Change(args) {
    this.heatmap.clearSelection();
    this.chart.series = data.chartData;
    this.chart.refresh();
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
