import React from "react";

export function Cell(props){
    const { xScale, yScale, cause, year, p, color,mouseover,mouseout,data} = props;
    
    
    return <g transform={`translate(${xScale(year)}, ${yScale(cause)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} 
        onMouseOver={(e)=> mouseover(e,data)} onMouseOut={mouseout} />
    </g>
}