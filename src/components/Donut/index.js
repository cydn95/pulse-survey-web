import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from "prop-types";

import * as d3 from "d3";

import styles from './styles.scss';

function renderGraph(node, props) {
  const { data, onClick, keySelector, label, value } = props;

  const svg = d3.select(node);

  let root = svg.select('g.main')
  if (root.empty()) {
    svg.append('g').attr('class', 'main')
    root = svg.select('g.main');
  }

  const bounds = node.parentNode.getBoundingClientRect(); 
  root.attr('transform', `translate(${bounds.width / 2}, ${bounds.height / 2})`);

  let info = root.select('g.info');
  if (info.empty()) {
    // TODO: make responsive to changes
    info = root
      .append('g')
      .attr('class', 'info')
      .attr('alignment-baseline', 'central')
      .attr("text-anchor", "middle")

    info.append('text')
      .append('tspan')
      .attr('class', 'label')
      .attr("dy", "-.5em")
      .attr("font-size", "15px")
      .text(label);
    info.append('text')
      .attr('class', 'value')
      .attr("dy", "1em")
      .attr("font-size", "18px")
      .text(value)
  }

  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

  const padding = 20;
  const hoverRadiusIncrease = 20;
  const radius = Math.min(bounds.height, bounds.width) / 2 - 2 * (padding + hoverRadiusIncrease);
  const hoverRadius = radius + hoverRadiusIncrease;

  const arc = d3.arc()
    .innerRadius(radius / 1.5)
    .outerRadius(radius)
    .padAngle(0.05)
    .cornerRadius(4)

  const arcOver = d3.arc()
    .innerRadius(radius / 1.5)
    .outerRadius(radius + hoverRadius)
    .padAngle(0.05)
    .cornerRadius(4)

  const path = root.selectAll("path")
    .data(pie(data), (pieDatum, i) => keySelector(pieDatum.data, i));

  path.exit()
    .remove();

  const r = () => {
    const c = Math.floor(Math.random() * 256);
    const a = Math.floor(c / 16);
    const b = c % 16;
    const getc = (d) => d < 10 ? "" + d : "" + "ABCDEF"[d - 10]
    return getc(a) + "" + getc(b);
  }
  
  const enterSel = path.enter()
    .append("path")
    .attr('class', d => d.data.name + " " + styles.pie)
    .attr("fill", (d, i) => `#${r()}${r()}${r()}`)
    .attr("d", arc)
    .attr("stroke", "none")
    .attr("stroke-width", "2px");

  let mouseOver = null;
  const tween = function (d) {
    const mouse_over_me = mouseOver && mouseOver.name === d.data.name;
    this.current = this.current
      || { startAngle: 2 * Math.PI, endAngle: 2 * Math.PI, outerRadius: radius };

    const destination = { 
      startAngle: d.startAngle, 
      endAngle: d.endAngle, 
      outerRadius: mouse_over_me ? hoverRadius : radius, 
    };

    const intpl = d3.interpolate(this.current, destination);
    this.current = intpl(0);
    return function (t) {
      const sarc = d3.arc()
        .innerRadius(radius / 1.5)
        .outerRadius(intpl(t).outerRadius)
        .padAngle(0.05)
        .cornerRadius(4)
      const pth = sarc(intpl(t));
      return pth;
    };
  }
  path.merge(enterSel)
    .on("click", function (d) {
      onClick(d.data)
    })
    .on("mouseover", function(d) {
      mouseOver = d.data;
      d3.select(this)
        .transition()
        .duration(500)
        .attrTween("d", tween);
    })
    .on("mouseout", function(d) {
      mouseOver = null;
      d3.select(this)
        .transition()
        .duration(500)
        .attrTween("d", tween);
    })
    .interrupt()
    .transition()
    .attrTween('d', tween);

}

function Donut(props) {
  const ref = useRef(null);

  useEffect(() => {
    renderGraph(ref.current, props);
  }, [props]);

  return (
    <React.Fragment>
      <svg 
      className={styles.main}
      ref={ref}
      >
      </svg>
    </React.Fragment>
  );
}

Donut.defaultProps = {
  label: "",
  data: [],
  value: "",
  onClick: d => null,
  keySelector: (data, idx) => idx,
};

Donut.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  keySelector: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Donut;

