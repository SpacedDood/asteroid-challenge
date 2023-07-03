import React, { Component } from 'react';
import AstroElement from "./AstroElement.js";

//There was never mentioned if you wanted Class Components or functional. So heres a class.
class AstroList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      astroList: [],
      favor: []
    };
  }

  //Just to fill content for time being
  //// TODO: REPLACE WITH STATE CONTENT
  componentDidMount() {
    var astroElements;
    this.loadFavorAstro();
    fetch('http://localhost:3000/nasa/nextweek')
      .then(response => response.json())
      /*.then(data => this.setState({ data }))*/
      .then(data => {
        var astroElements = []
        Object.entries(data.nearEarthObjects).forEach((datesList, i) => {
          datesList[1].forEach((item2, i) => {

            this.state.favor.forEach((favoredAstro, i) => {
              if (favoredAstro.id == item2.id) {
                console.log("FAVORITE FOUND!");
                item2.favorite = true;
              }
            });


            item2.key = i;
            astroElements.push(item2)
          });
        });
        this.setState({ astroList : astroElements });
      })
  }

  loadFavorAstro = () => {
    var data = localStorage.getItem("favorites");
    //console.log(data);
    if (data != null) {
      var astroData = JSON.parse(data);
      this.setState({ favor: astroData })
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

  sortList = (parameterName) => {
    console.log("sorting")
    var newList = this.state.astroList;
    newList = this.sortArrayOfObjects(newList, parameterName);
    this.setState({ astroList: newList })
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

  render() {
    return (
      <div className="astroList">

      <div className="astroElement Header">
        <div className="star ">FAVOR</div>
        <div className="astroName" onClick={() => this.sortList("name")}>
          <div className="astroName">
            NAME
          </div>
          <div className="astroId">
            [ID]
          </div>
        </div>
        <div className="astroHazard" onClick={() => this.sortList("is_potentially_hazardous_asteroid")}>SAFE</div>
        <div className="astroDiameter">DIAMETER</div>
        <div className="astroOrbit">ORBITTING</div>
        <div className="astroSentry">SENTRY</div>
      </div>

        {
          this.state.astroList.map(astro => <AstroElement key={astro.id} astroData={astro} favourFunc={this.favorAstro}/>)
        }

      </div>
    )
  }
}



export default AstroList;
