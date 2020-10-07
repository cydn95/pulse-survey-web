import React, { useRef, useState, useEffect } from "react";
import Smile from "./Smile";

function ResponsiveSmile(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const node = ref.current;
      setTimeout(() => {
        setWidth(node.offsetWidth);
        setHeight(node.offsetHeight);
      }, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Smile ref={ref} width={width} height={height} {...props} />;
}

export default Smile;
export { ResponsiveSmile };
