import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "./PostDetail";
import Post from "./Post";
import styled from "styled-components";


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
      <Title>Posts by: <Username>{username}</Username></Title>
      {postsList}
    </>
  )
}

const Title = styled.div`
  margin: 20px;
  text-align: center;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
`
const Username = styled.span`
  color: #170A1C;
`

export default UserPostList