import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, sum,interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { Tooltip } from "./tooltip";

export function HeatMap(props){
    const {WIDTH,HEIGHT,data,allCauses} = props;
    const margin = {top: 70, right: 50, bottom: 50, left: 300};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    
    const [selectedCell,setSelectedCell] = React.useState(null);
    const [left,setLeft] = React.useState(null);
    const [top,setTop] = React.useState(null);
    // console.log('succeeded define state');
    
    let years = [];
    for (let i = 1990; i < 2020; i++) {
        years.push(i);
    }

    const yScale = Scales.band(allCauses, 0, height);
    const xScale = Scales.band(years, 0, width);

    var yearlySum = [];
    var proportion = [];
    // Get each year's sum
    for (let i = 0; i < years.length; i++) {
        let curData = data.filter(data => data['Year'] == years[i]);
        curData = curData.map(data=> Object.values(data).slice(3));
        // console.log(curData);
        let curSum = 0;
        for (let j = 0; j < curData.length; j++) {
            for (let h = 0; h < curData[j].length; h++) {
                curSum = curSum + curData[j][h];
            }
        }
        yearlySum.push(curSum);
    }
    
    // Get every cell's value
    for (let i = 0; i < years.length; i++) {
        for (let j = 0; j < allCauses.length; j++) {
            let curData = data.filter(data => data['Year'] == years[i]);
            var curResult = sum(curData, d=> d[allCauses[j]]);
            proportion.push(curResult/yearlySum[years[i]-1990]);
        }
    }
    // console.log(proportion);
    const mouseOver = (e,d) =>{
        setSelectedCell(d);
        setLeft(e.pageX);
        setTop(e.pageY);
    }
    const mouseOut = () =>{
        setSelectedCell(null);
        setLeft(null);
        setTop(null);
    }
    
    const proportionRange = [min(proportion), mean(proportion),max(proportion)];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.65), interpolateGnBu(0.8)];
    // const colormap = Scales.colormapLiner(startRange, colorRange);
    const colormap = Scales.colorSequential(proportionRange, interpolateGnBu);
    
    // console.log(data);
    // const colormap = Scales.colorDiverging(startRange, interpolateRdBu);
    function getColor(year,cause) {
        let filtered = data.filter(d => d["Year"] == year);
        let sumToColor = sum(filtered, d=> d[cause]);
        // console.log(sumToColor/yearlySum[year-1990]);
        // proportion.push(sumToColor/yearlySum[year-1990]);
        return colormap(sumToColor/yearlySum[year-1990])
    }
    function cell(){
        var cells = [];
        // years.map( (d,index) => {
        //     for (let i = 0; i < allCauses.length; i++) {
        //     cells.push(<Cell key={d.toString()+allCauses[i]}
        //     xScale={xScale} yScale={yScale} color={getColor(d,allCauses[i])} 
        //     cause = {allCauses[i]} year = {d} mouseOver = {(e) => mouseOver(e,proportion[index*allCauses.length+i])} 
        //     mouseOut = {mouseOut} />);
        //     }
        // })
        years.map( (d,index) => {
            for (let i = 0; i < allCauses.length; i++) {
            cells.push(<Cell key={d.toString()+allCauses[i]}
            xScale={xScale} yScale={yScale} color={getColor(d,allCauses[i])} 
            cause = {allCauses[i]} year = {d} p= {proportion[index*allCauses.length+i]} mouseOver = {mouseOver} 
            mouseOut = {mouseOut} />);
            }
        })
        return cells  // return <Cell key={d["Code"]+d["Year"].toString()} d={d} xScale={xScale} yScale={yScale} color={colormap} />
    }
    return <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
        {cell()}
        {allCauses.map(s => {
                        return <g key={s} transform={`translate(-5,${yScale(s)+12})`}>
                        <text style={{textAnchor:'end',fontSize:'12px',fontFamily:'Nunito'}}>{s}</text>
                        </g>
                    })}
        {years.map(m => {
                    return <text key={m} style={{textAnchor:'middle', fontSize:'11px', fontFamily:'Nunito'}} x={xScale(m)+15} y={-3}>{m}</text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={20} numberOfTicks={5} 
        rangeOfValues={[min(data, d => d.start), max(data, d => d.start)]} colormap={colormap}/>
        <Tooltip d = {selectedCell} left = {left} top = {top}/>
        </g>
        
    </svg>
};

// ReactDOM.render(<HeatMap/>, document.getElementById('root'));