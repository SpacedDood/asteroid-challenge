var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var fs = require("fs");


const asterURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY"

/* SAVE DATA */

const saveLocation = "./data/"
const getDateFileUrl = (theDate) => {
  return saveLocation + theDate + ".json";
}

let testData = (date) => {
  return {
    name:"Barry",
    time: date,
    size:"awesome"
  }
}

/* GET DATA */

async function getDateData(theDateString) {
  fs.readFile(getDateFileUrl(theDateString), (err, data) => {
    if (!err && data) {
      console.log("Got Data!")
    } else {
      console.log("Data Not Found, requesting!");
      saveData(theDateString, JSON.stringify(testData(theDateString)));
    }
  })
}

async function saveData(theDate, theData) {
  fs.writeFileSync(getDateFileUrl(theDate), theData)
}

/* PULL DATA */

async function pullData() {
  await fetch(asterURL)
  .then(res => res.json())
  .then((json) => {
    saveData("25-12-12", JSON.stringify(testData));
    console.log(json)
    return json
  })
  .catch((error) => {
    console.error(error);
    return error;
  })
}

router.get('/', async (req, res) => {
  try {
    let theData = await pullData();
    console.log("Finished data!")
    console.log(theData)
    res.json(theData)
  } catch (error) {
    console.log("no data")
    res.send("No")
  }
})

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

router.post("/fetchData", async (req, res) => {
  console.log("data requested");
  console.log(req)
  console.log(req.body)

  const requestDate = new Date(req.body.date);
  const requestDateNext = requestDate.addDays(1);

  console.log(requestDate)

  getDateData(formatDateString(requestDate))

  res.send("YEET!")
})


function formatDateString(theDateObject) {
  let day = theDateObject.getDate();
  if (day < 10) {
      day = '0' + day;
  }
  let month = theDateObject.getMonth();
  if (month < 10) {
      month = "0" + month;
  }
  let year = theDateObject.getFullYear();
  formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}



module.exports = router;
