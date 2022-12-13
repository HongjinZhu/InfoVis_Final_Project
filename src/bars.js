import React from "react";

export function Bars(props){
    //complete the getColor when you are asked to
    const{data,xScale,yScale,height,width,selectedStation,mouseOver,mouseOut} = props;
    // const [selectedStation,setSelectedStation] = React.useState(null);
    // const mouseOver = d =>{
    //     setSelectedStation(d.station);
    // }
    // const mouseOut = () =>{
    //     setSelectedStation(null);
    // }
    const getColor = (selectedStation, station) => {
        let color = "steelblue";
        if (selectedStation === station) {
            color ='red'
        }
        return color
    }
    // const getClassName = (station)=> {
    //     var curId = station.replace(/\s/g,'');
    //                   curId = curId.replace('&','')
    //                   if (isNaN(curId[0])===false){
    //                       curId = 's' + curId
    //                   }
    //     return curId; 
    // }
    return <g >
        {data.map(d=>{
            return <rect key = {d.station} x={xScale(d.station)} y={yScale(d.start)} 
            width = {(width)/51}
            height = {height - yScale(d.start)} 
            fill={getColor(selectedStation,d.station)} stroke = {"black"}
            onMouseOver = {(e)=>mouseOver(e,d)} onMouseOut = {mouseOut}    
            />
        })}
    </g>
}