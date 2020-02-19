import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from "prop-types";
import classnames from "classnames";

import * as d3 from "d3";

import styles from './styles.scss';

function renderGraph(node, props) {
  const { 
    data,
    onClick,
    keySelector,
    label,
    value,
    flipped,
  } = props;

  const svg = d3.select(node);

  let root = svg.select('g.main')
  if (root.empty()) {
    svg.append('g').attr('class', 'main')
    root = svg.select('g.main');
  }

  const bounds = node.getBoundingClientRect(); 

  const x = d3.scaleLinear()
    .rangeRound([0, bounds.width])
    .domain([0, 100])

  const padding = 0.2;
  const y = d3.scaleBand()
    .padding(padding)
    .range([0, bounds.height])
    .domain(data.map(d => d.name))

  const rectSel = root.selectAll("." + styles.bar)
    .data(data, d => d.name)

  rectSel.exit().remove();

  const groupenter = rectSel
    .enter().append("g")
    .attr("class", styles.bar)

  groupenter
    .append("rect")

  groupenter
    .append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", 20)

  root.selectAll("." + styles.bar).selectAll("text")
    .transition()
    .text(d => d.count)
    .attr("x", d => flipped ? bounds.width - x(d.count) / 2 : x(d.count) / 2)
    .attr("y", d => y(d.name) + y.bandwidth() / 2)
    .attr("dy", "0.35em")

  root.selectAll("." + styles.bar).selectAll("rect")
    .transition()
    .attr("x", function (d) {
      return flipped ? bounds.width - x(d.count) : 0
    })
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
  
  const paddingSize = y.step() - y.bandwidth();

  const lineSel = root.selectAll(".line")
    .data(data.concat(null), d => d ? d.name : "_end_marker")
  
  lineSel
    .enter().append("line")
    .attr("class", "line")
    .attr("stroke", "#e4e4e4")
    .merge(lineSel)
    .attr("x1", d => 0)
    .transition()
    .attr("y1", d => d ? y(d.name) - paddingSize / 2 : bounds.height - paddingSize / 2)
    .attr("y2", d => d ? y(d.name) - paddingSize / 2 : bounds.height - paddingSize / 2)
    .attr("x2", bounds.width)

  lineSel.exit().remove()

}

function LineGraph(props) {
  const ref = useRef(null);

  const { className } = props;

  useEffect(() => {
    renderGraph(ref.current, props);
  }, [props]);

  return (
    <svg 
    className={classnames(className, styles.main)}
    ref={ref}
    >
    </svg>
  );
}

LineGraph.defaultProps = {
  className: undefined,
  label: "",
  data: [],
  value: "",
  onClick: d => null,
  flipped: false,
  keySelector: (data, idx) => idx,
};

LineGraph.propTypes = {
  className: PropTypes.string,
  flipped: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  keySelector: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default LineGraph;

