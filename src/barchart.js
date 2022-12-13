import React from "react";
import { max } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars } from './bars';

export function BarChart (props) {
    const {data,height,width,offsetX,offsetY,allYears} = props;
    const yBarScale =Scales.linear(0, maxBar, height, 0);
    return <g transform={`translate(${offsetX},${offsetY})`}>
        <Bars  data = {data} xScale = {xBarScale} yScale = {yBarScale}
        height = {height} width = {width} selectedStation = {selectedStation} 
        mouseOver = {mouseOver} mouseOut ={mouseOut}/>
        <YAxis yScale = {yBarScale} height = {height} axisLable={"Causes "}/>
        <XAxis chartType= {"bar"} xScale = {xBarScale} width = {width} height = {height} 
            axisLable={""} />
    </g>
}