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
import { materialColors } from "../syncfusion/theme-line";
import SampleBase from "../syncfusion/SampleBase";

const colors = [
  "#c9243f",
  "#f26649",
  "#ebd539",
  "#fff685",
  "#513a85",
  "#b292c4",
  "#001c54",
  "#4495d1",
  "#005a60",
  "#7cccbf",
];
export let pointRender = (args, data) => {
  args.fill = colors[data[args.point.index].color];
  args.width = data[args.point.index].size;
  args.height = data[args.point.index].size;
};

class BubbleChart extends SampleBase {
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <ChartComponent
            id="charts_bubble"
            style={{ textAlign: "center" }}
            primaryXAxis={{
              title: this.props.x,
              minimum: -50,
              maximum: 50,
              interval: 10,
            }}
            primaryYAxis={{
              title: this.props.y,
              minimum: -50,
              maximum: 50,
              interval: 10,
            }}
            width={"100%"}
            title=""
            pointRender={(args) => pointRender(args, this.props.data)}
            legendSettings={{ visible: false }}
            loaded={this.onChartLoad.bind(this)}
            tooltip={{
              enable: true,
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
                minRadius={0.0001}
                maxRadius={10}
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
