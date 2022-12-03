import React from "react";

export function Cell(props){
    const { xScale, yScale, color, cause, year} = props;
    return <g transform={`translate(${xScale(cause)}, ${yScale(year)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} />
    </g>
}