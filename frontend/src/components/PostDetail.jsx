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
import PostSimilar from "./PostSimilar"

function PostDetail() {
  const params = useParams()
  const posts = useContext(PostsContext)
  const post = posts.posts.find(post => post.slug === params.slug &&
    moment(post.publish).format("YYYY") == params.year &&
    moment(post.publish).format("MM") == params.month &&
    moment(post.publish).format("DD") == params.day
  )
  const postDetail = post ? <Post keys={post.id} post={post} titleLink=""
  shareLink={`/posts/${post.id}/share`} /> : <NotFound />
  const postComments = post ? <Comments post={post} /> : <></>
  const postSimilar = post ? <PostSimilar post={post} /> : <></>
  
  return (
    <>
      {postDetail}
      {postSimilar}
      {postComments}
    </>
  )
}

export default PostDetail