import React from "react";

export { XAxis, YAxis };

function XAxis (props) {
    const {className,chartType,xScale,height,width,axisLable} = props;
    
    if (chartType === "line") {
        const ticks = xScale.ticks();
        return <g >
        <line x1={0} y1={height} x2={xScale(ticks[13])} y2={height} stroke={'black'} />
        <text style = {{fontSize:'14px'}} transform={`translate(${width-180},${height-10})`}>{axisLable}</text>
        {ticks.map(tickValue =>{
            return <g key = {tickValue} transform={`translate(${xScale(tickValue)},${height})`}>
                    <line y2 = {5} stroke = {"black"}/>
                    <text style = {{ textAnchor:'middle',fontSize:'10px' }} y = {20}>
                    {tickValue}   
                    </text>
            </g>})}
        </g>
    }

    if (chartType === "bar") {
        const ticks = xScale.domain();
        return <g className={className} >
        <line x1={width/2} y1={height} x2={xScale()} y2={height} stroke={'black'} />
        <text   style = {{fontSize:'20px'}} transform={`translate(${width-10},${height-30})`}>{axisLable}</text>
        {ticks.map(tickValue =>{
            return <g key = {tickValue} transform={`translate(${xScale(tickValue)},${height})`}>
                    <text style = {{ textAnchor:'start',fontSize:'12px' }}  transform={`translate(${0},${width/(31*2)}), rotate(63) `}>
                    {tickValue}   
                    </text>
            </g>})}
        </g>
    }
}

function YAxis(props) {
    const {yScale,height,axisLable} = props;
    const yticks = yScale.ticks();
    return <g >
         <line y2={height} stroke={'black'}  />
         {yticks.map(tickValue =>{
            return <g key = {tickValue} transform={`translate(${-5},${yScale(tickValue)})`}>
                    <line x2 = {5} stroke = {"black"}/>
                    <text style = {{textAnchor:'end',fontSize:'10px'}} y = {5}>
                    {tickValue}   
                    </text>
            </g>
        })}
        <text style = {{fontSize:'20px'}} transform={`translate(${25},${0}) `}>{axisLable}</text>
    </g>
    
}