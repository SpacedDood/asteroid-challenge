import React from "react";

//Heres a functional component
const AstroElement = (props) => {
  return (
    <div className="astroElement">
      <div className={"star " + (props.astroData.favorite ? "favor" : "")} onClick={() => props.favourFunc(props.astroData)}><div className="icon" /></div>
      <div className="astroName">
        <div className="astroNameText">
          {props.astroData.name}
        </div>
        <div className="astroId">
          [{props.astroData.id}]
        </div>
      </div>
      <div className={"astroHazard " + (props.astroData.is_potentially_hazardous_asteroid ? "hazard" : "")}><div className="icon" /></div>
      <div className="astroDiameter">
        <div className="astroMin"><sub>min:</sub> {cleanDecimals(props.astroData.estimated_diameter.meters.estimated_diameter_min)}m</div>
        <div className="astroMax"><sup>max:</sup> {cleanDecimals(props.astroData.estimated_diameter.meters.estimated_diameter_max)}m</div>
      </div>
      <div className="astroOrbit">{props.astroData.close_approach_data[0].orbiting_body}</div>
      <div className="astroSentry">{props.astroData.is_sentry_object ? "true" : "false"}</div>
    </div>
  )
}

function cleanDecimals(value) {
  value = value * 1000;
  value = Math.floor(value);
  value = value / 1000;
  return value;
}

export default AstroElement;
