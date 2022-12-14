import React from "react";
import { max,sum } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
    const {className,data,HEIGHT,WIDTH,allCauses,selectedOrder,mouseOver,mouseOut,selectedCause} = props;
    // const causes = 
    const margin = {top: 50, right: 50, bottom: 100, left: 50};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
   
    const yearlySum = sum(data.map(d=>d.deaths));
    var deathPropotions = data.map(d=>d.deaths/yearlySum);
    const barMax = max(deathPropotions);
    const xBarScale = Scales.band(allCauses, width, 0);
    const yBarScale =Scales.linear(0, barMax, height, 0);
   
    // const mouseOver = (e,d) =>{
    //     setSelectedCause(d.cause);
    // }
    // const mouseOut = () =>{
    //     setSelectedCause(null);
    // }
    
    return <g transform={`translate(${margin.left},${margin.top})`}>
       
        <Bars className={className} data = {data} xScale = {xBarScale} yScale = {yBarScale}
        height = {height} width = {width} 
        mouseOver = {mouseOver} mouseOut ={mouseOut} 
        yearlySum = {yearlySum} selectedCause={selectedCause}
        selectedOrder = {selectedOrder }
        />
        <YAxis className={className} yScale = {yBarScale} height = {height} axisLable={"Deaths Proportion "}/>
        <XAxis className={className} chartType= {"bar"} xScale = {xBarScale} width = {width} height = {height} 
            axisLable={"Causes"} />
    </g>
}