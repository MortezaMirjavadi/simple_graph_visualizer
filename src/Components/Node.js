import React from "react";

export default ({
                    cx,
                    cy,
                    r,
                    id,
                }) => (
    <circle
        className="node"
        id={id}
        cx={cx}
        cy={cy}
        r={r}
    />
)
