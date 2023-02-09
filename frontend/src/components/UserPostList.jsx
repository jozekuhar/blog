import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "./PostDetail";
import Post from "./Post";


function UserPostList() {
  const { username } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/users/${username}/`)
        setPosts(response.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  const postsList = posts.map(post => {
    return (
      <Post 
        key={post.id} 
        post={post}
        titleLink={post.id}
        shareLink={`/posts/${post.id}/share`}
      />
    )
  })
  
  return (
    <>
      {postsList}
    </>
  )
}

export default UserPostList