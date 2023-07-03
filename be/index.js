const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

var asteroidsRoutes = require("./asteroids/asteroids");
app.use("/asteroids", asteroidsRoutes);

var nasaRoutes = require("./fakeNasa/fakeNasa");
app.use("/nasa", nasaRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
