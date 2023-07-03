import {React, useState} from "react";

//Heres a functional component
const AstroPanel = (props) => {

  return (
    <div className="dateArea">
      <p>Select Date Range:</p>

      <div className="dateFields">
        <div>
          <label htmlFor="start">Start Date: </label>
          <input type="date" id="start" name="trip-start" value={props.startDate} onChange={props.changeStartDate}/>
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input type="date" id="end" name="trip-end" value={props.endDate} onChange={props.changeEndDate}/>
        </div>
      </div>

      {
        props.dateValid != true &&
        <div className="errorMsg"><i>{props.dateValid}</i></div>
      }

      <div className={"dateButton "+(props.dateValid != true && "invalid")}>Request Data</div>

    </div>
  )
}


// Just a placeholder for testing dynamically pulling data.
function pullData(event) {
  console.log(event.target.value)

  var jsonData = {
    name: "awesome",
    date: event.target.value
  }

  fetch('http://localhost:3000/asteroids/fetchData', {  // Enter your IP address here
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  })
  .then((result) => {
    console.log(result)
  })

  console.log(JSON.stringify(jsonData))
}


export default AstroPanel;
