import React from "react";

export function Cell(props){
    const { xScale, yScale, cause, year, p, color} = props;
    const mouseOver = (e,d) =>{
        console.log('hihihihihihihih');
        setSelectedCell(d);
        setLeft(e.pageX);
        setTop(e.pageY);
        console.log(e.pageX, e.pageY);
    }
    const mouseOut = () =>{
        setSelectedCell(null);
        setLeft(null);
        setTop(null);
    }
    
    return <g transform={`translate(${xScale(year)}, ${yScale(cause)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} 
        onMouseOver={()=> console.log("mouse over")} onMouseOut={mouseOut} />
    </g>
}