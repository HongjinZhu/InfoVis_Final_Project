import React from "react";

export function Cell(props){
    const { xScale, yScale, color, cause, year, p, mouseOver, mouseOut} = props;
    return <g transform={`translate(${xScale(year)}, ${yScale(cause)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} 
        mouseOver={(e)=>{console.log(e); mouseOver(e, p)}} mouseOut={mouseOut} />
    </g>
}