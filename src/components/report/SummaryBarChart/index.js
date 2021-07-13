import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import SampleBase from "../syncfusion/SampleBase";
export let data1 = [
  { x: "USA", y: 46 },
  { x: "GBR", y: 27 },
  { x: "CHN", y: 26 },
];
export let data2 = [
  { x: "USA", y: 37 },
  { x: "GBR", y: 23 },
  { x: "CHN", y: 18 },
];
export let data3 = [
  { x: "USA", y: 38 },
  { x: "GBR", y: 17 },
  { x: "CHN", y: 26 },
];
class SummaryBarChart extends SampleBase {
  render() {
    const { data } = this.props;

    const column = data.column;
    const values = data.data;

    const chartData = [];
    const keys = [];
    for (let j = 0; j < values.length; j++) {
      const subData = [];
      for (let i = 1; i < column.length; i++) {
        subData.push({
          x: column[i],
          y: values[j][i],
        });
      }
      chartData.push(subData);
    }

    for (let i = 0; i < values.length; i++) {
      keys.push(values[i][0]);
    }

    // console.log(chartData);
    // console.log(keys);
    return (
      <div className="control-pane">
        <div className="control-section">
          <ChartComponent
            id="charts-feedback-summary"
            style={{ textAlign: "center" }}
            // load={this.load.bind(this)}
            primaryXAxis={{
              valueType: "Category",
              interval: 1,
              majorGridLines: { width: 0 },
            }}
            primaryYAxis={{
              majorGridLines: { width: 0 },
              majorTickLines: { width: 0 },
              lineStyle: { width: 0 },
              labelStyle: { color: "transparent" },
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            width={"100%"}
            title=""
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
            />
            <SeriesCollectionDirective>
              {keys.map((item, index) => {
                const data1 = [];
                chartData[index].forEach((item) => {
                  data1.push({
                    x: item.x,
                    y: (item.y / 10).toFixed(1)
                  })
                })
                return (
                  <SeriesDirective
                    key={`feedback-chart-${index}`}
                    dataSource={data1}
                    xName="x"
                    yName="y"
                    name={item}
                    type="Column"
                    marker={{
                      dataLabel: {
                        visible: true,
                        position: "Top",
                        font: { fontWeight: "600", color: "#ffffff" },
                      },
                    }}
                  ></SeriesDirective>
                );
              })}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
  onChartLoad(args) {
    let chart = document.getElementById("charts-feedback-summary");
    chart.setAttribute("title", "");
  }
}

export default SummaryBarChart;
