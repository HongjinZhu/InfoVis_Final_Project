import React from "react";

export function Cell(props){
    const { xScale, yScale, color, cause, year, mouseOver, mouseOut} = props;
    return <g transform={`translate(${xScale(year)}, ${yScale(cause)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} />
    </g>
}