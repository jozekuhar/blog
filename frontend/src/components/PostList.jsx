import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import axios from "axios"
import PostDetail from './Post'

function PostList() {
  const [posts, setPosts] = useState([])

  const postsList = posts.map(post => {
    return (
      <Link to={`${post.id}`} key={post.id}><PostDetail post={post}/></Link>
    )
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/blog/posts/")
        setPosts(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  return (
    <>
     {postsList}
    </>
  )
}

export default PostList