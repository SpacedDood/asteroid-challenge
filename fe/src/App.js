import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>
        <p>Data Pull:</p>
        <div>
          <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" onChange={pullData}/>
        </div>
      </div>
    </div>
  );
}

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
