import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from "./Post"
import axios from "axios"
import { useContext } from "react"
import { PostsContext } from "../context/PostsContext"
import NotFound from "./NotFound"
import moment from "moment"
import styled from "styled-components"
import Comments from "./Comments/Comments"

function PostDetail() {
  const params = useParams()
  const posts = useContext(PostsContext)
  const post = posts.posts.find(post => post.slug === params.slug &&
    moment(post.publish).format("YYYY") == params.year &&
    moment(post.publish).format("MM") == params.month &&
    moment(post.publish).format("DD") == params.day
  )
  const post_detail = post ? <Post keys={post.id} post={post} titleLink=""
  shareLink={`/posts/${post.id}/share`} /> : <NotFound />
  const post_comments = post ? <Comments post={post} /> : <></>
  
  return (
    <>
      {post_detail}
      {post_comments}
    </>
  )
}

export default PostDetail