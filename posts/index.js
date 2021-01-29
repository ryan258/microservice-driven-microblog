const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// we'll store all our pposts in this obj
const posts = {}

app.get("/posts", (req, res) => {
  res.send(posts)
})

// this is run whenever anyone tries to create a new post
app.post("/posts", async (req, res) => {
  // get a nice looking random id
  const id = randomBytes(4).toString("hex")
  const { title } = req.body

  // make a new entry into the posts
  posts[id] = {
    id,
    title
  }
  //make a POST req to the BUS
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    // data is the post we just made
    data: {
      id,
      title
    }
  })

  // confirm to user that everything went well
  res.status(201).send(posts[id])
})

// create new POST request handler
// - /events receives any event coming over from the BUS
app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type)
  res.send({})
})

app.listen(4000, () => {
  console.log("Listening on Port 4000")
})
