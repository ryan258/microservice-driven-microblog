const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

// watch for incoming requests that are POSTed to /events
app.post("/events", (req, res) => {
  const event = req.body // we'll take whatever is in the request and send it out to all the other services
  // when we receive an event we'll turn around and send a series of POST requests to all the services
  // right now we're assuming all these requests will always be successful, so typically we'd add some handlers
  axios.post("http://localhost:4000/events", event)
  axios.post("http://localhost:4001/events", event)
  axios.post("http://localhost:4002/events", event)

  res.send({ status: "OK!" })
})

// make sure this bus is listening
app.listen(4005, () => {
  console.log("Listening on Port 4005 - Get on the bus!")
})
