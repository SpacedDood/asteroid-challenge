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

      <div className={"dateButton "+(props.dateValid != true && "invalid")} onClick={props.getDataRange}>Request Data</div>

    </div>
  )
}

export default AstroPanel;
