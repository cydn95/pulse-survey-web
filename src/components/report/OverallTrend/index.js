import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  AnnotationsDirective,
  AnnotationDirective,
  ChartAnnotation,
  Legend,
  Category,
  SplineSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import SampleBase from "../syncfusion/SampleBase";
import { Browser } from "@syncfusion/ej2-base";

export let data1 = [
  { x: "Sun", y: 15 },
  { x: "Mon", y: 22 },
  { x: "Tue", y: 32 },
  { x: "Wed", y: 31 },
  { x: "Thu", y: 29 },
  { x: "Fri", y: 24 },
  { x: "Sat", y: 18 },
];
export let data2 = [
  { x: "Sun", y: 10 },
  { x: "Mon", y: 18 },
  { x: "Tue", y: 28 },
  { x: "Wed", y: 28 },
  { x: "Thu", y: 26 },
  { x: "Fri", y: 20 },
  { x: "Sat", y: 15 },
];
export let data3 = [
  { x: "Sun", y: 2 },
  { x: "Mon", y: 12 },
  { x: "Tue", y: 22 },
  { x: "Wed", y: 23 },
  { x: "Thu", y: 19 },
  { x: "Fri", y: 13 },
  { x: "Sat", y: 8 },
];

class OverallTrend extends SampleBase {
  render() {
    const { data, width, height, margin, xRange, yRange } = this.props;

    return (
      <div className="control-pane">
        <div className="control-section">
          <ChartComponent
            id="charts"
            style={{ textAlign: "center" }}
            ref={(charts) => (this.chartInstance = charts)}
            primaryXAxis={{
              valueType: "Category",
              interval: 1,
              majorGridLines: { width: 0 },
              labelIntersectAction: "Rotate90",
            }}
            width={"100%"}
            height={"220px"}
            chartArea={{ border: { width: 0 } }}
            // load={this.load.bind(this)}
            primaryYAxis={{
              labelFormat: "{value}",
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
            }}
            tooltip={{ enable: false }}
            title=""
            loaded={this.onChartLoad.bind(this)}
            animationComplete={this.animationComplete.bind(this)}
          >
            <Inject
              services={[
                SplineSeries,
                Legend,
                Category,
                Tooltip,
                ChartAnnotation,
              ]}
            />
            <SeriesCollectionDirective>
              {data.map((d, index) => (
                <SeriesDirective
                  key={`overall_trend_line_chart_${index}`}
                  dataSource={d}
                  xName="x"
                  yName="y"
                  width={2}
                  name=""
                  type="Spline"
                  marker={{ visible: true, width: 10, height: 10 }}
                ></SeriesDirective>
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
  onChartLoad(args) {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  }
  animationComplete(args) {
    this.chartInstance.removeSvg();
    this.chartInstance.animateSeries = false;
    this.chartInstance["renderElements"]();
  }
}

export default OverallTrend;
