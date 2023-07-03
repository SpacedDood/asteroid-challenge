var express = require("express");
var router = express.Router();
var fs = require("fs");

/*

WHATS THIS?!

Nasa allows for 30 requests per hour and 50 requests per day...

seeing how... I only found that out with the error... means I only have 20 remaining... potentially.

So IM FAKING NASAS API to further test that my thing works correctly.

There is the issue of date ranges also... which I need to account for...

*/

const saveLocation = "./nasaData/"
const getDateFileUrl = (theDate) => {
  return saveLocation + theDate + ".json";
}

router.get('/data', async (req, res) => {

  if (!req.query.startDate) {
    res.send("please provide start date")
  }

  var theDatas;

  await getDateData(req.query.startDate)
  .then((data) => {
    console.log("datas!")
    console.log(data)
    res.json(JSON.parse(data))
  })
  .catch((error) => {
    console.error("ERROR!")
    res.send("error")
  })

})

async function getDateData(theDateString) {
  let content = await readFile(getDateFileUrl(theDateString));
  console.log("content")
  console.log(content)
  return content;
}

async function readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

/* JUST SOME TEST DATA INPUTS */
router.get('/thisweek', async (req, res) => {

  await readFile(saveLocation + "2606-0207.json")
  .then((data) => {
    console.log("datas!")
    //console.log(data)
    res.json(JSON.parse(data))
  })
  .catch((error) => {
    console.error("ERROR!")
    res.send("error")
  })

})

router.get('/nextweek', async (req, res) => {

  await readFile(saveLocation + "0307-0907.json")
  .then((data) => {
    console.log("datas!")
    //console.log(data)
    res.json(JSON.parse(data))
  })
  .catch((error) => {
    console.error("ERROR!")
    res.send("error")
  })

})

module.exports = router;
