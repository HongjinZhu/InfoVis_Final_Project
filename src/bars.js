import { sum } from "d3";
import React from "react";

export function Bars(props){
    //complete the getColor when you are asked to
    const{className,data,xScale,yScale,height,width,mouseOver,mouseOut,yearlySum,selectedCause} = props;
     
    const diseases = ['Meningitis',"Alzheimer's Disease and Other Dementias","Parkinson's Disease",
    "Nutritional Deficiencies","Malaria","HIV/AIDS","Tuberculosis","Cardiovascular Diseases",
    "Lower Respiratory Infections","Diarrheal Diseases","Neoplasms","Diabetes Mellitus","Chronic Kidney Disease",
    "Protein-Energy Malnutrition","Chronic Respiratory Diseases","Cirrhosis and Other Chronic Liver Diseases",
    "Digestive Diseases","Acute Hepatitis","Maternal Disorders","Drug Use Disorders","Neonatal Disorders","Alcohol Use Disorders"];
   
    const humanFactors=["Interpersonal Violence","Self-harm","Conflict and Terrorism","Poisonings","Road Injuries"];
    const natureFactors =["Drowning","Exposure to Forces of Nature","Environmental Heat and Cold Exposure",
    "Fire, Heat, and Hot Substances"]
    const getColor = (cause) => {
        var color;
        if (cause == selectedCause) {
            color = "#e75480"
        }else{
            if (diseases.includes(cause)) {
                color = '#4D004B'
            }
            if (humanFactors.includes(cause)) {
                color = '#8D88BF'
            }
            if (natureFactors.includes(cause)) {
                color = '#8C61AC'
            }
        }
   
        return color
    }
    // console.log(data);
    return <g className={className}>
        {data.map(d=>{
            return <rect key = {d.cause} x={xScale(d.cause)} y={yScale(d.deaths/yearlySum)} 
            width = {(width)/31}
            height = {height - yScale(d.deaths/yearlySum)} 
            fill={getColor(d.cause)} stroke = {"black"}
            onMouseOver = {(e)=>mouseOver(e,d)} onMouseOut = {mouseOut}>
            </rect>
        })}
    </g>
}