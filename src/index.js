import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { HeatMap } from "./heatmap";
import "./styles.css";


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
    const [selectedCountry, setselectedCountry] = React.useState('China');
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
    var filteredCauses = []
    for (let i = 0; i < cause.length; i++) {
      if (filteredCauses.includes(cause[i])===false) {
        filteredCauses.push(cause[i])
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
    // console.log(filteredCountry);
    // console.log(filteredCauses);
    // console.log(filteredYears);
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
        setselectedCountry(e.currentTarget.textContent);
    }
    return <div className = "allContents">
            
              <div className = "country">D<i>e</i>aths Proportion in {selectedCountry}</div>
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
        <HeatMap WIDTH={WIDTH} HEIGHT={HEIGHT} data={data} 
        allCauses = {filteredCauses} allCountries = {filteredCountry}
        allYears = {filteredYears} selectedCountry={selectedCountry} />
     </div>
}
ReactDOM.render(<General/ >, document.getElementById("root"));