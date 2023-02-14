import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Post from '../Post'

function TagList() {
  const { slug } = useParams({})
  const [posts, setPosts] = useState([])
  const [tag, setTag] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/posts/tags/${slug}/`)
        setPosts(response.data)
        const tagResponse = await axios.get(`http://localhost:8000/api/blog/posts/tags/detail/${slug}/`)
        setTag(tagResponse.data)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [slug])

  const listPosts = posts.map(post => {
    return <Post key={post.id} post={post}/>
  })

  return (
    <Container>
      <Title>Posts with tag: <Tag>{tag.name}</Tag></Title>
      {listPosts}
    </Container>
  )
}

const Container = styled.div`

`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  color: #0B7189;
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
`

const Tag = styled.span`
  color: #170A1C;
`


export default TagList