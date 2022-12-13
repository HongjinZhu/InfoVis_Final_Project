import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean,descending,ascending } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { HeatMap } from "./heatmap";
import { Tooltip } from "./tooltip";
import "./styles.css";
import { BarChart } from "./barchart";


const csvUrl = 'https://raw.githubusercontent.com/HongjinZhu/InfoVis_Final_Project/main/new_cod.csv';

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.year = +d.year;
                d.deaths = +d.deaths;
            });
            setData(data);
        });
    }, []);
    return dataAll;

 
}
function General() {
    const [selectedCountry, setSelectedCountry] = React.useState('China');
    const [year, setYear] = React.useState('19');
    const [selectedCell,setSelectedCell] = React.useState(null);
    const [selectedOrder,setSelectedOrder] = React.useState(null);
    const [left,setLeft] = React.useState(null);
    const [top,setTop] = React.useState(null);
    // const [barData,setBarData] = React.useState(null);

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    
    const dataAll = useData(csvUrl);
    if(!dataAll){
        return <pre>Loading...</pre>
    }
    const data = dataAll.filter( d => { 
      return d.country=== selectedCountry 
    });
    
    // get cause lists
    var cause= data.map(d=>d.cause);
    var filteredCauses = [];
    var barCauses = [];
    for (let i = 0; i < cause.length; i++) {
      if (filteredCauses.includes(cause[i])===false) {
        filteredCauses.push(cause[i])
        barCauses.push(cause[i])
      }
    }
    var country = dataAll.map(d=>d.country);
    var filteredCountry = []
    for (let i = 0; i < country.length; i++) {
      if (filteredCountry.includes(country[i])===false) {
        filteredCountry.push(country[i])
      }
    }

    let years = data.map(d=>d.year);
    let filteredYears = []
    for (let i = 0; i < years.length; i++) {
        if (filteredYears.includes(years[i])===false) {
          filteredYears.push(years[i])
        }
    }
   
    const changeHandler = (event) => {
      setYear(event.target.value);
      // setBarData(data.filter( d => { 
      //   return d.year === filteredYears[year] 
      // }))
    }
    // console.log(barData);
    const barData = data.filter( d => { 
      return d.year === filteredYears[year] 
    });
    const changeOrder = (event) => {
      setSelectedOrder(event.target.value);
    }
    if (selectedOrder =="decrease") {
      barData.sort((a, b) => ascending(a.deaths, b.deaths));
      cause= barData.map(d=>d.cause)
      barCauses  = []
      for (let i = 0; i < cause.length; i++) {
        if (barCauses .includes(cause[i])===false) {
          barCauses.push(cause[i])
        }
      }
      console.log(barCauses);
    }else if(selectedOrder =="increase"){
      barData.sort((a, b) => descending(a.deaths, b.deaths));
      cause= barData.map(d=>d.cause)
      barCauses = []
      for (let i = 0; i < cause.length; i++) {
        if (barCauses.includes(cause[i])===false) {
          barCauses.push(cause[i])
        }
      }
    }
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    function filterFunction() {
        var input, filter, ul, li, a, i,div,txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("li");
        for (i = 0; i < a.length; i++) {
          txtValue = a[i].textContent || a[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
          } else {
            a[i].style.display = "none";
          }
        }
    }
   const onclick = (e)=> {
        // console.log(e.currentTarget.textContent);
        setSelectedCountry(e.currentTarget.textContent);
    }
    const mouseoverCell = (e,data) =>{
      setSelectedCell(data);
      setLeft(e.pageX);
      setTop(e.pageY);
      
  }
  const mouseoutCell = () =>{
      setSelectedCell(null);
      setLeft(null);
      setTop(null);
  }
 
    return <div className = "allContents">
            <div className = "country">D<i>e</i>aths <div id="one"> &nbsp;Proportion</div> <div id="two"> &nbsp;in</div> <span> &nbsp;{selectedCountry}</span></div>
            <div className="dropdown">
            <button onClick={myFunction} className="dropbtn">Click to Search for Country</button>
            <div id="myDropdown" className="dropdown-content">
                <input type="text" placeholder={selectedCountry} id="myInput" onKeyUp={filterFunction}/>
                <ul className="ulDropdown">
                {filteredCountry.map(s => {
                    // console.log(s)
                    {/* `searching ${s}` */}
                    return <li key={s} id = {s} onClick = {onclick}>{s}</li>
                })}
                </ul>
            </div>
          </div>
          <svg width={WIDTH} height={HEIGHT}>
          <HeatMap WIDTH={WIDTH} HEIGHT={HEIGHT} data={data} 
          allCauses = {filteredCauses} allCountries = {filteredCountry}
          allYears = {filteredYears} selectedCountry={selectedCountry} 
          mouseoverCell = {mouseoverCell} mouseoutCell = {mouseoutCell}
          />
          </svg>
          <button><a href="#detail">Click Me to See Details</a></button>
          <div id = 'detail'> 
          <div>
            <input key="slider" type='range' min='0' max='29' value={year} step='1' onChange={changeHandler}/>
            <input key="yearText" type="text" value={filteredYears[year]} readOnly/>
          </div>
          <label >Choose an order: </label>
          <select id="orders" onChange={changeOrder}>
          <option value = "null">Choose </option>
          <option value="increase">Increasing Order</option>
          <option value="decrease">Decreasing Order</option>
          </select>
          <svg width={WIDTH} height={HEIGHT}>
         
          <BarChart className="bars" data={barData} HEIGHT={HEIGHT-200} WIDTH={WIDTH/2} allCauses={barCauses}  
          selectedOrder={selectedOrder}></BarChart>
          </svg>
          </div>
          <Tooltip d={selectedCell} data = {data} left={left} top={top}/>
      </div>
}
ReactDOM.render(<General/ >, document.getElementById("root"));