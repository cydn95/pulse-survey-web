import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  SplineSeries,
  DateTime,
  Legend,
  Tooltip,
  Category
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import SampleBase from "./SampleBase";
export let data1 = [
  { x: 1, y: 21 },
  { x: 2, y: 24 },
  { x: 3, y: 36 },
  { x: 4, y: 38 },
  { x: 5, y: 54 },
  { x: 6, y: 57 },
  { x: 7, y: 70 },
];
class TrendLine extends SampleBase {
  render() {
    const { data, num, width } = this.props;
    return (
      <div className="control-pane">
        <div className="control-section trend-line-chart">
          <ChartComponent
            id={`charts_${num}`}
            style={{ textAlign: "center", height: 140, width: width }}
            primaryXAxis={{
              labelPlacement: 'onTicks',
              valueType: "Category",
              // labelFormat: "y",
              // intervalType: "Years",
              edgeLabelPlacement: "Shift",
              interval: 1,
              // majorGridLines: { width: 1 },
            }}
            // load={this.load.bind(this)}
            primaryYAxis={{
              // labelFormat: "{value}%",
              labelFormat: "",
              rangePadding: "None",
              minimum: 0,
              maximum: 10,
              interval: 5,
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            // width={Browser.isDevice ? "100%" : "60%"}
            width={width + "px"}
            title=""
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[LineSeries, SplineSeries, Category, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data}
                xName="x"
                yName="y"
                name=""
                width={2}
                marker={{ visible: true, width: 3, height: 3 }}
                type="Spline"
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
  onChartLoad(args) { }
}

export default TrendLine;
