const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

// data structure
// posts === {
//   'key': {
//     id: 'key',
//     title: 'the post title',
//     comments: [
//       {
//         id: 'commentsKey',
//         content: 'commentContent'
//       }
//     ]
//   }
// }
const posts = {}

// provides full listing of posts and comments
app.get("/posts", (req, res) => {
  res.send(posts)
})

// posts... things? - end point that receives events from the event BUS
app.post("/events", (req, res) => {
  // req.body property is the event we care about
  // every event we have has a type and data property
  const { type, data } = req.body

  if (type === "PostCreated") {
    const { id, title } = data
    // put it in our posts object
    posts[id] = { id, title, comments: [] }
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data

    const post = posts[postId]
    // push the post into our posts object
    post.comments.push({ id, content })
  }

  console.log(posts)

  res.send({})
})

app.listen(4002, () => {
  console.log("Listening on Port 4002")
})
