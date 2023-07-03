import logo from './logo.svg';
import './App.css';

import AstroList from "./components/AstroList";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Astro
        </p>
      </header>

      <div className="displayArea">

        <div className="spaceArea"></div>

        <div className="dateArea">
          <p>Selected Dates:</p>

          <div className="dateFields">
            <div>
              <label htmlFor="start">Start Date:</label>
              <input type="date" id="start" name="trip-start" value="2023-07-22" onChange={pullData}/>
            </div>
            <div>
              <label htmlFor="end">End Date:</label>
              <input type="date" id="end" name="trip-end" value="2023-07-22" onChange={pullData}/>
            </div>
          </div>

          <div className="dateButton">Ping NASA!</div>

        </div>

        <div className="asteroidArea">

          <AstroList />

        </div>

      </div>
    </div>
  );
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

export default App;
