import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from "./Post"
import axios from "axios"

function PostDetail2() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/blog/posts/${id}`)
        setPost(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  if (Object.keys(post).length > 0) {
    return (
      <Post keys={post.id} post={post} />
    )
  }

  return (
    <>
    </>
  )
}

export default PostDetail2