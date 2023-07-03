import React, { Component } from 'react';
import AstroElement from "./AstroElement.js";

//There was never mentioned if you wanted Class Components or functional. So heres a class.
class AstroList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="astroList">

      <div className="astroElement Header">
        <div className="star " onClick={() => this.props.sortList("favorite", false)}>FAVOR</div>
        <div className="astroName" onClick={() => this.props.sortList("name")}>
          <div className="astroName">
            NAME
          </div>
          <div className="astroId">
            [ID]
          </div>
        </div>
        <div className="astroHazard" onClick={() => this.props.sortList("is_potentially_hazardous_asteroid", false)}>SAFE</div>
        <div className="astroDiameter">DIAMETER</div>
        <div className="astroOrbit">ORBITTING</div>
        <div className="astroSentry">SENTRY</div>
      </div>

        {
          this.props.astroListData != null
          ? this.props.astroListData.map(astro => <AstroElement key={astro.id} astroData={astro} favourFunc={this.props.favorAstro}/>)
          : <div className="loading">Loading...</div>
        }

      </div>
    )
  }
}



export default AstroList;
