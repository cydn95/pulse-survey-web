import React, { Component } from "react";
import * as d3 from "d3";

import { MONTH } from "Util/Utils";

import styles from "./styles.scss";

class LineChart extends Component {
  render() {
    const { data, width, height, margin } = this.props;

    const h = height - 2 * margin,
      w = width - 2 * margin;

    //number formatter
    const xFormat = d3.format(".2");
    
    //x scale
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.a)) //domain: [min,max] of a
      .range([21, w-1]);

    //y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.b)]) // domain [0,max] of b (start from 0)
      .range([h, margin]);

    //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
    const line = d3
      .line()
      .x((d) => x(d.a))
      .y((d) => y(d.b))
      .curve(d3.curveCatmullRom.alpha(0.5)); //curve line

    const xTicks = x.ticks(12).map((d, index) =>
      x(d) > margin && x(d) < w ? (
        <g key={`xTicks_${index}`} transform={`translate(${x(d)},${h + margin})`}>
          <text>{xFormat(d)}</text>
          <line x1="0" x1="0" y1="0" y2="5" transform="translate(0,-20)" />
        </g>
      ) : null
    );

    const yTicks = y.ticks(5).map((d, index) =>
      y(d) > 10 && y(d) < h ? (
        <g key={`yTicks_${index}`} transform={`translate(${margin},${y(d)})`}>
          <text x="-12" y="5">
            {xFormat(d)}
          </text>
          <line x1="0" x1="5" y1="0" y2="0" transform="translate(-5,0)" />
          <line
            className={styles.gridline}
            x1="0"
            x1={w - margin}
            y1="0"
            y2="0"
            transform="translate(-5,0)"
          />
        </g>
      ) : null
    );

    return (
      <div className={styles['line-chart']}>
        <svg width={width} height={height}>
          <line className={styles.axis} x1={margin} x2={w} y1={h} y2={h} />
          <line
            className={styles.axis}
            x1={margin}
            x2={margin}
            y1={margin}
            y2={h}
          />
          <path d={line(data)} />
          <g className={styles["axis-labels"]}>{xTicks}</g>
          <g className={styles["axis-labels"]}>{yTicks}</g>
        </svg>
      </div>
    );
  }
}

export default LineChart;