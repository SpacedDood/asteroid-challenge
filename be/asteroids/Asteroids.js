var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var fs = require("fs");

/* ROUTES */
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

router.post("/getDataRange", async (req, res) => {
  console.log("data requested");
  //console.log(req)
  console.log(req.body)

  //NEEDS PARSING!
  const requestStartDate = req.body.startDate;
  const requestEndDate = req.body.endDate;

  const urlString = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+requestStartDate+"&end_date="+requestEndDate+"&api_key=DEMO_KEY"

  await getFetchData(urlString)
  .then((data) => {
    console.log("datas!")
    console.log(data)

    //JUST INCASE I RUN OUT OF QUERIES
    //saveData(requestStartDate + "&" + requestEndDate, JSON.stringify(data));

    res.json(data)
  })
  .catch((error) => {
    console.error("ERROR!")
    console.log(error)
    res.send("error")
  })


})





/* PULL DATA */
async function getFetchData(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
    .then(res => res.json())
    .then((json) => {
      resolve(json);
    })
    .catch((error) => {
      reject(err);
    })
  });
}

/* DATE STRINGS PROCESSING */

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

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


/* TO BE CONTINUED */

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

async function saveData(theDate, theData) {
  fs.writeFileSync(getDateFileUrl(theDate), theData)
}


/* BROKEN THINGS TO BE CONTINUED */
const asterURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY"

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

module.exports = router;
