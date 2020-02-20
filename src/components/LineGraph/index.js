import React, { useRef, useState, useEffect } from "react";
import LineGraph from './LineGraph';

function ResponsiveLineGraph(props) {

  const ref = useRef(null)
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)

  useEffect(() => {
    const handleResize = () => {
      const node = ref.current.parentNode;
      setWidth(node.offsetWidth)
      setHeight(node.offsetHeight)
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