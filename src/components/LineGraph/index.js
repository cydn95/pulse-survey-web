import React, { useRef, useState, useEffect } from "react";
import LineGraph from './LineGraph';

function ResponsiveLineGraph(props) {

  const ref = useRef(null)
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const node = ref.current;
      setTimeout(() => {
        setWidth(node.offsetWidth)
        setHeight(node.offsetHeight)
      }, 250)
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <LineGraph
      ref={ref}
      {...props}
      width={width}
      height={height}
    />
  )
}

export default LineGraph;
export { ResponsiveLineGraph };