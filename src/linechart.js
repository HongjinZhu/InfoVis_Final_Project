import React from "react";
import * as d3 from "d3";

export function MultipleLineChart(props){
    const {x, y, WIDTH, HEIGHT, data, allYears, mouseOver, mouseOut, selectedCause} = props;

    const margin = {top: 50, right: 50, bottom: 100, left: 50};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;

    const getColor = (category) => {
        var color;
        // console.log(category == selectedCause)
        if (selectedCause!=null) {
            if (selectedCause.includes(category[0])) {
                color = "#e75480"
            }
           else{
            if (diseases.includes(category[0])) {
                color = '#4D004B'
            }
            if (humanFactors.includes(category[0])) {
                color = '#8D88BF'
            }
            if (natureFactors.includes(category[0])) {
                color = '#8C61AC'
            }
           }
        }else{
            if (diseases.includes(category[0])) {
                color = '#4D004B'
            }
            if (humanFactors.includes(category[0])) {
                color = '#8D88BF'
            }
            if (natureFactors.includes(category[0])) {
                color = '#8C61AC'
            }
        }
        return color
    }

    const diseases = ['Meningitis',"Alzheimer's Disease and Other Dementias","Parkinson's Disease",
    "Nutritional Deficiencies","Malaria","HIV/AIDS","Tuberculosis","Cardiovascular Diseases",
    "Lower Respiratory Infections","Diarrheal Diseases","Neoplasms","Diabetes Mellitus","Chronic Kidney Disease",
    "Protein-Energy Malnutrition","Chronic Respiratory Diseases","Cirrhosis and Other Chronic Liver Diseases",
    "Digestive Diseases","Acute Hepatitis","Maternal Disorders","Drug Use Disorders","Neonatal Disorders","Alcohol Use Disorders"];
   
    const humanFactors=["Interpersonal Violence","Self-harm","Conflict and Terrorism","Poisonings","Road Injuries"];
    const natureFactors =["Drowning","Exposure to Forces of Nature","Environmental Heat and Cold Exposure",
    "Fire, Heat, and Hot Substances"]
    
    
    // diseases
    let di = {}
    for (let i = 1990; i < 2020; i++) {
        di[i] = d3.sum(data.filter(d=> diseases.includes(d.cause)&& d.year==i).map(d => d.deaths))
    }
    // console.log(d3.max(Object.values(di)))

    const xScale = d3.scaleBand().range([0, width]).domain(allYears);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(Object.values(di))]).nice();
    const line = d3.line().x(d => d[0]).y(d => d[1]);
    const xTicks = xScale.domain();
    const yTicks = yScale.ticks();

    var points1 = [];
    for (let idx = 0; idx < 30; idx++) {
        points1.push([xScale(parseInt(Object.keys(di)[idx])),yScale(Object.values(di)[idx])])
    }


    // human factors
    let hf = {}
    for (let i = 1990; i < 2020; i++) {
        hf[i] = d3.sum(data.filter(d=> humanFactors.includes(d.cause)&& d.year==i).map(d => d.deaths))
    }
    var points2 = [];
    for (let idx = 0; idx < 30; idx++) {
        points2.push([xScale(parseInt(Object.keys(hf)[idx])),yScale(Object.values(hf)[idx])])
    }

    // natural factors
    let nf = {}
    for (let i = 1990; i < 2020; i++) {
        nf[i] = d3.sum(data.filter(d=> natureFactors.includes(d.cause)&& d.year==i).map(d => d.deaths))
    }
    var points3 = [];
    for (let idx = 0; idx < 30; idx++) {
        points3.push([xScale(parseInt(Object.keys(nf)[idx])),yScale(Object.values(nf)[idx])])
    }

    return <g transform={`translate(${x},${y})`}>
        <line y2={height} stroke={`black`} transform={`translate(10,50)`} />
        {yTicks.map( tickValue => {
            return <g key={tickValue} transform={`translate(0, ${yScale(tickValue)+50})`}>
                    <line x2={width} stroke={"gray"} />
                    <text style={{ textAnchor:'end', fontSize:'12px' }} >
                    {tickValue}
                    </text>
                </g> 
        })}
        <text style={{ textAnchor:'start', fontSize:'20px'}} transform={`translate(30,50)rotate(0)`}>
                {"# Deaths"}
            </text>
        <line x1={0} y1={height} x2={width} y2={height} stroke={`black`} transform={`translate(10,50)`} />
        {xTicks.map( tickValue => {
            return <g key={tickValue} transform={`translate(${xScale(tickValue)+10}, ${height+50})`}>
                    <line y2={5} stroke={"black"} />
                    <text style={{ textAnchor:'start', fontSize:'12px'}} transform={`translate(${10},${width/(30*2)}), rotate(63) `} y={20}>
                    {tickValue}
                    </text>
            </g> 
        })}
        <text style={{ textAnchor:'end', fontSize:'20px'}} transform={`translate(${width+50}, ${height+60})`}>
                        {"Year"}
            </text>
        
        <path className="lines" d={line(points1)} stroke={getColor(diseases)} strokeWidth={5} fill={"none"} transform={`translate(10,50)`} onMouseOver = {()=>mouseOver(diseases)} onMouseOut = {mouseOut}/>
        <path className="lines"d={line(points2)} stroke={getColor(humanFactors)} strokeWidth={5} fill={"none"} transform={`translate(10,50)`} onMouseOver = {()=>mouseOver(humanFactors)} onMouseOut = {mouseOut}/>
        <path className="lines"d={line(points3)} stroke={getColor(natureFactors)} strokeWidth={5} fill={"none"} transform={`translate(10,50)`} onMouseOver = {()=>mouseOver(natureFactors)} onMouseOut = {mouseOut}/>

        <text style={{ textAnchor:'end', fontSize:'18px'}} stroke={"#4D004B"} transform={`translate(${xScale(parseInt(Object.keys(di)[29]))}, ${yScale(Object.values(di)[29])+50})`}>
                        {"Diseases"}
            </text>
        <text style={{ textAnchor:'end', fontSize:'18px'}} stroke={"#8D88BF"} transform={`translate(${xScale(parseInt(Object.keys(hf)[29]))}, ${yScale(Object.values(hf)[29])+50})`}>
                        {"Human Factors"}
            </text>
        <text style={{ textAnchor:'end', fontSize:'18px'}} stroke={"#8C61AC"} transform={`translate(${xScale(parseInt(Object.keys(nf)[29]))}, ${yScale(Object.values(nf)[29])+50})`}>
                        {"Natural Factors"}
        </text>

        </g>

}