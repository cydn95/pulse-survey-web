import React, { useRef, useEffect } from "react";
import { PropTypes } from "prop-types";

import classnames from "classnames";

import * as d3 from "d3";

import styles from "./styles.scss";

const fillColors = ["#29cc97", "#f12b2c", "#cccccc", "#ffc15c"];

function renderGraph(node, props) {
  const {
    data,
    subDriver,
    type,
    keySelector,
    valueSelector,
    sentiment,
  } = props;

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

    face
      .append("text")
      .text(props.subDriver)
      .attr("text-anchor", "middle")
      .attr("class", styles.title)
      .attr("dy", "25");

    // face
    //   .append("text")
    //   .text(type)
    //   .attr("text-anchor", "middle")
    //   .attr("class", styles["sub-title"])
    //   .attr("dy", "45");
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
    .attr("fill", (d, i) => `${fillColors[i]}`)
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
