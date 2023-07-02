const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

var asteroidsRoutes = require("./asteroids/asteroids");
var nasaRoutes = require("./fakeNasa/fakeNasa");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/asteroids", asteroidsRoutes);
app.use("/nasa", nasaRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
