import React from "react";

export default ({text, nodeID, x, y}) => (
    <text className="labels" data-test={nodeID} x={x} y={y} textAnchor="middle">
        {text}
    </text>
)