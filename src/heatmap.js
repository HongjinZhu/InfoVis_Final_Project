import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, sum,interpolateGnBu, interpolateRdBu, interpolateRdPu, interpolateBuPu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";


export function HeatMap(props){
    const {WIDTH,HEIGHT,data,allCauses,allCountries,allYears,selectedCountry,mouseoverCell,mouseoutCell} = props;
    const margin = {top: 70, right: 50, bottom: 50, left: 300};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    
    
    // console.log('succeeded define state');
    
    
    

    const yScale = Scales.band(allCauses, 0, height);
    const xScale = Scales.band(allYears.sort(), 0, width);

    var yearlySum = [];
    var proportion = [];
    
    // Get every cell's value
    function getProportion(year,cause,deaths){
        let curData = data.filter(data => data['year'] == year);
        let curSum = sum(curData,d=>d.deaths);
        yearlySum.push(curSum);
        return deaths/curSum
    }
    // Generate proportion list
    data.map(d=>{
        proportion.push(getProportion(d.year,d.cause,d.deaths));
    })
    // console.log(proportion);
   
    
    const proportionRange = [min(proportion), mean(proportion),max(proportion)];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.65), interpolateGnBu(0.8)];
    // const colormap = Scales.colormapLiner(startRange, colorRange);
    const colormap = Scales.colorSequential(proportionRange, interpolateBuPu);
    
    // console.log(data);
    // const colormap = Scales.colorDiverging(startRange, interpolateRdBu);
    
    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        
        {
            data.map( d => {
                // console.log(d.code+d.year.toString()+d.cause)
                return <Cell key={d.code+d.year.toString()+d.cause}  xScale={xScale} yScale={yScale} 
                cause = {d.cause} year = {d.year} p= {getProportion(d.year,d.cause,d.deaths)}
                color={colormap(getProportion(d.year,d.cause,d.deaths))} mouseover = {mouseoverCell} mouseout = {mouseoutCell} data = {d} />
            } )
        }
        {allCauses.map(s => {
                        return <g key={s} transform={`translate(-5,${yScale(s)+12})`}>
                        <text style={{textAnchor:'end',fontSize:'12px',fontFamily:'Nunito'}}>{s}</text>
                        </g>
                    })}
        {allYears.map(y => {
                    return <text key={y} style={{textAnchor:'middle', fontSize:'11px', fontFamily:'Nunito'}} x={xScale(y)+15} y={-3}>{y}</text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={10} numberOfTicks={5}
        rangeOfValues={[min(data, d => getProportion(d.year,d.cause,d.deaths)),
        max(data, d => getProportion(d.year,d.cause,d.deaths))]} colormap={colormap}
        />
        {/* <Tooltip d={selectedCell} p={getProportion} left={left} top={top}/> */}
        </g>
         // <svg width={WIDTH} height={HEIGHT}>
    {/* </svg> */}
};

// ReactDOM.render(<HeatMap/>, document.getElementById('root'));