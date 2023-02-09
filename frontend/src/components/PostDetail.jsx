import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from "./Post"
import axios from "axios"
import { useContext } from "react"
import { PostsContext } from "../context/PostsContext"
import NotFound from "./NotFound"

function PostDetail() {
  const { id } = useParams()
  const posts = useContext(PostsContext)
  const post = posts.find(post => post.id == id)
  
  return (
    <>
      {post ? <Post keys={post.id} post={post} titleLink=""
        shareLink={`share`} /> : <NotFound />}
    </>
  )
}

export default PostDetail