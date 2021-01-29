const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// optimize thi to look up all comments associated with a given post
const commentsByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", async (req, res) => {
  // generate commentId to identify particular comment
  const commentId = randomBytes(4).toString("hex")
  // pull out content from req
  const { content } = req.body
  // check array to see if we have given postId -
  // returns an array or undefined = if we never had a comment associated with this post before, so guard against that
  const comments = commentsByPostId[req.params.id] || []
  // we'll push in the new comment into the comments array
  comments.push({ id: commentId, content })
  // assign the new comments array to the commentsByPostId object
  commentsByPostId[req.params.id] = comments
  // post data to BUS
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      // and we'll get postId from the /:id/ via req.params.id
      postId: req.params.id
    }
  })
  // send back the array of comments
  res.status(201).send(comments)
})

app.post("/events", (req, res) => {
  console.log("Event Received: ", req.body.type)

  res.send({})
})

app.listen(4001, () => {
  console.log("Listening on Port 4001")
})
