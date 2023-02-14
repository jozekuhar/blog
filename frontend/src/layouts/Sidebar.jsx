import axios from 'axios'
import moment from "moment"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { PostsContext } from '../context/PostsContext'

function Sidebar() {
  const { count } = useContext(PostsContext)
  const [recentPosts, setRecentPosts] = useState([])
  const [mostCommentedPosts, setMostCommentedPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/blog/posts/recent/")
        const mostCommentedResponse = await axios.get("/api/blog/posts/most-commented/")
        setRecentPosts(response.data)
        setMostCommentedPosts(mostCommentedResponse.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])


  const listRecentPosts = recentPosts.map(post => {
    const year = moment(post.publish).format("YYYY")
    const month = moment(post.publish).format("MM")
    const day = moment(post.publish).format("DD")
    return (
      <PostLink key={post.id}><Link to={`/posts/${year}/${month}/${day}/${post.slug}`}>{post.title}</Link></PostLink>
      )
  })

  const listMostCommentedPosts = mostCommentedPosts.map(post => {
    const year = moment(post.publish).format("YYYY")
    const month = moment(post.publish).format("MM")
    const day = moment(post.publish).format("DD")
    return (
      <PostLink key={post.id}><Link to={`/posts/${year}/${month}/${day}/${post.slug}`}>{post.title}</Link></PostLink>
      )
  })

  return (
    <Container>
      <Title>My Blog</Title>
      <p>This is my blog, I wrote {count} posts so far.</p>
      <SubTitle>Recent posts</SubTitle>
      {listRecentPosts}
      <SubTitle>Most commented posts</SubTitle>
      {listMostCommentedPosts}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  padding: 20px;
  top: 50px;
  right: 0;
  bottom: 0;
  width: 350px;
  background-color: #F8F8F8;
  p {
    margin-top: 10px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`
const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
`
const SubTitle = styled.div`
  margin-top: 10px;
  font-size: 18px;
`
const PostLink = styled.p`
  font-size: 14px;
  color: #0B7189;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
`

export default Sidebar