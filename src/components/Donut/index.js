import React, { useState, useRef, useEffect } from 'react';

import * as d3 from "d3";

import styles from './styles.scss';

function renderGraph(node, data, handleClick) {
  const svg = d3.select(node);

  let root = svg.select('g.main')
  if (root.empty()) {
    svg.append('g').attr('class', 'main')
    root = svg.select('g.main');
  }

  const bounds = node.parentNode.getBoundingClientRect(); 
  root.attr('transform', `translate(${bounds.width / 2}, ${bounds.height / 2})`);

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
    .data(pie(data), pieDatum => pieDatum.data.name);

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
      handleClick(d.data)
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

  const [data, setData] = useState(
    [
      { name: "Pie1", count: 15 },
      { name: "Pie2", count: 20 },
      { name: "Pie3", count: 80 }
    ]
  )

  const handleClick = (datum) => {
    setData(data.filter(d => d.name !== datum.name));
  };

  useEffect(() => {
    renderGraph(ref.current, data, handleClick);
  }, [data]);

  return (
    <React.Fragment>
      <button onClick={() => setData([...data, { name: "Pie" + data.length + 1, count: 80 }])}>Add</button>
      <svg 
      className={styles.main}
      ref={ref}
      >
      </svg>
    </React.Fragment>
  );
}

export default Donut;

