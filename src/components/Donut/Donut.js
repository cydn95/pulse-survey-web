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
    valueSelector,
    sentiment,
  } = props;

  const bounds = node.parentNode.getBoundingClientRect();

  const svg = d3.select(node);

  svg.attr('width', bounds.width)
    .attr('height', bounds.height)

  const padding = bounds.width < 400 ? 5 : 20;
  const hoverRadiusIncrease = bounds.width < 400 ? 5 : 20;
  const radius = Math.min(bounds.height, bounds.width) / 2 - 2 * (padding + hoverRadiusIncrease);
  const hoverRadius = radius + hoverRadiusIncrease;
  const innerRadius = radius * 0.5;

  let root = svg.select('g.main')
  if (root.empty()) {
    svg.append('g').attr('class', 'main')
    root = svg.select('g.main');
  }

  root.attr('transform', `translate(${bounds.width / 2}, ${bounds.height / 2})`);

  const eyeDist = innerRadius / 1.75;
  const thick = innerRadius * 0.15;
  let face = root.select('g.' + styles.face);
  if (face.empty()) {
    // TODO: make responsive to changes
    face = root
      .append('g')
      .attr('class', styles.face)

    face.append('circle')
    face.append('circle')
    face.append("path")

  }

  face.select('.right_eye')
    .attr("cx", eyeDist)

  face.selectAll('circle')
    .attr("r", thick)
    .attr("cx", (d, i) => i === 0 ? -eyeDist : eyeDist)
    .attr("class", classnames(styles.eye, styles[sentiment]))

  const mouth = face.select('path')
    .attr("class", styles[sentiment])
    .attr("transform", `translate(0, ${eyeDist * 1.2})`)
    .style("stroke-width", thick)
    .attr("d", () => {
      if (sentiment === 'sad') {
        return `M ${-eyeDist * 0.6} 0 H ${eyeDist * 0.6}`
      }
      return `M ${-eyeDist * 0.6} 0 Q 0 ${innerRadius * 0.2} ${eyeDist * 0.6} 0`
    })

  // centerize the face
  face.attr('transform', `translate(0, ${thick - face.node().getBBox().height / 2})`)

  const pie = d3.pie()
    .value(d => valueSelector(d))
    .sort(null)

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .padAngle(0.05)
    .cornerRadius(4)

  const arcOver = d3.arc()
    .innerRadius(radius / 1.5)
    .outerRadius(radius + hoverRadius)
    .padAngle(0.05)
    .cornerRadius(4)

  const path = root.selectAll("." + styles.pie)
    .data(pie(data), (pieDatum, i) => {
      return keySelector(pieDatum.data, i)
    });

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
    .attr('class', styles.pie)
    .attr("fill", (d, i) => `#${r()}${r()}${r()}`)
    .attr("d", arc)
    .attr("stroke", "none")
    .attr("stroke-width", "2px");

  let mouseOver = null;
  const tween = function (d) {
    const mouse_over_me = mouseOver && keySelector(mouseOver) === keySelector(d.data);
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
    .on("mouseover", function (d) {
      mouseOver = d.data;
      d3.select(this)
        .transition()
        .duration(500)
        .attrTween("d", tween);
    })
    .on("mouseout", function (d) {
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

// ref_prop is used by ResponsiveComponent
const Donut = React.forwardRef((props, ref_prop) => {
  const ref = useRef(null);

  useEffect(() => {
    renderGraph(ref.current, props);
  }, [props]);

  const { className } = props;

  return (
    <div
      ref={ref_prop}
      className={classnames(className, styles.main)}
    >
      <svg ref={ref} />
    </div >
  );
})

Donut.defaultProps = {
  className: undefined,
  data: [],
  width: undefined,
  height: undefined,
  sentiment: "happy",
  onClick: d => null,
  keySelector: (data, idx) => idx,
};

Donut.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  keySelector: PropTypes.func,
  valueSelector: PropTypes.func.isRequired,
  sentiment: PropTypes.oneOf(["sad", "happy"]),
  onClick: PropTypes.func,
};

export default Donut;
