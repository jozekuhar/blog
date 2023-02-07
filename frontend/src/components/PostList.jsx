import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import axios from "axios"
import PostDetail from './Post'
import { PostsContext } from '../context/PostsContext'

function PostList() {
  const posts = useContext(PostsContext)

  const postsList = posts.map(post => {
    return (
      <PostDetail 
        key={post.id} 
        post={post}
        titleLink={post.id}
        shareLink={`${post.id}/share`}
      />
    )
  })

  return (
    <>
     {postsList}
    </>
  )
}

export default PostList