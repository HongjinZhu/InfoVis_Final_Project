import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { HeatMap } from "./heatmap";


const csvUrl = 'https://raw.githubusercontent.com/HongjinZhu/InfoVis_Final_Project/main/cause_of_deaths.csv';

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
 
    React.useEffect(() => {
        csv(csvPath).then(data => {
            for (let i = 0; i < data.length; i++) {
                for (const item in data[i]) {
                    if (isNaN(data[i][item])===false) {
                      data[i][item] = parseFloat(data[i][item])
                    }
                  }
            }
            setData(data);
        });
    }, []);
    return dataAll;
}
function General() {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const data = useData(csvUrl);
    if(!data){
        return <pre>Loading...</pre>
    }
    // console.log(data);
    const allCauses = data.columns.slice(3);
    return <div className = "Canvas">
    <HeatMap WIDTH={WIDTH} HEIGHT={HEIGHT} data={data} allCauses = {allCauses}/>
    
    </div>
}
ReactDOM.render(<General/ >, document.getElementById("root"));