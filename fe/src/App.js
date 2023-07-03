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
      dateValid: true,
      astroListData: null,
      favor: []
    };
  }

  /* this is just here to show I can bind tings, yet I dont understand why it doesnt work in componentDidMount... so leaving here to look into future wise*/
  componentWillMount() {
    changeStartDate = changeStartDate.bind(this)
    changeEndDate = changeEndDate.bind(this)
  }


  componentDidMount() {
    var astroElements;
    this.loadFavorAstro();

    //TODO create and merge with the other fetch function below...
    fetch('http://localhost:3000/nasa/nextweek')
      .then(response => response.json())
      /*.then(data => this.setState({ data }))*/
      .then(data => {
        var astroElements = []
        Object.entries(data.nearEarthObjects).forEach((datesList, i) => {
          datesList[1].forEach((item2, i) => {

            this.state.favor.forEach((favoredAstro, i) => {
              if (item2.favorite != true && favoredAstro.id == item2.id) {
                //console.log("FAVORITE FOUND!");
                item2.favorite = true;
              } else {
                //I know... this is sloppy. But its mad rush time and it helps for the sorting
                item2.favorite = false;
              }
            });

            item2.key = i;
            astroElements.push(item2)
          });
        });
        this.setState({ astroListData : astroElements });
      })
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
            getDataRange={this.requestDataFromDateRange}
          />

          <div className="asteroidArea">

            <AstroList
              astroListData={this.state.astroListData}
              favorAstro={this.favorAstro}
              sortList={this.sortList}
            />

          </div>

        </div>
      </div>
    );
  }


    /* REQUEST DATA */

    requestDataFromDateRange = () => {

      if (this.state.dateValid != true) {
        alert("Please provide valid date");
        return;
      }

      console.log(this.state.startDate)

      const bodyData = {
        startDate : this.state.startDate,
        endDate : this.state.endDate
      }

      fetch('http://localhost:3000/asteroids/getDataRange', {
      //fetch('http://localhost:3000/nasa/testWeek', {
          headers: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify(bodyData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        var astroElements = []
        Object.entries(data.near_earth_objects).forEach((datesList, i) => {
          datesList[1].forEach((item2, i) => {

            this.state.favor.forEach((favoredAstro, i) => {
              if (item2.favorite != true && favoredAstro.id == item2.id) {
                //console.log("FAVORITE FOUND!");
                item2.favorite = true;
              } else {
                //I know... this is sloppy. But its mad rush time and it helps for the sorting
                item2.favorite = false;
              }
            });

            item2.key = i;
            astroElements.push(item2)
          });
        });
        this.setState({ astroListData : astroElements });
      })
    }

    /* FAVORITES */

    loadFavorAstro = () => {
      var data = localStorage.getItem("favorites");
      //console.log(data);
      if (data != null) {
        var astroFavorData = JSON.parse(data);
        this.setState({ favor: astroFavorData })
      }
    }

    favorAstro = (astroData) => {
      if (!astroData.favorite) {
        astroData.favorite = true;
        //console.log("favorited " + astroData)
        this.setState({ favor: [...this.state.favor, astroData] })
        //Trying to set the storage to be state will not work as state still being updated... so just feed it the same data
        localStorage.setItem("favorites", JSON.stringify([...this.state.favor, astroData]))
        //console.log(localStorage.getItem("favorites"))
      } else {
        console.log("Unfavorite!");
        astroData.favorite = false;
        var favorData = this.state.favor;
        favorData.forEach((item, i) => {
          if (item.id == astroData.id) {
            //console.log("Found match... KILL IT!")
            favorData.splice(i, 1);
            return;
          }
        });
        this.setState({ favor: favorData })
        localStorage.setItem("favorites", JSON.stringify(favorData))
      }
    }

    /* SORTING */

    sortList = (parameterName, ascending = true) => {
      console.log("sorting")
      var newList = this.state.astroListData;
      var order = ascending ? "ascending" : "descending"
      newList = this.sortArrayOfObjects(newList, parameterName, order);
      this.setState({ astroListData: newList })
    }

    sortArrayOfObjects = (arr, propertyName, order = 'ascending') => {
      const sortedArr = arr.sort((a, b) => {
        if (a[propertyName] < b[propertyName]) {
          return -1;
        }
        if (a[propertyName] > b[propertyName]) {
          return 1;
        }
        return 0;
      });

      if (order === 'descending') {
        return sortedArr.reverse();
      }

      return sortedArr;
    };

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
