import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import axios from "axios"
import PostDetail from './Post'
import { PostsContext } from '../context/PostsContext'

function PostList() {
  const [posts, setPosts] = useState([])
  const { count } = useContext(PostsContext)
  const limit = 2
  const [offset, setOffset] = useState(0)
  const pages = count / limit

  console.log(offset)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/posts/?limit=${limit}&offset=${offset}`)
        setPosts(response.data.results)
      } catch(error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [offset])

  const postsList = posts.map(post => {
    return (
      <PostDetail 
        key={post.id} 
        post={post}
        titleLink={post.slug}
        shareLink={`${post.id}/share`}
      />
    )
  })

  function handleClick(event) {
    setOffset(prev => event)
  }

  const paginatorButton = []
  for (let i = 0; i < pages; i++) {
    paginatorButton.push(<Button key={i} index={i*2} offset={offset} onClick={(event) => handleClick(i*2)}>{i + 1}</Button>)
  }

  return (
    <>
     {postsList}
     <Container>
      {paginatorButton}
     </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  height: 30px;
  width: 30px;
  margin: 5px;
  background-color: ${props => props.index === props.offset ? "#0B7189" : "#170A1C"};
  color: white;
  border: none;
  cursor: pointer;
`

export default PostList