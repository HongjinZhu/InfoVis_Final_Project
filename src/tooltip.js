import React from "react";

export function Tooltip(props) {
    const {d,p, left, top} = props;
    if (left === null) {
        return <div></div>;
    } else {
        const divStyle = {
            position: "absolute",
            textAlign: "left",
            width: "150px",
            height: "120px",
            padding: "2px",
            font: "12px Nunito",
            background: "lightgreen",
            border: "0px",
            borderRadius: "8px",
            pointerEvents: "none",
            left: `${left+10}px`,
            top: `${top}px`
        };
        return <div style={divStyle} >
            <p>{d}</p>
            <p>{d.country}</p>
            <p>Proportion of Deaths:{p(d.year,d.cause,d.deaths)}</p>
            <ul> 
            <li>caused by {d.cause}</li>
            <li>in {d.country}</li>
            </ul>
            </div>
    };  
}