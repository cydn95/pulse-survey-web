import React, { useRef, useEffect } from "react";
import { PropTypes } from "prop-types";

import classnames from "classnames";

import * as d3 from "d3";

import styles from "./styles.scss";

const fillColors = {
  low: "#da0f15",
  medium: "#d2dde1",
  high: "#14be6b",
  none: "#233a70",
};

function getFillColors(d) {
  let fill = "";
  if (d.data.count > 51) {
    fill = fillColors.high;
  } else if (d.data.count > 26) {
    fill = fillColors.medium;
  } else {
    fill = fillColors.low;
  }
  return [fill, fillColors.none];
}

function renderGraph(node, props) {
  const { data, subDriver, keySelector, valueSelector, sentiment } = props;

  const bounds = node.parentNode.getBoundingClientRect();

  const svg = d3.select(node);

  svg.attr("width", bounds.width).attr("height", bounds.height);

  const maxRadius = Math.min(bounds.height, bounds.width) / 2;
  const padding = 0.1 * maxRadius;
  const hoverRadius = maxRadius - padding;
  const radius = 0.9 * hoverRadius;
  const innerRadius = radius * 0.8;

  let root = svg.select("g.main");
  if (root.empty()) {
    svg.append("g").attr("class", "main");
    root = svg.select("g.main");
  }

  root.attr(
    "transform",
    `translate(${bounds.width / 2}, ${bounds.height / 2})`
  );

  const eyeDist = innerRadius / 2.2;
  const thick = innerRadius * 0.1;
  let face = root.select("g." + styles.face);
  if (face.empty()) {
    // TODO: make responsive to changes
    face = root.append("g").attr("class", styles.face);

    let textList = [];
    if (subDriver.length > 13) {
      textList = subDriver.split(" ");
    } else {
      textList.push(subDriver);
    }

    for (let i = 0; i < textList.length; i++) {
      face
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", styles.text)
        .text(textList[i])
        .attr("dy", 0 + 20 * i);
    }
  }

  // centerize the face
  face.attr(
    "transform",
    `translate(0, ${thick - face.node().getBBox().height / 2})`
  );

  const pie = d3
    .pie()
    .value((d) => valueSelector(d))
    .sort(null);

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .padAngle(0.05)
    .cornerRadius(4);

  const path = root
    .selectAll("." + styles.pie)
    .data(pie(data), (pieDatum, i) => {
      return keySelector(pieDatum.data, i);
    });

  path.exit().remove();

  const r = () => {
    const c = Math.floor(Math.random() * 256);
    const a = Math.floor(c / 16);
    const b = c % 16;
    const getc = (d) => (d < 10 ? "" + d : "" + "ABCDEF"[d - 10]);
    return getc(a) + "" + getc(b);
  };

  const enterSel = path
    .enter()
    .append("path")
    .attr("class", styles.pie)
    .attr("fill", (d, i) => getFillColors(d)[i])
    .attr("d", arc)
    .attr("stroke", "none")
    .attr("stroke-width", "2px");
}

// ref_prop is used by ResponsiveComponent
const Smile = React.forwardRef((props, ref_prop) => {
  const ref = useRef(null);

  useEffect(() => {
    renderGraph(ref.current, props);
  }, [props]);

  const { className } = props;

  return (
    <div ref={ref_prop} className={classnames(className, styles.main)}>
      <svg ref={ref} />
    </div>
  );
});

Smile.defaultProps = {
  className: undefined,
  data: [],
  width: undefined,
  height: undefined,
  sentiment: "happy",
  onClick: (d) => null,
  keySelector: (data, idx) => idx,
};

Smile.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  keySelector: PropTypes.func,
  valueSelector: PropTypes.func.isRequired,
  sentiment: PropTypes.oneOf(["sad", "happy"]),
  onClick: PropTypes.func,
};

export default Smile;
