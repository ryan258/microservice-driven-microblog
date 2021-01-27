const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")

const app = express()
app.use(bodyParser.json())

// we'll store all our pposts in this obj
const posts = {}

app.get("/posts", (req, res) => {
  res.send(posts)
})

app.post("/posts", (req, res) => {
  // get a nice looking random id
  const id = randomBytes(4).toString("hex")
  const { title } = req.body

  // make a new entry into the posts
  posts[id] = {
    id,
    title
  }

  // confirm to user that everything went well
  res.status(201).send(posts[id])
})

app.listen(4000, () => {
  console.log("Listening on Port 4000")
})
