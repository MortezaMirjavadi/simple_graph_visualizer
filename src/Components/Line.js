import React from "react";


export default ({lineId, x1, x2, y1, y2}) => (
    <line
        className={"line"}
        id={lineId}
        x1={x1} x2={x2}
        y1={y1} y2={y2}/>
)