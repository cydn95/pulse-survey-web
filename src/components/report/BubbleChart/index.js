import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  BubbleSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import {
  materialColors,
} from "../syncfusion/theme-line";
import SampleBase from "../syncfusion/SampleBase";

export let pointRender = (args) => {
  args.fill = materialColors[args.point.index % 10];
};

export let data = [
  { x: 92.2, y: 7.8, size: 1.347, text: "China" },
  { x: 74, y: 6.5, size: 1.241, text: "India" },
  { x: 90.4, y: 6.0, size: 0.238, text: "Indonesia" },
  { x: 99.4, y: 2.2, size: 0.312, text: "US" },
  { x: 88.6, y: 1.3, size: 0.197, text: "Brazil" },
  { x: 99, y: 0.7, size: 0.0818, text: "Germany" },
  { x: 72, y: 2.0, size: 0.0826, text: "Egypt" },
  { x: 99.6, y: 3.4, size: 0.143, text: "Russia" },
  { x: 99, y: 0.2, size: 0.128, text: "Japan" },
  { x: 86.1, y: 4.0, size: 0.115, text: "Mexico" },
  { x: 92.6, y: 6.6, size: 0.096, text: "Philippines" },
  { x: 61.3, y: 1.45, size: 0.162, text: "Nigeria" },
  { x: 82.2, y: 3.97, size: 0.7, text: "Hong Kong" },
  { x: 79.2, y: 3.9, size: 0.162, text: "Netherland" },
  { x: 72.5, y: 4.5, size: 0.7, text: "Jordan" },
  { x: 81, y: 3.5, size: 0.21, text: "Australia" },
  { x: 66.8, y: 3.9, size: 0.028, text: "Mongolia" },
  { x: 78.4, y: 2.9, size: 0.231, text: "Taiwan" },
];

class BubbleChart extends SampleBase {
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <ChartComponent
            id="charts_bubble"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              title: "",
              minimum: 0,
              maximum: 100,
              interval: 10,
            }}
            primaryYAxis={{
              title: "",
              minimum: 0,
              maximum: 100,
              interval: 10,
            }}
            width={"100%"}
            title=""
            pointRender={pointRender}
            legendSettings={{ visible: false }}
            loaded={this.onChartLoad.bind(this)}
            tooltip={{
              enable: false,
              // format:
              //   "${point.text}<br/>Literacy Rate : <b>${point.x}%</b>" +
              //   "<br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : strenthget <b>${point.size} Billion</b>",
              format: "${point.text}",
            }}
          >
            <Inject services={[BubbleSeries, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={this.props.data}
                type="Bubble"
                minRadius={3}
                maxRadius={Browser.isDevice ? 6 : 8}
                xName="x"
                yName="y"
                size="size"
                name=""
                marker={{ dataLabel: { name: "text" } }}
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }

  onChartLoad(args) {
    let chart = document.getElementById("charts_bubble");
    chart.setAttribute("title", "");
  }
}

export default BubbleChart;
