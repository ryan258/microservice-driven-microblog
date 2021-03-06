import { useState, useEffect } from "react"
import axios from "axios"
import CommentCreate from "./CommentCreate"
import CommentList from "./CommentList"

const PostList = () => {
  const [posts, setPosts] = useState({})

  // fire off a call to get our posts
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts")
    // console.log(res.data)
    // take data and put it in our posts state
    setPosts(res.data)
  }

  // call fetchPosts once the page loads for the first time
  useEffect(() => {
    fetchPosts()
  }, [])

  // console.log(posts)

  // make an array of values (an array of objects) and map over the values with html
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="cards" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  })

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
}

export default PostList
