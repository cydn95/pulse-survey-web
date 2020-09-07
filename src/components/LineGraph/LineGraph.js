import React, { useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";

import * as d3 from "d3";

import styles from "./styles.scss";

function renderGraph(node, props) {
  const {
    data,
    keySelector,
    labelSelector,
    valueSelector,
    flipped,
  } = props;

  const svg = d3.select(node);

  const tooltip = d3.select(node.parentNode).select("." + styles.tooltip);

  let root = svg.select("g.main");
  if (root.empty()) {
    svg.append("g").attr("class", "main");
    root = svg.select("g.main");
  }

  const bounds = node.parentNode.getBoundingClientRect();

  svg.attr("width", bounds.width).attr("height", bounds.height);

  const x = d3.scaleLinear().rangeRound([0, bounds.width]).domain([0, 100]);

  const padding = 0.2;
  const y = d3
    .scaleBand()
    .padding(padding)
    .range([0, bounds.height])
    .domain(data.map(keySelector));

  const rectSel = root.selectAll("." + styles.bar).data(data, keySelector);

  rectSel.exit().remove();

  const groupenter = rectSel.enter().append("g").attr("class", styles.bar);

  groupenter.append("rect");

  groupenter.append("text").attr("text-anchor", "middle").attr("font-size", 20);

  root
    .selectAll("." + styles.bar)
    .selectAll("text")
    .transition()
    .text((d) => valueSelector(d))
    .attr("x", (d) =>
      flipped ? bounds.width - x(valueSelector(d)) / 2 : x(valueSelector(d)) / 2
    )
    .attr("y", (d) => y(keySelector(d)) + y.bandwidth() / 2)
    .attr("dy", "0.35em");

  root
    .selectAll("." + styles.bar)
    .on("mouseover", function (d) {
      const coords = [d3.event.clientX, d3.event.clientY];
      tooltip.node().classList.add(styles.visible);

      tooltip.html(labelSelector(d));

      tooltip
        .style("left", 10 + coords[0] + "px")
        .style(
          "top",
          coords[1] - 10 - tooltip.node().getBoundingClientRect().height + "px"
        );
    })
    .on("mouseout", function (d) {
      tooltip.node().classList.remove(styles.visible);
      tooltip.html("");
    });

  root
    .selectAll("." + styles.bar)
    .selectAll("rect")
    .transition()
    .attr("x", function (d) {
      return flipped ? bounds.width - x(valueSelector(d)) : 0;
    })
    .attr("y", function (d) {
      return y(keySelector(d));
    })
    .attr("width", (d) => x(valueSelector(d)))
    .attr("height", y.bandwidth());

  const paddingSize = y.step() - y.bandwidth();

  const lineSel = root
    .selectAll(".line")
    .data(data.concat(null), (d) => (d ? keySelector(d) : "_end_marker"));

  lineSel
    .enter()
    .append("line")
    .attr("class", "line")
    .attr("stroke", "#e4e4e4")
    .merge(lineSel)
    .attr("x1", (d) => 0)
    .transition()
    .attr("y1", (d) =>
      d ? y(keySelector(d)) - paddingSize / 2 : bounds.height - paddingSize / 2
    )
    .attr("y2", (d) =>
      d ? y(keySelector(d)) - paddingSize / 2 : bounds.height - paddingSize / 2
    )
    .attr("x2", bounds.width);

  lineSel.exit().remove();
}

const LineGraph = React.forwardRef((props, ref_prop) => {
  const ref = useRef(null);

  const { className } = props;

  useEffect(() => {
    renderGraph(ref.current, props);
  }, [props]);

  return (
    <div ref={ref_prop} className={classnames(styles.main, className)}>
      <div className={styles.tooltip} />
      <svg ref={ref} />
    </div>
  );
});

LineGraph.defaultProps = {
  className: undefined,
  width: undefined,
  height: undefined,
  data: [],
  onClick: (d) => null,
  flipped: false,
  keySelector: (data, idx) => idx,
};

LineGraph.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  // to flip the graph horizontally
  flipped: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  keySelector: PropTypes.func,
  labelSelector: PropTypes.func.isRequired,
  valueSelector: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default LineGraph;
