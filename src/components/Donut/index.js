import React, { useRef, useState, useEffect } from "react";
import Donut from './Donut';

function ResponsiveDonut(props) {
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
        <Donut
            ref={ref}
            width={width}
            height={height}
            {...props}
        />
    )
}

export default Donut;
export { ResponsiveDonut };