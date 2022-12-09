import React from "react";
import { sum } from "d3";

export function Tooltip(props) {
    const {d,data, left, top} = props;

    function getProportion(year,cause,deaths){
        let curData = data.filter(data => data['year'] == year);
        let curSum = sum(curData,d=>d.deaths);
        // yearlySum.push(curSum);
        return deaths/curSum
    }
    if (left === null) {
        return <div ></div>;
    } else {
        const divStyle = {
            left: `${left+10}px`,
            top: `${top}px`
        };
        return <div style={divStyle} className = "tooltip" >
            {/* <p>{d}</p>  */}
            <p>{d.cause}:{d.deaths}</p>
            <p>{getProportion(d.year,d.cause,d.deaths)*100}% of all deaths </p>
            <p>in year {d.year}</p>
            {/* <ul> 
            <li>caused by {d.cause}</li>
            <li>in {d.country}</li>
            </ul> */}
        </div>
    };  
}