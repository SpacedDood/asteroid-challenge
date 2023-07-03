import logo from './logo.svg';
import './App.css';
import {Component, useState} from "react";

import AstroHeader from "./components/AstroHeader";
import AstroList from "./components/AstroList";
import AstroPanel from "./components/AstroPanel";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: "2020-05-05",
      endDate: "2020-05-06",
      dateValid: true
    };
  }

  /* this is just here to show I can bind tings */
  componentWillMount() {
    changeStartDate = changeStartDate.bind(this)
    changeEndDate = changeEndDate.bind(this)
  }

  render() {
    return (
      <div className="App">

        <AstroHeader />

        <div className="displayArea">

          <div className="spaceArea"></div>

          <AstroPanel
            dateValid={this.state.dateValid}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            changeStartDate={changeStartDate}
            changeEndDate={changeEndDate}
          />

          <div className="asteroidArea">

            <AstroList />

          </div>

        </div>
      </div>
    );
  }
}

function changeStartDate(event) {
  console.log(event.target.value)
  var dateValid = dateValidation(event.target.value, this.state.endDate)
  this.setState({startDate: event.target.value, dateValid : dateValid})
}

function changeEndDate(event) {
  console.log(event.target.value)
  var dateValid = dateValidation(this.state.startDate, event.target.value)
  this.setState({endDate: event.target.value, dateValid : dateValid})
}

function dateValidation(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);

  if (start > end) {
    return "Please select a start date before the end date.";
  }

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays)

  if (diffDays > 7) {
    console.log("Invalid Dates")
    return "Please select a range within 7 days.";
  }

  return true;
}


export default App;
